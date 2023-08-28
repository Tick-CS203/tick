package com.tick.queueservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.web.bind.annotation.*;

import com.tick.queueservice.entity.Queue;
import com.tick.queueservice.repository.QueueDAO;

@SpringBootApplication
@RestController
@RequestMapping("/queue")
@EnableCaching
public class QueueServiceApplication {

    @Autowired
    private QueueDAO dao;

    @PostMapping
    public Queue save(@RequestBody Queue queue) {
        return dao.save(queue);
    }

    @GetMapping("/{id}")
    public Queue findQueue(@PathVariable String id) {
        return dao.findQueueById(id);
    }

    @DeleteMapping("/{id}")
    public String deleteQueue(@PathVariable String id) {
        return dao.deleteQueueById(id);
    }

	public static void main(String[] args) {
		SpringApplication.run(QueueServiceApplication.class, args);
	}

}
