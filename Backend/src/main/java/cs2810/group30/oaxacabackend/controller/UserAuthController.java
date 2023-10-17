package cs2810.group30.oaxacabackend.controller;

import cs2810.group30.oaxacabackend.models.Roles;
import cs2810.group30.oaxacabackend.models.Users;
import cs2810.group30.oaxacabackend.repository.RolesRepository;
import cs2810.group30.oaxacabackend.repository.UsersRepository;
import cs2810.group30.oaxacabackend.security.Jwt;
import cs2810.group30.oaxacabackend.security.request.Login;
import cs2810.group30.oaxacabackend.security.request.Register;
import cs2810.group30.oaxacabackend.security.response.JwtContent;
import cs2810.group30.oaxacabackend.services.UserDetailsImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;


import javax.validation.Valid;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

/**A controller for UserAuth, uses the "/users/auth" mapping
 *receives and handles request after it was filtered by OncePerRequestFilter
 *
 * @author James
 */
@RestController
@RequestMapping("/users/auth")
@CrossOrigin
public class UserAuthController {

    @Autowired
    UsersRepository usersRepository;

    @Autowired
    RolesRepository rolesRepository;

    @Autowired
    AuthenticationManager authenticationManager;

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    Jwt jwt;

    /**Use "/login" on PostMapping to authenticate the Users login request.
     *
     * @param login Provided in the Valid RequestBody is the credentials of the User trying to log in.
     * @return the users token,User id ,Username and User roles.
     */
    @PostMapping(value = "/login", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<?> loginUsers(@Valid @RequestBody Login login){
        Authentication authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(login.getUsername(), login.getPassword()));
        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = jwt.tokenGenerator(authentication);
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        List<String> roles = userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList());
        return ResponseEntity.ok(new JwtContent(token,userDetails.getId(),userDetails.getUsername(),roles));
    }

    /**Use "/register" on PostMapping to register a User if they have a valid username ,password and role.
     *
     * @param register provided in the Valid RequestBody is the credentials of the user trying to register.
     * @return a String of either "Username already exist."if the user already exists,"No Role Selected." if no role was given,
     * "Unexpected value: " if a role was given but was not a possible role or "User registered." if the user has been successfully registered.
     */
    @PostMapping("/register")
    public ResponseEntity<String> registerUsers(@Valid @RequestBody Register register){
        if (usersRepository.existsByUsername(register.getUsername())){
            return ResponseEntity.badRequest().body("Username already exist.");
        }
        Users users = new Users(register.getUsername(),passwordEncoder.encode(register.getPassword()));
        Set<Roles> roles = new HashSet<>();
        Set<String> stringSet = register.getRoles();
        if (stringSet == null){
            return ResponseEntity.badRequest().body("No Role Selected.");
        }
        for (String value: stringSet){
            switch (value) {
                case "Kitchen" -> roles.add(rolesRepository.findByName("Kitchen"));
                case "Waiter" -> roles.add(rolesRepository.findByName("Waiter"));
                case "Admin" -> roles.add(rolesRepository.findByName("Admin"));
                default -> throw new IllegalStateException("Unexpected value: " + value);
            }
        }
        users.setRoles(roles);
        usersRepository.save(users);
        return ResponseEntity.ok("User registered.");
    }


}
