package com.tick.sessionservice.config;

import org.springframework.context.annotation.*;
import org.springframework.beans.factory.annotation.*;
import org.springframework.data.redis.connection.RedisClusterConfiguration;
import org.springframework.data.redis.connection.RedisNode;
import org.springframework.data.redis.connection.RedisStandaloneConfiguration;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.redis.serializer.JdkSerializationRedisSerializer;
import org.springframework.data.redis.serializer.StringRedisSerializer;

@Configuration
@EnableRedisRepositories
public class RedisConfig {
    private boolean cluster_mode;
    private String redis_host;
    private String redis_port;
    private String redis_user;
    private String redis_pw;

    @Autowired
    public RedisConfig(
            @Value("${CLUSTER_MODE}") boolean cluster_mode,
            @Value("${REDIS_HOST}") String redis_host,
            @Value("${REDIS_PORT}") String redis_port,
            @Value("${REDIS_USER}") String redis_user,
            @Value("${REDIS_PW}") String redis_pw
            ) {
        this.cluster_mode = cluster_mode;
        this.redis_host = redis_host;
        this.redis_port = redis_port;
        this.redis_user = redis_user;
        this.redis_pw = redis_pw;
            }

    @Bean
    public JedisConnectionFactory connectionFactory() {
        if (cluster_mode) {
            RedisClusterConfiguration configuration = new RedisClusterConfiguration();
            configuration.addClusterNode(
                    new RedisNode(redis_host, Integer.parseInt(redis_port))
                    );
            return new JedisConnectionFactory(configuration);
        } else {
            RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration(
                    redis_host, 
                    Integer.parseInt(redis_port)
                    );
            configuration.setUsername(redis_user);
            configuration.setPassword(redis_pw);
            return new JedisConnectionFactory(configuration);
        }
    }

    @Bean
    public RedisTemplate<String, Object> template() {
        RedisTemplate<String, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(connectionFactory());
        template.setKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new StringRedisSerializer());
        template.setHashKeySerializer(new JdkSerializationRedisSerializer());
        template.setValueSerializer(new JdkSerializationRedisSerializer());
        template.setEnableTransactionSupport(true);
        template.afterPropertiesSet();
        return template;
    }
}
