package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.Orders;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

/**
 * <p>OrderRepo interface.</p>
 *
 * @author Mostafa
 * @version $Id: $Id
 */
@Repository
public interface OrderRepo extends JpaRepository<Orders, Integer> {
    /**
     * <p>findById.</p>
     *
     * @param id a {@link java.lang.String} object
     * @return a {@link java.util.Optional} object
     */
    Optional<Orders> findById(String id);
    /**
     * <p>findAllBycompletionStatus.</p>
     *
     * @param status a {@link java.lang.String} object
     * @param timeOfOrder a {@link org.springframework.data.domain.Sort} object
     * @return a {@link java.util.List} object
     */
    List<Orders> findAllBycompletionStatus(String status, Sort timeOfOrder);
}
