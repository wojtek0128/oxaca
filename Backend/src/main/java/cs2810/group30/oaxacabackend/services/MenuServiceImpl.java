package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Menu;
import cs2810.group30.oaxacabackend.repository.MenuRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**Implementation of MenuRepository and MenuService which provides methods for the controller.
 *
 * @author Philip Bogaars
 */
@Service
public class MenuServiceImpl implements MenuService{
    @Autowired
    private MenuRepository menuRepository;

    /**Saves the menu entity to the database (generates the Menuid randomly), returns the menu entity added to the database.
     *
     * @param menu the menu entity to be added to the db .
     * @return The menu entity saved to the db (with new UID).
     */
    @Override
    public Menu addItem(Menu menu) {
        menu.setMenuid(UUID.randomUUID().toString());
        return menuRepository.save(menu);
    }

    /**Updates the menu entity in the database by overwriting the menu entity with the same menuid.
     *
     * @param menu the menu entity that will overwrite the old menu entity.
     * @return the new menu entity in the db.
     */
    @Override
    public Menu updateAll(Menu menu) {
        return menuRepository.save(menu);
    }

    /**Finds a menu entity by its menuid and changes its price to match updatedPrice, returns null if the ID is not valid.
     *
     * @param menuid The menuId of the menu entity to change the price of.
     * @param updatedPrice The updatedPrice that'll overwrite the previous price.
     * @return The new menu entity saved to the db with the new updated price.
     */
    @Override
    public Menu updatePrice(String menuid,float updatedPrice) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setPrice(updatedPrice);
            menuRepository.save(menu);
        }
        return menu;

   }

    /**Finds a menu entity by its menuid and changes its price to match updatedName, returns null if the menuId is not valid.
     *
     * @param menuid The menuId of the menu entity to change the name of.
     * @param updatedName The updatedName that'll overwrite the previous name.
     * @return The new menu entity saved to the db with the new updated name.
     */
    @Override
    public Menu updateName(String menuid, String updatedName) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setPname(updatedName);
            menuRepository.save(menu);
        }
        return menu;
    }

    /**Finds a menu entity by its menuid and changes its description to match updatedDescription, returns null if the ID is not valid.
     *
     * @param menuid The menuId of the menu entity to change the description of.
     * @param updatedDescription The updatedDescription that'll overwrite the previous description.
     * @return The new menu entity saved to the db with the new updated description.
     */
    @Override
    public Menu updateDescription(String menuid, String updatedDescription) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setDescription(updatedDescription);
            menuRepository.save(menu);
        }
        return menu;
    }

    /**Finds a menu entity by its menuid and changes its ingredients to match updatedIngredients, returns null if the ID is not valid.
     *
     * @param menuid The menuId of the menu entity to change the ingredients of.
     * @param updatedIngredients The updatedIngredients that'll overwrite the previous ingredients.
     * @return The new menu entity saved to the db with the new updated ingredients.
     */
    @Override
    public Menu updateIngredients(String menuid, String updatedIngredients) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setIngredients(updatedIngredients);
            menuRepository.save(menu);
        }
        return menu;
    }

    /**Finds a menu entity by its menuid and changes its price to match updatedCalories, returns null if the ID is not valid.
     *
     * @param menuid The menuId of the menu entity to change the calories of.
     * @param updatedCalories The updatedCalories that'll overwrite the previous calories.
     * @return The new menu entity saved to the db with the new updated calories.
     */
    @Override
    public Menu updateCalories(String menuid, int updatedCalories) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setCalories(updatedCalories);
            menuRepository.save(menu);
        }
        return menu;
    }

    /**Finds a menu entity by its menuid and changes its price to match updatedAvailability, returns null if the ID is not valid.
     *
     * @param menuid The menuId of the menu entity to change the Availability of.
     * @param updatedAvailability The updatedAvailability that'll overwrite the previous availability.
     * @return The new menu entity saved to the db with the new updated price.
     */
    @Override
    public Menu updateAvailability(String menuid, boolean updatedAvailability) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setAvailability(updatedAvailability);
            menuRepository.save(menu);
        }
        return menu;
    }

    /**Finds a menu entity by its menuid and changes its price to match updatedCourse, returns null if the ID is not valid.
     *
     * @param menuid The menuId of the menu entity to change the course of.
     * @param updatedCourse The updatedCourse that'll overwrite the previous course.
     * @return The new menu entity saved to the db with the new updated price.
     */
    @Override
    public Menu updateCourse(String menuid, String updatedCourse) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        Menu menu = null;
        if(temp.isPresent()){
            menu=temp.get();
            menu.setCourse(updatedCourse);
            menuRepository.save(menu);
        }
        return menu;
    }

    /**Finds the menu entity associated with the menuId and deletes it.
     *
     * @param menuid The menuid of the menu entity to be deleted.
     */
    @Override
    public void deleteItem(String menuid) {
        Optional<Menu> temp = menuRepository.findById(menuid);
        if(temp.isPresent()){
            Menu menu = temp.get();
            menuRepository.delete(menu);
        }
    }

    /**Returns all menu entities in the database sorted by menuid in ascending order.
     *
     * @return A list of all the menu entities in the db sorted by menuId.
     */
    @Override
    public List<Menu> getAll() {
        return menuRepository.findAll(Sort.by(Sort.Direction.ASC,"menuid"));
    }

    /** seraches the db and returns all the menu entities that have that keyword.
     *
     * @param keyword The keyword to find in all the menu entities.
     * @return A list of all the menu items by the keyword.
     */
    @Override
    public List<Menu> listAll(String keyword) {
        if(keyword != null){
            return menuRepository.search(keyword);
        }
        return menuRepository.findAll();
    }

    /**Returns a specific menu entity associated with the menuid given, or an empty Optional if no such order with that ID exists.
     *
     * @param menuid the ID of the menu entity that should be returned.
     * @return An Optional which contains the menu entity that's associated with the given menuId, Optional is empty if the ID was not valid.
     */
    @Override
    public Optional <Menu> getById(String menuid) {
        return menuRepository.findById(menuid);
    }

    /**Returns a specific menu name associated with the menuId given, or an empty Optional if no such order with that ID exists.
     *
     * @param id the ID of the menu entities name that is being searched for.
     * @return A String which contains the menu entities name that's associated with the given ID, Optional is empty if the ID was not valid.
     */
    @Override
    public String getNameById(String id) {
        Optional<Menu> temp = menuRepository.findById(id);
        if(temp.isPresent()){
            Menu menu = temp.get();
            return menu.getPname();
        }
        return null;
    }

    /**Deletes all menu objects in the repo.
     *
     */
    @Override
    public void deleteAll() {
        menuRepository.deleteAll();
    }

}