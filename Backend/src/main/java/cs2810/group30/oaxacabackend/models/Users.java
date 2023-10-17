package cs2810.group30.oaxacabackend.models;

import jakarta.persistence.*;

import java.util.HashSet;
import java.util.Set;

/**User object that holds the users credentials.
 *
 * @author James
 */
@Entity
@Table( name = "users",
        uniqueConstraints = {
        @UniqueConstraint(columnNames = "username")
        }
)
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String username;
    private String password;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable( name = "allocation",
    joinColumns = @JoinColumn(name = "userid"),
    inverseJoinColumns = @JoinColumn(name = "roleid"))
    private Set<Roles> roles = new HashSet<>();

    /**Empty constructor used by auto-wirer
     *
     */
    public Users() {}

    public long getId() {return id;}

    public void setId(long id) {this.id = id;}

    public String getUsername() {return username;}

    public void setUsername(String username) {this.username = username;}

    public String getPassword() {return password;}

    public void setPassword(String password) {this.password = password;}

    public Set<Roles> getRoles() {return roles;}

    public void setRoles(Set<Roles> roles) {this.roles = roles;}

    /** Full Constructor, taking in a String Username and password
     *
     * @param username the username of the user.
     * @param password the password of the user.
     */
    public Users(String username, String password) {
        this.username = username;
        this.password = password;
    }
}