package com.tick.sessionservice.config;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SocketIOConfig {

    private String host;
    private Integer port;

    public SocketIOConfig() {
        host = System.getenv("SESSION_HOST");
        port = Integer.parseInt(System.getenv("SESSION_PORT"));
    }

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setHostname(host);
        config.setPort(port);
        config.getSocketConfig().setReuseAddress(true);;
        return new SocketIOServer(config);
    }

}
