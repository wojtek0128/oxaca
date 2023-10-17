package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Orders;
import cs2810.group30.oaxacabackend.repository.OrderItemRepo;
import cs2810.group30.oaxacabackend.repository.OrderRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.util.*;

/**Implementation of OrderRepo and OrderService which provides methods for the controller.
 *
 * @author Mostafa
 */
@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private  OrderRepo orderRepository;

    /**Saves the order to the database (generates the OrderID randomly), returns the Order added to the database.
     *
     * @param order the order item to be added to the db (if the provided order has a UID it will be overwritten.
     * @return The order saved to the db (with new UID).
     */
    @Override
    public Orders saveOrder(Orders order) {
        order.setId(UUID.randomUUID().toString());
        long timestampMillis = System.currentTimeMillis();
        Timestamp timestamp = new Timestamp(timestampMillis);
        order.setTimeOfOrder(timestamp);
        return orderRepository.save(order);
    }

    /**Returns all orders in the database sorted by completionStatus (in alphabetical order).
     * @return A list of all of the Orders in the db sorted by completionStatus.
     */
    @Override
    public List<Orders> getAllOrders() {
        return orderRepository.findAll(Sort.by(Sort.Direction.ASC, "completionStatus"));
    }

    /**Returns a specific order associated with the Id given, or an empty Optional if no such order with that ID exists..
     *
     * @param id the ID of the order that should be returned.
     * @return An Optional which contains the order that's associated with the given ID, Optional is empty if the ID was not valid.
     */
    @Override
    public Optional<Orders> getOrder(String id) { return orderRepository.findById(id); }

    /**Finds an order by it's ID and changes it's completionStatus to match newStatus, returns null if the ID is not valid.
     * @param id The ID of the order to change the completionStatus of.
     * @param newStatus The newStatus that'll overwrite the previous completionStatus
     * @return The new Order saved to the db, or null if the ID is not valid.
     */
    @Override
    public Orders changeStatus(String id, String newStatus){
        Optional<Orders> temp = orderRepository.findById(id);
        Orders order = null;
        if (temp.isPresent()) {
            order = temp.get();
            order.setCompletionStatus(newStatus);
            orderRepository.save(order);
        }
        return order;
    }

    /**Finds the order associated with the ID and deletes it.
     * @param id The ID of the order to be deleted.
     * @return True if the order is deleted, or false if it couldn't be (because the ID isn't valid).
     */
    @Override
    public boolean deleteOrder(String id) {
        Optional<Orders> temp = orderRepository.findById(id);
        if (temp.isPresent()) {
            Orders order = temp.get();
            orderRepository.delete(order);
            return true;
        }
        return false;
    }

    /**Deletes all orders in the repo, also deletes all Order items.
     *
     */
    @Override
    public void deleteAll() {
        orderRepository.deleteAll();
    }

    /**Returns a list of all of the orders that match the completionStatus provided in order from oldest to newest.
     * @param status The completionStatus that you want to search by.
     * @return A List of all orders with completionStatus matching status, in order from oldest to newest. If the status given is delivered, it returns all orders that have not been paid first, then returns the ones that have been paid (both in chronological order).
     */
    @Override
    public List<Orders> getAllByStatus(String status) {
        List<Orders> temp = orderRepository.findAllBycompletionStatus(status, Sort.by(Sort.Direction.ASC , "timeOfOrder"));
        if(status.equals("delivered")) {
            List<Orders> notPaid = new ArrayList<Orders>();
            List<Orders> isPaid = new ArrayList<Orders>();
            while (temp.size() > 0) {
                Orders order = temp.get(0);
                if (!order.getPaid()) {
                    notPaid.add(order);
                } else {
                    isPaid.add(order);
                }
                temp.remove(0);
            }
            notPaid.addAll(isPaid);
            temp = notPaid;
        }
        return temp;
    }

    /**Changes the waiterName field of the order with the corresponding id to whatever is provided as newWaiterName.
     *
     * @param id The id of the Order to have it's waiter field changed.
     * @param newWaiterName The string that will replace the previous waiter name.
     * @return The changed order.
     */
    @Override
    public Orders changeWaiterName(String id, String newWaiterName){
        Optional<Orders> temp = orderRepository.findById(id);
        Orders order = null;
        if (temp.isPresent()) {
            order = temp.get();
            order.setWaiter(newWaiterName);
            orderRepository.save(order);
        }
        return order;
    }

    /**Sets the Order with relevant Id's paid field to true.
     *
     * @param id The id of the Order to set the paid field off.
     * @return The changed order.
     */
    @Override
    public Orders setPaid(String id){
        Optional<Orders> temp = orderRepository.findById(id);
        Orders order = null;
        if (temp.isPresent()) {
            order = temp.get();
            order.setPaid(true);
            orderRepository.save(order);
        }
        return order;
    }
}
