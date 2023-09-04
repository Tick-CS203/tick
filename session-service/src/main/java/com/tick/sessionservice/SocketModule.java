package com.tick.sessionservice;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.tick.sessionservice.entity.*;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class SocketModule {

    private final SocketIOServer server;
    private final SocketService socketService;
    private HashSet<String> collection = new HashSet<>();
    private ArrayList<String> queue = new ArrayList<>();

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
            log.info(collection.toString());

            if (collection.size() < 3) {
                collection.add(data.getUserId());
                socketService.sendToken(data.getRoom(), data.getUserId(), senderClient, data.getUserId() + " token" );
            } else {
                queue.add(data.getUserId());
                socketService.sendQueueNo(data.getRoom(), data.getUserId(), senderClient, queue.indexOf(data.getUserId()));
            }

        };
    }

    private DataListener<UserData> onClientExit() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());

            if (data instanceof UserData) {
                UserData userData = (UserData) data;
                collection.remove(userData.getUserId());
            }

            if (queue.size() > 0) {
                String nextUserId = queue.remove(0);
                collection.add(nextUserId);

                socketService.sendToken(data.getRoom(), nextUserId, senderClient, nextUserId + " token");
            }

            for (String userId : queue) {
                socketService.sendQueueNo(data.getRoom(), userId, senderClient, queue.indexOf(userId));
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
