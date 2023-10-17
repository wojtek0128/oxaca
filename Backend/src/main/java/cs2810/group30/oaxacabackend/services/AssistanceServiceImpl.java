package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Assistance;
import cs2810.group30.oaxacabackend.models.Orders;
import cs2810.group30.oaxacabackend.repository.AssistanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

/**Implementation of AssistanceService and AssistanceRepo providing methods to the controller.
 *
 * @author Mostafa
 */
@Service
public class AssistanceServiceImpl implements AssistanceService{

    @Autowired
    private AssistanceRepo assistanceRepository;

    /**Returns all Assistance objects in the db, sorted from oldest to newest.
     *
     * @return A list containing all Assistance objects sorted from oldest to newest.
     */
    @Override
    public List<Assistance> getAll() {
        return assistanceRepository.findAll(Sort.by(Sort.Direction.ASC, "timeOfRequest"));
    }

    /**Saves the assistance to the db, generates the Id randomly (will overwrite any Id given to it), then returns the order added.
     *
     * @param assistance the assistance object to be added to the db (Id will be generated and overwrite if an Id is given).
     * @return The assistance object added.
     */
    @Override
    public Assistance add(Assistance assistance) {
        assistance.setId(UUID.randomUUID().toString());
        return assistanceRepository.save(assistance);    }

    /**Finds the Assistance object associated with the given Id and deles it. Returns false if ID provided isn't valid.
     *
     * @param id The Id of the Assistance object to be deleted.
     * @return True if deletion was successfull, false if the Id is invalid.
     */
    @Override
    public Boolean delete(String id) {
        Optional<Assistance> temp = assistanceRepository.findById(id);
        if (temp.isPresent()) {
            Assistance assistance = temp.get();
            assistanceRepository.delete(assistance);
            return true;
        }
        return false;    }

    /**Deletes all assistance objects in the repository.
     *
     */
    @Override
    public void deleteAll() {
        assistanceRepository.deleteAll();
    }
}
