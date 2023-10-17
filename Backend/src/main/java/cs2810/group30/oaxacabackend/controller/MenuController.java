package cs2810.group30.oaxacabackend.controller;

import cs2810.group30.oaxacabackend.models.Menu;
import cs2810.group30.oaxacabackend.services.MenuService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

/**A controller for Menu, uses the "/menu" mapping.
 *
 * @author Philip Bogaars
 */
@RestController
@RequestMapping("/menu")
@CrossOrigin
public class MenuController {
    @Autowired
    private MenuService menuService;

    /**Use "/add" on PostMapping to save the order to the database (generates the menuId randomly), returns the menu entity added to the database.
     *
     * @param menu Provided in the request body is the menu to be added to the db with a new random ID(if the provided order has a UID it will be overwritten).
     * @return The menu entity saved to the db (with new UID).
     */
    @PostMapping("/add")
    public String addItem(@RequestBody Menu menu) {
        menuService.addItem(menu);
        return menu.getMenuid();
    }

    @PostMapping("/addAll")
    public int addAll(@RequestBody Menu[] list) {
        int counter = 0;
        for (Menu menu: list){
            menuService.addItem(menu);
            counter++;
        }
        return counter;
    }

    @PostMapping("/update")
    public Menu updateAll(@RequestBody Menu menu ){
        return menuService.updateAll(menu);
    }

    /**Use "/getAll" on getMapping to return all menu entities in the database.
     * @return A list of all the Menu entities in the db.
     */
    @GetMapping("/getAll")
    public List<Menu> getAll(){
        return menuService.getAll();
    }
    @DeleteMapping("/deleteItem/{id}")
    public void deleteItem(@PathVariable String id){
        menuService.deleteItem(id);
    }

    /**Use "/editPrice/menuid/price" followed by the menuId then price on putMapping to find the menuId and change its price.
     * @param menuid The ID of the menu entity to change the price of.
     * @param price The price that'll overwrite the previous price.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editPrice/{menuid}/{price}")
    public Menu updatePrice(@PathVariable String menuid,@PathVariable String price) {
        float tempNum = Float.parseFloat(price);
        return menuService.updatePrice(menuid,tempNum);
    }

    /**Use "/editName/menuid/pname" followed by the menuId then pname on putMapping to find the menuId and change its pname.
     * @param menuid The ID of the menu entity to change the pname of.
     * @param pname The pname that'll overwrite the previous pname.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editName/{menuid}/{pname}")
    public Menu updateName(@PathVariable String menuid,@PathVariable String pname){
        return menuService.updateName(menuid,pname);
    }

    /**Use "/editDescription/" followed by the menuId then description on putMapping to find the menuId and change its description.
     * @param menuid The ID of the menu entity to change the description of.
     * @param description The price that'll overwrite the previous description.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editDescription/{menuid}/{description}")
    public Menu updateDescription(@PathVariable String menuid,@PathVariable String description){
        return menuService.updateDescription(menuid,description);
    }

    /**Use "/editCalories/" followed by the menuId then calories on putMapping to find the menuId and change its calories.
     * @param menuid The ID of the menu entity to change the calories of.
     * @param calories The calories that'll overwrite the previous calories field.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editCalories/{menuid}/{calories}")
    public Menu updateCalories(@PathVariable String menuid,@PathVariable String calories){
        int tempNum = Integer.parseInt(calories);
        return menuService.updateCalories(menuid,tempNum);
    }

    /**Use "/editIngredients/" followed by the menuId then ingredients on putMapping to find the menuId and change its ingredients.
     * @param menuid The ID of the menu entity to change the ingredients of.
     * @param ingredients The ingredients that'll overwrite the previous ingredients field.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editIngredients/{menuid}/{ingredients}")
    public Menu updateIngredients(@PathVariable String menuid,@PathVariable String ingredients){
        return menuService.updateIngredients(menuid,ingredients);
    }

    /**Use "/editAvailability/" followed by the menuId then availability on putMapping to find the menuId and change its availability.
     * @param menuid The ID of the menu entity to change the availability of.
     * @param availability The calories that'll overwrite the previous availability field.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editAvailability/{menuid}/{availability}")
    public Menu updateAvailability(@PathVariable String menuid,@PathVariable String availability){
        boolean tempBool = Boolean.parseBoolean(availability);
        return menuService.updateAvailability(menuid,tempBool);
    }

    /**Use "/editCourse/" followed by the menuId then course on putMapping to find the menuId and change its course.
     * @param menuid The ID of the menu entity to change the course of.
     * @param course The course that'll overwrite the previous course field.
     * @return The new menu entity saved to the db, or null if the ID is not valid.
     */
    @PutMapping("/editCourse/{menuid}/{course}")
    public Menu updateCourse(@PathVariable String menuid,@PathVariable String course){
        return menuService.updateCourse(menuid,course);
    }
    /**Use "/search/" on getMapping followed by the keyword to return a list of menu entities according to that specific keyword.
     *
     * @param keyword the keyword of the menu entity that should be returned.
     * @return a list of all menu entities with that specific keyword
     */
    @GetMapping("/search/{keyword}")
    public List<Menu> searchMenu(@PathVariable String keyword){
        List<Menu> ListMenu = menuService.listAll(keyword);
        return ListMenu;
    }
    /**Use "/getByID/" on getMapping followed by the menuId to return a specific menu associated with the menuId given.
     *
     * @param id the menuId of the menu entity that should be returned.
     * @return An Optional which contains the order that's associated with the given menuId, Optional is empty if the menuId was not valid.
     */
    @GetMapping("/getByID/{id}")
    public Optional<Menu> getById(@PathVariable String id){
        return menuService.getById(id);
    }

    /**Use "/deleteAll" on delete mapping to delete all Menu objects in the repo.
     *
     */
    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        menuService.deleteAll();
    }
}
