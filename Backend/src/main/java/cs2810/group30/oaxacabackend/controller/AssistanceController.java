package cs2810.group30.oaxacabackend.controller;

import cs2810.group30.oaxacabackend.models.Assistance;
import cs2810.group30.oaxacabackend.services.AssistanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**A controller for assistance, uses the "/assistance" mapping.
 *
 * @author Mostafa
 */
@RestController
@RequestMapping("/assistance")
@CrossOrigin
public class AssistanceController {

    @Autowired
    AssistanceService service;

    /**Use "/add" on PostMapping to save the assistance to the database (generates the Id randomly), returns the Assistance added to the database.
     *
     * @param assistance Provided in the request body is the assistance to be added to the db with a new random ID(if the provided assistance has a UID it will be overwritten).
     * @return The assistance saved to the db (with new UID).
     */
    @PostMapping("/add")
    public Assistance add(@RequestBody Assistance assistance) {
        return service.add(assistance);
    }

    /**Use "/getAll" on getMapping to return all Assistance in the database sorted by timeStamp, from oldest to newest.
     *
     * @return A list of all of the Assistance in the db sorted by completionStatus.
     */
    @GetMapping("/getAll")
    public List<Assistance> list() {
        return service.getAll();
    }

    /**Use "/delete/" followed by the Id on deleteMapping to find the assistance associated with the ID and delete it.
     * @param id The ID of the assistance to be deleted.
     * @return True if the assistance is deleted, or false if it couldn't be (because the ID isn't valid).
     */
    @DeleteMapping("/delete/{id}")
    public boolean delete(@PathVariable String id) {
        return service.delete(id);
    }

    /**Use "/deleteAll" on deleteMapping to delete all assistance objects in the db.
     *
     */
    @DeleteMapping("/deleteAll")
    public void deleteAll() {
        service.deleteAll();
    }
}
