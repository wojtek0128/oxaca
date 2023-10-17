package cs2810.group30.oaxacabackend.security;

import cs2810.group30.oaxacabackend.services.UserDetailsImpl;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Component;

import java.util.Date;
/** A Jwt object.
 *
 * @author James
 */
@Component
public class Jwt {

    @Value("${cs2810.group30.key}")
    private String key;

    /** tokenGenerator to generate a bearer token for the user which stays valid for 12 hours
     *
     * @param authentication with the user's credentials
     * @return bearer token - subject as the username, signed with HS512 and the private key
     */
    public String tokenGenerator(Authentication authentication) {
        UserDetailsImpl userDetails = (UserDetailsImpl) authentication.getPrincipal();
        return Jwts.builder().setSubject(userDetails.getUsername()).setIssuedAt(new Date()).setExpiration(new Date(new Date().getTime() + 43200000)).signWith(SignatureAlgorithm.HS512, key).compact();
    }

    /** extractClaims takes in the token and extract the body by using the signing key.
     *
     * @param token - user's bearer token
     * @return Claims (the body of the token)
     */
    public Claims extractClaims(String token) {
        return Jwts.parser().setSigningKey(key).parseClaimsJws(token).getBody();
    }

    /** extractClaims takes in the token and extract the username by using the signing key.
     *
     * @param token - user's bearer token
     * @return username
     */
    public String extractUsername(String token) {return extractClaims(token).getSubject();}

    /** Checks if token has not expired.
     *
     * @param token - user's bearer token
     * @return true if token has not expired, false if expired.
     */
    public boolean tokenExpiryCheck(String token) {
        return extractClaims(token).getExpiration().after(new Date(new Date().getTime()));
    }

    /** Checks the validity of the token.
     *
     * @param token - user's bearer token
     * @return true when token is valid, otherwise false.
     */
    public boolean validateJwtToken(String token) {
        try {
            Jwts.parser().setSigningKey(key).parseClaimsJws(token);
            return tokenExpiryCheck(token);
        } catch (Exception e) {
            e.printStackTrace();
        }
        return false;
    }
}
