package cs2810.group30.oaxacabackend.controller;

import cs2810.group30.oaxacabackend.models.Allergens;
import cs2810.group30.oaxacabackend.services.AllergenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**A controller for Allergens, uses the "/Allergens" mapping
 *
 * @author Philip Bogaars
 */
@RestController
@RequestMapping("/Allergens")
@CrossOrigin
public class AllergenController {
    @Autowired
    private AllergenService allergenService;

    /**Use "/getAll" on getMapping to return all lists of Allergens in the database.
     * @return A list of all the Allergens in the db.
     */
    @GetMapping("/getAll")
    public List<Allergens> getAllAllergens() {
        return allergenService.getAllAllergens();
    }

     /**Use "/setAllergens" on Postmapping to set the Allergens to the database.
      * * @param order Provided in the request body is the order to be added to the db with menuid.
      * @return The order saved to the db.
      */
    @PostMapping("/setAllergens")
    public String setAllergens(@RequestBody Allergens allergens){
        allergenService.setAllergen(allergens);
        return "Allergen " + allergens.getMenuid() + " has been set";
    }

    /**Use "/deleteAllergen/" followed by the id on deleteMapping to find the Allergen associated with the id and delete it.
     * @param id The menuid of the Allergen to be deleted.
     */
    @DeleteMapping("/deleteAllergen/{id}")
    public void deleteAllergen(@PathVariable String id){
        allergenService.deleteAllergen(id);
    }

    /**Use "/getById/" on getMapping followed by the menuId to return a specific order associated with the menuid given
     *
     * @param id the menuid of the Allergen that should be returned.
     * @return A List which contains the Allergens that's associated with the given menuid.
     */
    @GetMapping("/getById/{id}")
    public List<Allergens> getByID(@PathVariable String id){
        return allergenService.getAllByMenuId(id);

    }
}
