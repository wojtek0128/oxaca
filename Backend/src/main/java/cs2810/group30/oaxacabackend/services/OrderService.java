package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Orders;

import java.util.List;
import java.util.Optional;

/**Interface implementing the Service Implementation methods.
 *
 * @author Mostafa
 */
public interface OrderService {
    Orders saveOrder(Orders order);
    List<Orders> getAllOrders();
    Optional<Orders> getOrder(String id);
    Orders changeStatus(String id, String newStatus);
    boolean deleteOrder(String id);
    void deleteAll();
    List<Orders> getAllByStatus(String status);
    Orders changeWaiterName(String id, String newName);
    Orders setPaid(String id);
}
