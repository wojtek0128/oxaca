package cs2810.group30.oaxacabackend.controller;

import com.fasterxml.jackson.databind.ObjectMapper;
import cs2810.group30.oaxacabackend.models.Menu;
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

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@RunWith(SpringRunner.class)
@SpringBootTest
public class MenuTest {
    private MockMvc mockMvc;
    private Menu menu;

    @Autowired
    private WebApplicationContext context;

    ObjectMapper om = new ObjectMapper();

    @Test
    public void addAndGetMenuTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        menu = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat",  true, "main");
        String jsonRequest = om.writeValueAsString(menu);
        MvcResult result = mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String id = result.getResponse().getContentAsString();
        MvcResult result1 = mockMvc.perform(get("/menu/getByID/" + id)).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Menu output = om.readValue(resultContent1, Menu.class);
        assertEquals(menu.getPrice(), output.getPrice());
    }

    @Test
    public void updateMenuTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        menu = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat",  true, "main");
        String jsonRequest = om.writeValueAsString(menu);
        MvcResult result = mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String id = result.getResponse().getContentAsString();

        Menu menu2 = new Menu(id, "that's not polite", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat",  true, "main");
        jsonRequest = om.writeValueAsString(menu2);
        MvcResult result1 = mockMvc.perform(post("/menu/update").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Menu output = om.readValue(resultContent1, Menu.class);
        assertEquals("that's not polite", output.getPname());
    }

    @Test
    public void deletingMenuTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/menu/deleteAll")).andExpect(status().isOk()).andReturn();
        menu = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat",  true, "main");
        String jsonRequest = om.writeValueAsString(menu);
        MvcResult result = mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String id = result.getResponse().getContentAsString();

        mockMvc.perform(delete("/menu/deleteItem/" + id)).andExpect(status().isOk()).andReturn();
        MvcResult result1 = mockMvc.perform(get("/menu/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Menu[] list = om.readValue(resultContent1, Menu[].class);
        assertEquals(0, list.length);
    }

    @Test
    public void deleteAllTest() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        menu = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat", true, "main");
        String jsonRequest = om.writeValueAsString(menu);
        mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();

        mockMvc.perform(delete("/menu/deleteAll")).andExpect(status().isOk()).andReturn();
        MvcResult result1 = mockMvc.perform(get("/menu/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Menu[] list = om.readValue(resultContent1, Menu[].class);
        assertEquals(0, list.length);
    }

    @Test
    public void getAllTest() throws Exception{
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/menu/deleteAll")).andExpect(status().isOk()).andReturn();
        Menu menu1 = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat",  true, "main");
        Menu menu2 = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 550, (float) 0.01, "fat",  true, "main");
        Menu menu3 = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 551, (float) 0.01, "fat",  true, "main");
        Menu menu4 = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 552, (float) 0.01, "fat",  true, "main");
        Menu menu5 = new Menu("a", "urMum", "Extra large meal for the most hungry of customers!", 553, (float) 0.01, "fat",  true, "main");
        String jsonRequest = om.writeValueAsString(menu1);
        mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(menu2);
        mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(menu3);
        mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(menu4);
        mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        jsonRequest = om.writeValueAsString(menu5);
        mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();

        MvcResult result = mockMvc.perform(get("/menu/getAll")).andExpect(status().isOk()).andReturn();
        String resultContent = result.getResponse().getContentAsString();
        Menu[] list = om.readValue(resultContent, Menu[].class);
        assertEquals(5, list.length);
    }

    @Test
    public void editMethodsTests() throws Exception {
        mockMvc = MockMvcBuilders.webAppContextSetup(context).build();
        mockMvc.perform(delete("/menu/deleteAll")).andExpect(status().isOk()).andReturn();
        Menu menu = new Menu("a", "Generic Meal", "Extra large meal for the most hungry of customers!", 549, (float) 0.01, "fat", false, "main");
        String jsonRequest = om.writeValueAsString(menu);
        MvcResult result = mockMvc.perform(post("/menu/add").content(jsonRequest)
                .contentType(MediaType.APPLICATION_JSON_VALUE)).andExpect(status().isOk()).andReturn();
        String id = result.getResponse().getContentAsString();
        mockMvc.perform(put("/menu/editPrice/" + id + "/42.0")).andExpect(status().isOk()).andReturn();
        mockMvc.perform(put("/menu/editName/" + id + "/nuts")).andExpect(status().isOk()).andReturn();
        mockMvc.perform(put("/menu/editDescription/" + id + "/something nice")).andExpect(status().isOk()).andReturn();
        mockMvc.perform(put("/menu/editCalories/" + id + "/550")).andExpect(status().isOk()).andReturn();
        mockMvc.perform(put("/menu/editIngredients/" + id + "/nuts")).andExpect(status().isOk()).andReturn();
        mockMvc.perform(put("/menu/editAvailability/" + id + "/false")).andExpect(status().isOk()).andReturn();
        mockMvc.perform(put("/menu/editCourse/" + id + "/starter")).andExpect(status().isOk()).andReturn();

        MvcResult result1 = mockMvc.perform(get("/menu/getByID/" + id)).andExpect(status().isOk()).andReturn();
        String resultContent1 = result1.getResponse().getContentAsString();
        Menu output = om.readValue(resultContent1, Menu.class);

        assertEquals("nuts", output.getPname());
        assertEquals(42.0, output.getPrice());
        assertEquals("something nice", output.getDescription());
        assertEquals(550, output.getCalories());
        assertEquals("nuts", output.getIngredients());
        assertEquals(false, output.getAvailability());
        assertEquals("starter", output.getCourse());
    }
}
