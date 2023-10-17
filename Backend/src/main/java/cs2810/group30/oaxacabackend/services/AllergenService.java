package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Allergens;
import cs2810.group30.oaxacabackend.models.Menu;

import java.util.List;
/**Interface implementing the Service Implementation methods.
 *
 * @author Philip Bogaars
 */

public interface AllergenService {
    List<Allergens> getAllAllergens();
    Allergens setAllergen(Allergens allergens);
    void deleteAllergen(String menuid);
    public List<Allergens> getAllByMenuId(String menuid);

}
