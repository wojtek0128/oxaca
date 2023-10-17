package cs2810.group30.oaxacabackend.security.response;

import com.fasterxml.jackson.annotation.JsonProperty;

import java.util.List;

/** class for the content  of the JWT.
 *
 * @author James
 */
public class JwtContent {
    @JsonProperty("Token")
    private String token;
    @JsonProperty("ID")
    private Long id;
    @JsonProperty("Username")
    private String username;
    @JsonProperty("Roles")
    private List<String> roles;

    public JwtContent(String token, Long id, String username, List<String> roles) {
        this.token = token;
        this.id = id;
        this.username = username;
        this.roles = roles;
    }

}
