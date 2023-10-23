package com.tick.tokens;

import static org.hamcrest.Matchers.equalTo;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;

@SpringBootTest(classes = com.tick.tokens.TickApplication.class)
@AutoConfigureMockMvc
public class TokenEndpointTest {
    @Autowired
    private MockMvc mvc;

    //@Test
    public void create_token() throws Exception {
        mvc.perform(MockMvcRequestBuilders.post("/token")
                .contentType(MediaType.APPLICATION_JSON)
                .content("{\"token\": \"\"}"))
            .andExpect(status().is(400))
            .andExpect(jsonPath("$.message").value("No token supplied"));
            //.andExpect(content().string(equalTo("No token supplied")));
    }

    //@Test
    public void validate_token() throws Exception {
        String str = "{\"token\": \"\"}";
        mvc.perform(MockMvcRequestBuilders.get("/token")
                .contentType(MediaType.APPLICATION_JSON)
                .param("User", str))
            .andExpect(status().is(200))
            .andExpect(jsonPath("$.message").value(str));
            //.andExpect(content().string(equalTo("No token supplied")));
    }
}
