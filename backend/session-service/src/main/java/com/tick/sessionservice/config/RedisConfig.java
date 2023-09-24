package com.tick.sessionservice.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
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
    @Bean
    public JedisConnectionFactory connectionFactory() {
        if (Boolean.parseBoolean(System.getenv("CLUSTER_MODE"))) {
            RedisClusterConfiguration configuration = new RedisClusterConfiguration();
            configuration.addClusterNode(
                new RedisNode(System.getenv("REDIS_HOST"), Integer.parseInt(System.getenv("REDIS_PORT")))
            );
            return new JedisConnectionFactory(configuration);
        } else {
            RedisStandaloneConfiguration configuration = new RedisStandaloneConfiguration(
                System.getenv("REDIS_HOST"), 
                Integer.parseInt(System.getenv("REDIS_PORT"))
            );
            configuration.setUsername(System.getenv("REDIS_USER"));
            configuration.setPassword(System.getenv("REDIS_PW"));
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
