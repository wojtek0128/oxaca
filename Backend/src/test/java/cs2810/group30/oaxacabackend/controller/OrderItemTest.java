package cs2810.group30.oaxacabackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import cs2810.group30.oaxacabackend.models.Menu;
import cs2810.group30.oaxacabackend.models.OrderItem;
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
public class OrderItemTest {
    private MockMvc mockMvc;
    private OrderItem item;


    @Autowired
    private WebApplicationContext context;

    ObjectMapper om = new ObjectMapper();

    @Test
    public void addOrderTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        item = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        String jsonRequest = om.writeValueAsString(item);
        MvcResult result = mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        OrderItem output = om.readValue(resultContent, OrderItem.class);
        assertEquals(item.getNotes(), output.getNotes());
    }

    @Test
    public void deleteAllTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        item = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        String jsonRequest = om.writeValueAsString(item);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        mockMvc.perform(delete("/orderItem/deleteAll")).andExpect(status().isOk()).andReturn();
        MvcResult result = mockMvc.perform(get("/orderItem/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        List<OrderItem> list = om.readValue(resultContent, new TypeReference<>() {
        });
        assertEquals(0, list.size());
    }

    @Test
    public void getAllTest() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/orderItem/deleteAll")).andExpect(status().isOk()).andReturn();
        OrderItem item1 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item2 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item3 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item4 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item5 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        String jsonRequest = om.writeValueAsString(item1);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item2);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item3);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item4);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item5);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();

        MvcResult result = mockMvc.perform(get("/orderItem/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        OrderItem[] list = om.readValue(resultContent, OrderItem[].class);
        assertEquals(5, list.length);
    }

    @Test
    public void deleteOrderItemTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/orderItem/deleteAll")).andExpect(status().isOk()).andReturn();
        OrderItem item = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        String jsonRequest = om.writeValueAsString(item);
        MvcResult result  = mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        OrderItem output = om.readValue(resultContent, OrderItem.class);
        String id = output.getItemId();

        mockMvc.perform(delete("/orderItem/deleteItem/" + id)).andExpect(status().isOk()).andReturn();

        MvcResult result1 = mockMvc.perform(get("/orderItem/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        OrderItem[] list = om.readValue(resultContent1, OrderItem[].class);
        assertEquals(0, list.length);
    }

    @Test
    public void getByIdTest() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/orderItem/deleteAll")).andExpect(status().isOk()).andReturn();
        OrderItem item1 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item2 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item3 = new OrderItem("a", "MilkShake", "1", "2", 4, "a fruity shake");
        OrderItem item4 = new OrderItem("a", "MilkShake", "2", "2", 4, "a fruity shake");
        OrderItem item5 = new OrderItem("a", "MilkShake", "2", "2", 4, "a fruity shake");
        String jsonRequest = om.writeValueAsString(item1);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item2);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item3);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item4);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(item5);
        mockMvc.perform(post("/orderItem/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();

        MvcResult result = mockMvc.perform(get("/orderItem/getById/1")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        OrderItem[] list = om.readValue(resultContent, OrderItem[].class);
        assertEquals(3, list.length);

        MvcResult result1 = mockMvc.perform(get("/orderItem/getById/2")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        OrderItem[] list1 = om.readValue(resultContent1, OrderItem[].class);
        assertEquals(2, list1.length);
    }
}
