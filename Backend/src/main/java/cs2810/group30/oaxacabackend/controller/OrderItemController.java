package cs2810.group30.oaxacabackend.controller;

import cs2810.group30.oaxacabackend.models.OrderItem;
import cs2810.group30.oaxacabackend.services.OrderItemService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**A controller for OrderItems, uses the mapping /orderItem
 *
 * @author Mostafa
 */
@RestController
@RequestMapping("/orderItem")
@CrossOrigin
public class OrderItemController {

    @Autowired
    private OrderItemService itemService;

    /**Use "/add" on PostMapping to add the OrderItem in the RequestBody to the db.
     *
     * @param item The Item to be added, it's ID will be autogenerated and it's Name queried from it's MenuID.
     * @return The Item added to the db.
     *
     */
    @PostMapping("/add")
    public OrderItem saveItem(@RequestBody OrderItem item) {
        return itemService.saveItem(item);
    }

    /**Use "/getAll" on getMapping to get all OrderItems in the database sorted by the Order they're associated with.
     * @return A list of all OrderItems in the db sorted by the Order they're associated with.
     */
    @GetMapping("/getAll")
    public List<OrderItem> getAll() {
        return itemService.getAll();
    }

    /**Use "/getById/" followed by the OrderId on getMapping to return a list of all OrderItems associated with the OrderId given.
     * @param id The OrderId that you want to return all the OrderItems of.
     * @return A list of all the OrderItems associated with that Id.
     */
    @GetMapping("/getById/{id}")
    public List<OrderItem> getAllById(@PathVariable String id) {
        return itemService.getAllByOrderId(id);
    }

    /**Use "/deleteItem/" followed by the OrderId to delete, all OrderItems associated with the specific order.
     *
     * @param id The ID of the Order that the OrderItem(s) link too, and deletes them all.
     */
    @DeleteMapping("/deleteItem/{id}")
    public boolean deleteItem(@PathVariable String id) {
        return itemService.deleteOrderItem(id);
    }

    /**Use "/deleteAll" on deleteMapping to delete all orderItems in the database.
     *
     */
    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        itemService.deleteAll();
    }
}