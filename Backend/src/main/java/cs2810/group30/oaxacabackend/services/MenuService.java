package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Menu;

import java.util.List;
import java.util.Optional;

/**Interface implementing the Service Implementation methods.
 *
 * @author Philip Bogaars
 */
public interface MenuService {
    Menu addItem(Menu menu);
    Menu updateAll(Menu menu);
    Menu updatePrice(String menuid,float updatedPrice);
    Menu updateName(String menuid,String updatedName);
    Menu updateDescription(String menuid,String updatedDescription);
    Menu updateIngredients(String menuid,String updatedIngredients);
    Menu updateCalories(String menuid,int updatedCalories);
    Menu updateAvailability(String menuid,boolean updatedAvailability);
    Menu updateCourse(String menuid,String updatedCourse);
    public void deleteItem(String menuid);
    public List<Menu> getAll();
    public List<Menu> listAll(String keyword);
    Optional <Menu> getById(String menuid);
    public String getNameById(String id);
    void deleteAll();
}
