package com.tick.sessionservice;

import org.springframework.stereotype.Service;

import com.corundumstudio.socketio.SocketIOClient;

@Service
public class SocketService {

    public void sendMessage(String room, String eventName, SocketIOClient senderClient, String message) {
        for (SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            client.sendEvent(eventName, new Message(MessageType.SERVER, message));
        }
    }

    public void sendQueueNo(String room, String eventName, SocketIOClient senderClient, int queue_no) {
        for (SocketIOClient client : senderClient.getNamespace().getRoomOperations(room).getClients()) {
            client.sendEvent(eventName, new Message(MessageType.SERVER, queue_no));
        }
    }
}
