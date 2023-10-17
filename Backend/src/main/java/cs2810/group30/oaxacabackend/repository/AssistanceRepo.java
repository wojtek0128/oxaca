package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.Assistance;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * <p>AssistanceRepo interface.</p>
 *
 * @author Mostafa
 * @version $Id: $Id
 */
@Repository
public interface AssistanceRepo extends JpaRepository<Assistance, String> {
}
