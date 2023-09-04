package com.tick.sessionservice;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.stereotype.Component;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;

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
        server.addEventListener("enter_session", Message.class, onClientEnter());
        server.addEventListener("exit_session", Message.class, onClientExit());

    }

    private DataListener<Message> onClientEnter() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());
            log.info(collection.toString());
            int size = collection.size();
            if (size < 3) {
                collection.add(data.getUserId());
                socketService.sendMessage(
                    data.getRoom(),
                    "enqueue", 
                    senderClient, 
                    data.getUserId() + " token" 
                );
            } else {
                queue.add(data.getUserId());
                socketService.sendMessage(
                    data.getRoom(),
                    "enqueue", 
                    senderClient, 
                    data.getUserId() + " entered queue"
                );
                socketService.sendQueueNo(
                    data.getRoom(),
                    "enqueue", 
                    senderClient, 
                    queue.indexOf(data.getUserId())
                );
            }

        };
    }

    private DataListener<Message> onClientExit() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());

            collection.remove(data.getUserId());
            if (queue.size() > 0) {
                String nextUserId = queue.remove(0);
                collection.add(nextUserId);

                socketService.sendMessage(data.getRoom(), nextUserId, senderClient, nextUserId + " token");
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
