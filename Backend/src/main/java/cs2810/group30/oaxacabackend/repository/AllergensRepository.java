package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.Allergens;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;


/**
 * <p>AllergensRepository interface.</p>
 *
 * @author Philip Bogaars
 * @version $Id: $Id
 */
@Repository
public interface AllergensRepository extends JpaRepository<Allergens,String> {
    /**
     * <p>findAllergensByMenuid.</p>
     *
     * @param menuid a {@link java.lang.String} object
     * @return a {@link java.util.List} object
     */
    List<Allergens> findAllergensByMenuid(String menuid);
    /**
     * <p>deleteAllergensByMenuid.</p>
     *
     * @param menuid a {@link java.lang.String} object
     */
    void deleteAllergensByMenuid(String menuid);

}
