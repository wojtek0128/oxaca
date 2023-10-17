package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.Users;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

/**
 * <p>UsersRepository interface.</p>
 *
 * @author James
 * @version $Id: $Id
 */
@Repository
public interface UsersRepository extends JpaRepository<Users, Long> {
    /**
     * <p>findByUsername.</p>
     *
     * @param username a {@link java.lang.String} object
     * @return a {@link java.util.Optional} object
     */
    Optional<Users> findByUsername(String username);
    /**
     * <p>existsByUsername.</p>
     *
     * @param username a {@link java.lang.String} object
     * @return a {@link java.lang.Boolean} object
     */
    Boolean existsByUsername(String username);
}
