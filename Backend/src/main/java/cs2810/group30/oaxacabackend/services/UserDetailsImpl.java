package cs2810.group30.oaxacabackend.services;

import com.fasterxml.jackson.annotation.JsonIgnore;
import cs2810.group30.oaxacabackend.models.Users;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

/**Implementation of UserDetails which provides methods for the UserDetailsServiceImpl.
 *
 * @author James
 *
 */
public class UserDetailsImpl implements UserDetails {
    private Long id;
    private String username;
    @JsonIgnore
    private String password;
    private Collection<? extends GrantedAuthority> grantedAuthorities;

    public static UserDetailsImpl impl(Users users){
        List<GrantedAuthority> grantedAuthorities = users.getRoles().stream().map(roles -> new SimpleGrantedAuthority(roles.getName())).collect(Collectors.toList());
        return new UserDetailsImpl(
                users.getId(), users.getUsername(), users.getPassword(), grantedAuthorities
        );
    }

    public UserDetailsImpl(Long id, String username, String password, Collection<? extends GrantedAuthority> grantedAuthorities){
        this.id=id;
        this.username=username;
        this.password=password;
        this.grantedAuthorities=grantedAuthorities;
    }


    public Long getId() {
        return id;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return grantedAuthorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}
