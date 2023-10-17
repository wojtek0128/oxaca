package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Allergens;
import cs2810.group30.oaxacabackend.repository.AllergensRepository;
import cs2810.group30.oaxacabackend.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

/**Implementation of AllergensRepo and AllergensService providing methods to the controller.
 *
 * @author Philip Bogaars
 */
@Service
public class AllergenServiceImpl implements AllergenService{

    @Autowired
    private AllergensRepository allergensRepository;
    private MenuRepository menuRepository;

    /**Returns all Allergens in the database sorted by the menuid they're associated with.
     * @return A list of all allergens in the database table.
     */
    @Override
    public List<Allergens> getAllAllergens() {
        return allergensRepository.findAll(Sort.by(Sort.Direction.ASC, "menuid"));
    }

    /**Adds the Allergen provided ,into the db
     * @param allergens The Item to be added.
     * @return The Item added to the db.
     */
    @Override
    public Allergens setAllergen(Allergens allergens) {
        return allergensRepository.save(allergens);
    }

    /**Deletes the Allergen associated with the menuid given.
     *
     * @param menuid The ID of the Allergen to be deleted.
     */
    @Override
    public void deleteAllergen(String menuid) {
            Optional<Allergens> temp = allergensRepository.findById(menuid);
            if(temp.isPresent()){
                Allergens allergens = temp.get();
                allergensRepository.delete(allergens);
            }
        }

    /**Returns a list of all Allergens associated with the menuid given.
     *
     * @param menuid The ID of the list of Allergens you want to return.
     * @return A list of all the Allergens associated with that menuid.
     */
    @Override
    public List<Allergens> getAllByMenuId(String menuid) {
        return allergensRepository.findAllergensByMenuid(menuid);
    }
}
