package com.tick.sessionservice;

import java.util.ArrayList;
import java.util.HashSet;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;
import org.springframework.beans.factory.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;

import com.corundumstudio.socketio.SocketIOServer;
import com.corundumstudio.socketio.listener.ConnectListener;
import com.corundumstudio.socketio.listener.DataListener;
import com.corundumstudio.socketio.listener.DisconnectListener;
import com.tick.sessionservice.entity.*;
import com.tick.sessionservice.repository.SessionDAO;

import lombok.extern.slf4j.Slf4j;
import reactor.core.publisher.Mono;

@Slf4j
@Component
public class SocketModule {

    private final SocketIOServer server;
    private final SocketService socketService;

    @Autowired
    private SessionDAO dao;

    @Autowired
    private WebClient webClient;

    private int session_max;

    @Autowired
    public SocketModule(SocketIOServer server,
            SocketService socketService,
            @Value("${SESSION_MAX}") int session_max) {
        this.server = server;
        this.socketService = socketService;
        this.session_max = session_max;
        server.addConnectListener(onConnected());
        server.addDisconnectListener(onDisconnected());
        server.addEventListener("enter_session", UserData.class, onClientEnter());
        server.addEventListener("exit_session", UserData.class, onClientExit());

    }

    private DataListener<UserData> onClientEnter() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());

            String token = data.getToken();
            UserDataRequest userDataRequest = new UserDataRequest(token);
            
            UserDataResponse userDataResponse = webClient.post()
                .uri("/token/access")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(userDataRequest)
                .retrieve()
                .onStatus(httpStatus -> HttpStatus.BAD_REQUEST.equals(httpStatus), clientResponse -> {
                    log.error("Error: Token has expired");
                    return Mono.empty();
                })
                .bodyToMono(UserDataResponse.class)
                .block();

            String room = senderClient.getHandshakeData().getSingleUrlParam("room");
            Session session = dao.findSessionById(room);
            if (session == null) session = new Session(room);

            HashSet<String> collection = session.getUserSet();

            String userId = userDataResponse.getId();
            TokenResponse tokenResponse = webClient.get()
                .uri("/token/purchasing?user=" + userId)
                .retrieve()
                .bodyToMono(TokenResponse.class)
                .block();

            if (collection.size() < session_max) {
                collection.add(userId);
                session.setUserSet(collection);
                dao.save(session);

                socketService.sendToken(data.getRoom(), userId, senderClient, tokenResponse.getToken());

            } else {
                ArrayList<String> userQueue = session.getUserQueue();
                userQueue.add(userId);

                session.setUserQueue(userQueue);
                dao.save(session);

                log.info(userQueue.toString());

                socketService.sendQueueNo(data.getRoom(), userId, senderClient, userQueue.indexOf(userId));
            }


        };
    }

    private DataListener<UserData> onClientExit() {
        return (senderClient, data, ackSender) -> {
            log.info(data.toString());

            String token = data.getToken();
            UserDataRequest userDataRequest = new UserDataRequest(token);
            
            UserDataResponse userDataResponse = webClient.post()
                .uri("/token/access")
                .contentType(MediaType.APPLICATION_JSON)
                .bodyValue(userDataRequest)
                .retrieve()
                .bodyToMono(UserDataResponse.class)
                .block();

            String room = senderClient.getHandshakeData().getSingleUrlParam("room");
            Session session = dao.findSessionById(room);

            HashSet<String> collection = session.getUserSet();
            collection.remove(userDataResponse.getId());

            ArrayList<String> userQueue = session.getUserQueue();
            if (userQueue.size() > 0) {
                String nextUserId = userQueue.remove(0);
                session.setUserQueue(userQueue);

                collection.add(nextUserId);
                TokenResponse tokenResponse = webClient.get()
                    .uri("/token/purchasing?user=" + nextUserId)
                    .retrieve()
                    .bodyToMono(TokenResponse.class)
                    .block();

                socketService.sendToken(data.getRoom(), nextUserId, senderClient, tokenResponse.getToken());
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
