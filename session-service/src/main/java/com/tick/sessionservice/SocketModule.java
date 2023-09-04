package com.tick.sessionservice;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.stereotype.Component;

import org.springframework.beans.factory.annotation.Autowired;
import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.tick.sessionservice.entity.*;
import com.tick.sessionservice.repository.SessionDAO;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SocketModule {

    private final SocketIOServer server;
    private final SocketService socketService;
    private HashSet<String> collection = new HashSet<>();
    private ArrayList<String> queue = new ArrayList<>();

    @Autowired
    private SessionDAO dao;

    public SocketModule(SocketIOServer server, SocketService socketService) {
        this.server = server;
        this.socketService = socketService;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("enter_session", UserData.class, onClientEnter());
        server.addEventListener("exit_session", UserData.class, onClientExit());

    }

    private DataListener<UserData> onClientEnter() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());

            String room = senderClient.getHandshakeData().getSingleUrlParam("room");
            Session session = dao.findSessionById(room);
            if (session == null) session = new Session(room);

            HashSet<String> collection = session.getUserSet();

            if (collection.size() < 3) {
                collection.add(data.getUserId());
                session.setUserSet(collection);
                dao.save(session);

                socketService.sendToken(data.getRoom(), data.getUserId(), senderClient, data.getUserId() + " token" );

            } else {
                ArrayList<String> userQueue = session.getUserQueue();
                userQueue.add(data.getUserId());

                session.setUserQueue(userQueue);
                dao.save(session);

                log.info(userQueue.toString());

                socketService.sendQueueNo(data.getRoom(), data.getUserId(), senderClient, userQueue.indexOf(data.getUserId()));
            }


        };
    }

    private DataListener<UserData> onClientExit() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());

            String room = senderClient.getHandshakeData().getSingleUrlParam("room");
            Session session = dao.findSessionById(room);

            HashSet<String> collection = session.getUserSet();
            collection.remove(data.getUserId());

            ArrayList<String> userQueue = session.getUserQueue();
            if (userQueue.size() > 0) {
                String nextUserId = userQueue.remove(0);
                session.setUserQueue(userQueue);

                collection.add(nextUserId);
                socketService.sendToken(data.getRoom(), nextUserId, senderClient, nextUserId + " token");
            }
            session.setUserSet(collection);
            dao.save(session);

            for (String userId : userQueue) {
                socketService.sendQueueNo(data.getRoom(), userId, senderClient, userQueue.indexOf(userId));
            }

        };
    }

    private ConnectListener onConnected() {
        return (client) -> {
            String room = client.getHandshakeData().getSingleUrlParam("room");
            client.joinRoom(room);
            log.info("Socket ID[{}]  Connected to socket", client.getSessionId().toString());
        };

    }

    private DisconnectListener onDisconnected() {
        return client -> {
            log.info("Client[{}] - Disconnected from socket", client.getSessionId().toString());
        };
    }

}
