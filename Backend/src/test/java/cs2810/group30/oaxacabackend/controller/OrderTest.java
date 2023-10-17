package cs2810.group30.oaxacabackend.controller;

import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
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
public class OrderTest {

    private MockMvc mockMvc;
    private Orders order;


    @Autowired
    private WebApplicationContext context;

    ObjectMapper om = new ObjectMapper();

    @Test
    public void addOrderTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        order = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order);
        MvcResult result = mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders output = om.readValue(resultContent, Orders.class);
        assertEquals(order.getPrice(), output.getPrice());
    }

    @Test
    public void deleteAllTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Orders order1 = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order1);
        mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        mockMvc.perform(delete("/order/deleteAll")).andExpect(status().isOk()).andReturn();
        MvcResult result = mockMvc.perform(get("/order/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        List<Orders> list = om.readValue(resultContent, new TypeReference<>() {
        });
        assertEquals(0, list.size());
    }

    @Test
    public void getAllTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/order/deleteAll")).andExpect(status().isOk()).andReturn();
        Orders order1 = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        Orders order2 = new Orders("a", 3, Timestamp.valueOf("2019-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        Orders order3 = new Orders("a", 4, Timestamp.valueOf("2020-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        Orders order4 = new Orders("a", 5, Timestamp.valueOf("2021-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        Orders order5 = new Orders("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"), "tdrminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order1);
        mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(order2);
        mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(order3);
        mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(order4);
        mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(order5);
        mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();

        MvcResult result = mockMvc.perform(get("/order/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders[] list = om.readValue(resultContent, Orders[].class);
        assertEquals(5, list.length);
        assertEquals(1, list[0].getTableNo());
        assertEquals(2, list[1].getTableNo());
        assertEquals(3, list[2].getTableNo());
        assertEquals(4, list[3].getTableNo());
        assertEquals(5, list[4].getTableNo());
    }

    @Test
    public void addThenGetTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        order = new Orders("a", 7, Timestamp.valueOf("2018-09-01 09:01:16"), "completed", (float)3.10, "jim");
        String json = om.writeValueAsString(order);
        MvcResult result = mockMvc.perform(post("/order/add").content(json)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders output = om.readValue(resultContent, Orders.class);
        String id = output.getId();

        MvcResult result2 = mockMvc.perform(get("/order/getOrder/" + id)).andExpect(status().isOk()).andReturn();
        String resultContent2 = result2.getResponse().getContentAsString();
        Orders output2 = om.readValue(resultContent2, Orders.class);
        assertEquals(7, output2.getTableNo());
    }

    @Test
    public void getByStatusTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/order/deleteAll")).andExpect(status().isOk()).andReturn();
        Orders[] input = new Orders[5];
        input[0]= new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        input[1]= new Orders("a", 3, Timestamp.valueOf("2019-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        input[2] = new Orders("a", 4, Timestamp.valueOf("2020-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        input[3] = new Orders("a", 5, Timestamp.valueOf("2021-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        input[4] = new Orders("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"), "tdrminated", (float)3.10, "jim");
        for (Orders order:input) {
            String jsonRequest = om.writeValueAsString(order);
            mockMvc.perform(post("/order/add").content(jsonRequest)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        }
        MvcResult result = mockMvc.perform(get("/order/getByStatus/terminated")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders[] list = om.readValue(resultContent, Orders[].class);
        assertEquals(4, list.length);

        MvcResult result1 = mockMvc.perform(get("/order/getByStatus/tdrminated")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Orders[] list1 = om.readValue(resultContent1, Orders[].class);
        assertEquals(1, list1.length);
    }

    @Test
    public void changeStatusTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Orders order = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order);
        MvcResult result  = mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders output = om.readValue(resultContent, Orders.class);
        String id = output.getId();

        MvcResult result1 = mockMvc.perform(put("/order/changeStatus/" + id + "/pending")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Orders changed = om.readValue(resultContent1, Orders.class);
        assertEquals("pending", changed.getCompletionStatus());
    }

    @Test
    public void changeWaiterTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Orders order = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order);
        MvcResult result  = mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders output = om.readValue(resultContent, Orders.class);
        String id = output.getId();

        MvcResult result1 = mockMvc.perform(put("/order/changeWaiter/" + id + "/Jeff")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Orders changed = om.readValue(resultContent1, Orders.class);
        assertEquals("Jeff", changed.getWaiter());
    }

    @Test
    public void isPaidTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        Orders order = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order);
        MvcResult result  = mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders output = om.readValue(resultContent, Orders.class);
        String id = output.getId();

        MvcResult result1 = mockMvc.perform(put("/order/isPaid/" + id)).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Orders changed = om.readValue(resultContent1, Orders.class);
        assertEquals(true, changed.getPaid());
    }

    @Test
    public void deleteOrderTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/order/deleteAll")).andExpect(status().isOk()).andReturn();
        Orders order = new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "terminated", (float)3.10, "jim");
        String jsonRequest = om.writeValueAsString(order);
        MvcResult result  = mockMvc.perform(post("/order/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Orders output = om.readValue(resultContent, Orders.class);
        String id = output.getId();

        mockMvc.perform(delete("/order/delete/" + id)).andExpect(status().isOk()).andReturn();

        MvcResult result1 = mockMvc.perform(get("/order/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Orders[] list = om.readValue(resultContent1, Orders[].class);
        assertEquals(0, list.length);
    }

    @Test
    public void lengthQueryTests() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/order/deleteAll")).andExpect(status().isOk()).andReturn();
        Orders[] input = new Orders[6];
        input[0]= new Orders("a", 2, Timestamp.valueOf("2018-09-01 09:01:16"), "pending", (float)3.10, "jim");
        input[1]= new Orders("a", 3, Timestamp.valueOf("2019-09-01 09:01:16"), "pending", (float)3.10, "jim");
        input[2] = new Orders("a", 4, Timestamp.valueOf("2020-09-01 09:01:16"), "pending", (float)3.10, "jim");
        input[3] = new Orders("a", 5, Timestamp.valueOf("2021-09-01 09:01:16"), "inProgress", (float)3.10, "jim");
        input[4] = new Orders("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"), "inProgress", (float)3.10, "jim");
        input[5] = new Orders("a", 1, Timestamp.valueOf("2018-09-01 09:01:16"), "confirmed", (float)3.10, "jim");

        for (Orders order:input) {
            String jsonRequest = om.writeValueAsString(order);
            mockMvc.perform(post("/order/add").content(jsonRequest)
                    .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        }

        MvcResult mvclengthAll = mockMvc.perform(get("/order/queryLengthAll")).andExpect(status().isOk()).andReturn();
        String resultLengthAll = mvclengthAll.getResponse().getContentAsString();
        int lengthAll = om.readValue(resultLengthAll, int.class);
        assertEquals(6, lengthAll);

        MvcResult mvclength = mockMvc.perform(get("/order/queryLength/pending")).andExpect(status().isOk()).andReturn();
        String resultLength = mvclength.getResponse().getContentAsString();
        int length = om.readValue(resultLength, int.class);
        assertEquals(3, length);

        MvcResult mvcstats = mockMvc.perform(get("/order/getStats")).andExpect(status().isOk()).andReturn();
        String resultstats = mvcstats.getResponse().getContentAsString();
        int[] stats = om.readValue(resultstats, int[].class);
        assertEquals(3, stats[0]);
        assertEquals(2, stats[1]);
        assertEquals(1, stats[2]);
    }
}
