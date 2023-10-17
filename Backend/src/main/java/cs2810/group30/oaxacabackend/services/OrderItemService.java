package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.OrderItem;

import java.util.List;
/**Interface implementing the Service Implementation methods.
 *
 * @author Mostafa
 */
public interface OrderItemService {
    public List<OrderItem> getAll();
    public OrderItem saveItem(OrderItem item);
    public boolean deleteOrderItem(String itemId);
    public void deleteAllByOrder(String orderId);
    public void deleteAll();
    public List<OrderItem> getAllByOrderId(String id);
}
