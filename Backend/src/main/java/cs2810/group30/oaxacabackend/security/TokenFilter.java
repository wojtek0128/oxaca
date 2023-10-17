package cs2810.group30.oaxacabackend.security;

import cs2810.group30.oaxacabackend.services.UserDetailsServiceImpl;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

/** Makes a single execution for each request to our API.
 *
 * @author Philip Bogaars
 */
public class TokenFilter extends OncePerRequestFilter {
    @Autowired
    private Jwt jwts;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;
    private static final Logger logger= LoggerFactory.getLogger(TokenFilter.class);
    /**method that we will implement parsing & validating JWT, loading User details (using UserDetailsService), checking Authorization (using UsernamePasswordAuthenticationToken).
     *
     * @param request provide request information for HTTP servlets.
     * @param response provide response information for HTTP servlets.
     * @param filterChain allow a filterchain to delegate to the next in the chain.
     * @throws ServletException general exception a servlet can throw when it encounters difficulty.
     * @throws IOException general class of exceptions produced by failed or interrupted I/O operations.
     */
    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try{
            String jwt=parseJwt(request);
            if (jwt != null && jwts.validateJwtToken(jwt)) {
                String username = jwts.extractUsername(jwt);

                UserDetails userDetails = userDetailsService.loadUserByUsername(username);
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,
                        userDetails.getAuthorities());
                authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } catch (Exception e) {
            logger.error("Cannot set user authentication: {}", e);
        }

        filterChain.doFilter(request, response);
    }

    /**
     * parseJwt to extract the content of the Bearer token
     *
     * @param request provide request information for HTTP servlets.
     * @return the body of the bearer token
     */
    private String parseJwt(HttpServletRequest request) {
        String headerAuth = request.getHeader("Authorization");

        if (StringUtils.hasText(headerAuth) && headerAuth.startsWith("Bearer ")) {
            return headerAuth.substring(7);
        }

        return null;
        }

}
