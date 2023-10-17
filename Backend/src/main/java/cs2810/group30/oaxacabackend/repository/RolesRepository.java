package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.Roles;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

/**
 * <p>RolesRepository interface.</p>
 *
 * @author James
 * @version $Id: $Id
 */
@Repository
public interface RolesRepository extends JpaRepository<Roles, Long> {
    /**
     * <p>findByName.</p>
     *
     * @param name a {@link java.lang.String} object
     * @return a {@link cs2810.group30.oaxacabackend.models.Roles} object
     */
    Roles findByName(String name);
}
