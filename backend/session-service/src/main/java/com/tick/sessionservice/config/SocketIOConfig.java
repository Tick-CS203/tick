package com.tick.sessionservice.config;

import com.corundumstudio.socketio.SocketIOServer;
import org.springframework.context.annotation.*;

@Configuration
public class SocketIOConfig {

    @Bean
    public SocketIOServer socketIOServer() {
        com.corundumstudio.socketio.Configuration config = new com.corundumstudio.socketio.Configuration();
        config.setPort(8085);
        config.getSocketConfig().setReuseAddress(true);;
        config.setOrigin("*");
        return new SocketIOServer(config);
    }

}
