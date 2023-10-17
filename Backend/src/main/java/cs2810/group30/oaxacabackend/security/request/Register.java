package cs2810.group30.oaxacabackend.security.request;

import java.util.Set;

/**Register object that has the credentials needed to register.
 *
 * @author James
 */
public class Register {
    private String username;
    private String password;
    private Set<String> roles;

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public Set<String> getRoles() {return roles;}

    public void setRoles(Set<String> roles) {this.roles = roles;}

}