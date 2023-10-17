package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Assistance;

import java.util.List;

/**Interface implementing AssistanceRepo methods
 *
 * @author Mostafa
 */
public interface AssistanceService {
    List<Assistance> getAll();
    Assistance add(Assistance assistance);
    Boolean delete(String assistanceID);
    void deleteAll();
}
