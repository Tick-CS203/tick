package com.tick.sessionservice;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;
import com.tick.sessionservice.entity.*;

@Service
public class SocketService {

    public void sendToken(String room, String eventName, SocketIOClient senderClient, String token) {
        for (SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            client.sendEvent(eventName, new Token(MessageType.SERVER, token));
        }
    }

    public void sendQueueNo(String room, String eventName, SocketIOClient senderClient, int queue_no) {
        for (SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            client.sendEvent(eventName, new QueueNo(MessageType.SERVER, queue_no));
        }
    }
}
