package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.OrderItem;
import cs2810.group30.oaxacabackend.models.Orders;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

/**
 * <p>OrderItemRepo interface.</p>
 *
 * @author Mostafa
 * @version $Id: $Id
 */
public interface OrderItemRepo extends JpaRepository<OrderItem, Integer> {
    /**
     * <p>findByitemId.</p>
     *
     * @param id a {@link java.lang.String} object
     * @return a {@link java.util.Optional} object
     */
    Optional<OrderItem> findByitemId(String id);
    /**
     * <p>findAllByOrderId.</p>
     *
     * @param id a {@link java.lang.String} object
     * @return a {@link java.util.List} object
     */
    List<OrderItem> findAllByOrderId(String id);
    /**
     * <p>deleteAllByorderId.</p>
     *
     * @param orderId a {@link java.lang.String} object
     */
    void deleteAllByorderId(String orderId);
}
