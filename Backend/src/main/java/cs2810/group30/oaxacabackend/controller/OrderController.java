package cs2810.group30.oaxacabackend.controller;

import cs2810.group30.oaxacabackend.models.Orders;
import cs2810.group30.oaxacabackend.services.OrderItemService;
import cs2810.group30.oaxacabackend.services.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

/**A controller for Orders, uses the "/order" mapping
 *
 * @author Mostafa
 */
@RestController
@RequestMapping("/order")
@CrossOrigin
public class OrderController {

    @Autowired
    private OrderService orderService;
    @Autowired
    private OrderItemService orderItemService;

    /**Use "/add" on PostMapping to save the order to the database (generates the OrderID randomly), returns the Order added to the database.
     *
     * @param order Provided in the request body is the order to be added to the db with a new random ID(if the provided order has a UID it will be overwritten).
     * @return The order saved to the db (with new UID).
     */
    @PostMapping("/add")
    public Orders add(@RequestBody Orders order) {
        return orderService.saveOrder(order);
    }

    /**Use "/getAll" on getMapping to return all orders in the database sorted by completionStatus (in alphabetical order).
     * @return A list of all of the Orders in the db sorted by completionStatus.
     */
    @GetMapping("/getAll")
    public List<Orders> list() {
        return orderService.getAllOrders();
    }

    /**Use "/getOrder/" on getMapping followed by the orderId to return a specific order associated with the Id given, or an empty Optional if no such order with that ID exists..
     *
     * @param id the ID of the order that should be returned.
     * @return An Optional which contains the order that's associated with the given ID, Optional is empty if the ID was not valid.
     */
    @GetMapping("/getOrder/{id}")
    public Optional<Orders> getOrders(@PathVariable String id) {
        return orderService.getOrder(id);
    }


    /**Use "/getByStatus/" followed by the status on getMapping to return a list of all of the orders that match the completionStatus provided in order from oldest to newest.
     * @param status The completionStatus that you want to search by.
     * @return A List of all orders with completionStatus matching status, in order from oldest to newest.
     */
    @GetMapping("/getByStatus/{status}")
    public List<Orders> getByStatus(@PathVariable String status) {
        return orderService.getAllByStatus(status);
    }

    /**Use "/changeStatus/" followed by the orderId and new status on putMapping to find an order by it's ID and change it's completionStatus to match status, returns null if the ID is not valid.
     * @param id The ID of the order to change the completionStatus of.
     * @param status The newStatus that'll overwrite the previous completionStatus.
     * @return The new Order saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/changeStatus/{id}/{status}")
    public Orders changeStatus(@PathVariable String id, @PathVariable String status) {
        return orderService.changeStatus(id, status);
    }
    /**Use "/changeWaiter/" followed by the OrderId and new waiter on putMapping to find an order by it's ID and change it's waiterName field to match newWaiter, returns null if the ID is not valid.
     * @param id The ID of the order to change the waiterName of.
     * @param newWaiter The newWaiter name that'll overwrite the previous waitername.
     * @return The new Order saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/changeWaiter/{id}/{newWaiter}")
    public Orders changeWaiter(@PathVariable String id, @PathVariable String newWaiter) {
        return orderService.changeWaiterName(id, newWaiter);
    }

    /**Use "/isPaid/" followed by the OrderId to set it's paid field to true.
     *
     * @param id The Order Id of the order to have its payed field set to true.
     * @return The modified Order.
     */
    @PutMapping("/isPaid/{id}")
    public Orders setPaid(@PathVariable String id) {
        return orderService.setPaid(id);
    }

    /**Use "/delete/" followed by the Id on deleteMapping to find the order associated with the ID and delete it.
     * @param id The ID of the order to be deleted.
     * @return True if the order is deleted, or false if it couldn't be (because the ID isn't valid).
     */
    @DeleteMapping("/delete/{id}")
    public boolean deleteOrder(@PathVariable String id) {
        return orderService.deleteOrder(id);
    }

    /**Use "/deleteAll" on deleteMapping to delete all Orders and OrderItems in the database.
     *
     */
    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        orderItemService.deleteAll();
        orderService.deleteAll();
    }

    /**Use "/queryLength/" followed by status on getMapping to get the number of Orders of that status.
     * @param status The status you're trying to find the quantity of.
     * @return an int representing the number of Orders with the given status exist in the database.
     */
    @GetMapping("/queryLength/{status}")
    public int queryLength(@PathVariable String status) {
        List<Orders> temp = orderService.getAllByStatus(status);
        return temp.size();
    }

    /**Use "/queryLengthAll" on getMapping to get the number of total orders in the database.
     * @return An int representing the number of Orders in the database right now.
     */
    @GetMapping("/queryLengthAll")
    public int queryLengthAll() {
        List<Orders> temp = orderService.getAllOrders();
        return temp.size();
    }

    /**Custom method for the dashboard, use "/getStats" on getMapping to recieve an array detailing the number of pending, in progress, confirmed and total orders as an list of ints.
     * @return A List of ints representing the number of pending, inProgress, confirmed and total orders.
     */
    @GetMapping("/getStats")
    public List<Integer> todayIWasTheSword() {
        List<Integer> temp = new ArrayList<Integer>();
        temp.add(queryLength("pending"));
        temp.add(queryLength("inProgress"));
        temp.add(queryLength("confirmed"));
        temp.add(queryLengthAll());
        return temp;
    }
}

