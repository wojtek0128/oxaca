package cs2810.group30.oaxacabackend.repository;

import cs2810.group30.oaxacabackend.models.Menu;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

/**
 * <p>MenuRepository interface.</p>
 *
 * @author Philip Bogaars
 * @version $Id: $Id
 */
@Repository
public interface MenuRepository extends JpaRepository<Menu,String> {
    /**
     * <p>search.</p>
     *
     * @param keyword a {@link java.lang.String} object
     * @return a {@link java.util.List} object
     */
    @Query("SELECT p from Menu p where concat(p.menuid,' ',p.pname,' ',p.price,' ',p.availability,' ',p.calories,' ',p.course,' ',p.description)LIKE  %?1%")
    List<Menu>search(String keyword);
}
