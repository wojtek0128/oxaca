package cs2810.group30.oaxacabackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cs2810.group30.oaxacabackend.models.Assistance;
import cs2810.group30.oaxacabackend.models.Orders;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.sql.Timestamp;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class AssistanceTest {
    private MockMvc mockMvc;
    private Assistance ass;


    @Autowired
    private WebApplicationContext context;

    ObjectMapper om = new ObjectMapper();

    @Test
    public void addAssistanceTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        ass = new Assistance("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"));
        String jsonRequest = om.writeValueAsString(ass);
        MvcResult result = mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Assistance output = om.readValue(resultContent, Assistance.class);
        assertEquals(ass.getTableNo(), output.getTableNo());
    }

    @Test
    public void deleteAllTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        ass = new Assistance("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"));
        String jsonRequest = om.writeValueAsString(ass);
        mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        mockMvc.perform(delete("/assistance/deleteAll")).andExpect(status().isOk()).andReturn();
        MvcResult result = mockMvc.perform(get("/assistance/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        List<Assistance> list = om.readValue(resultContent, new TypeReference<>() {
        });
        assertEquals(0, list.size());
    }

    @Test
    public void getAllTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/assistance/deleteAll")).andExpect(status().isOk()).andReturn();
        Assistance ass1 = new Assistance("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"));
        Assistance ass2 = new Assistance("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"));
        Assistance ass3 = new Assistance("a", 3, Timestamp.valueOf("2018-09-01 09:01:16"));
        Assistance ass4 = new Assistance("a", 4, Timestamp.valueOf("2018-09-01 09:01:16"));
        Assistance ass5 = new Assistance("a", 5, Timestamp.valueOf("2018-09-01 09:01:16"));
        String jsonRequest = om.writeValueAsString(ass1);
        mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(ass2);
        mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(ass3);
        mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(ass4);
        mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(ass5);
        mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();

        MvcResult result = mockMvc.perform(get("/assistance/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Assistance[] list = om.readValue(resultContent, Assistance[].class);
        assertEquals(5, list.length);
        assertEquals(1, list[0].getTableNo());
        assertEquals(2, list[1].getTableNo());
        assertEquals(3, list[2].getTableNo());
        assertEquals(4, list[3].getTableNo());
        assertEquals(5, list[4].getTableNo());
    }

    @Test
    public void deleteAssistanceTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/assistance/deleteAll")).andExpect(status().isOk()).andReturn();
        ass = new Assistance("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"));
        String jsonRequest = om.writeValueAsString(ass);
        MvcResult result  = mockMvc.perform(post("/assistance/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Assistance output = om.readValue(resultContent, Assistance.class);
        String id = output.getId();

        mockMvc.perform(delete("/assistance/delete/" + id)).andExpect(status().isOk()).andReturn();

        MvcResult result1 = mockMvc.perform(get("/assistance/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Assistance[] list = om.readValue(resultContent1, Assistance[].class);
        assertEquals(0, list.length);
    }
}
