package cs2810.group30.oaxacabackend.services;

import cs2810.group30.oaxacabackend.models.Users;
import cs2810.group30.oaxacabackend.repository.UsersRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

/**Implementation of UsersRepository and UserDetailsService
 * which provides methods for the tokenFilter in Security package.
 *
 * @author James
 */
@Service
public class UserDetailsServiceImpl implements UserDetailsService{
    @Autowired
    UsersRepository usersRepository;

    /** loadUserByUsername fetches the user details of a user if a matching username is found
     *
     * @param username of the user to be fetched
     * @return user detail of a user with the matching username
     * @throws UsernameNotFoundException if there is no user with the matching username
     */
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Users users = usersRepository.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException(username));
        return UserDetailsImpl.impl(users);
    }
}
