package utez.edu.mx.IntPinturaAPI.security.jwt;

import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;
import utez.edu.mx.IntPinturaAPI.security.service.UserDetailsServiceImpl;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtProvider provider;

    @Autowired
    private UserDetailsServiceImpl service;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            // Verificar si ya hay un usuario autenticado en el contexto de seguridad
            if (SecurityContextHolder.getContext().getAuthentication() == null) {
                // Resolver el token desde la solicitud
                String token = provider.resolveToken(request);
                if (token != null && provider.validateToken(token)) {
                    Claims claims = provider.getClaims(token);
                    String username = claims.getSubject();

                    // Cargar detalles del usuario
                    UserDetails user = service.loadUserByUsername(username);

                    // Configurar el contexto de seguridad
                    Authentication auth = new UsernamePasswordAuthenticationToken(
                            user, null, user.getAuthorities());
                    SecurityContextHolder.getContext().setAuthentication(auth);
                }
            }
        } catch (Exception e) {
            // Manejo de errores: log y respuesta al cliente
            System.err.println("Error en la autenticación JWT: " + e.getMessage());
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "No autorizado");
            return;
        }
        filterChain.doFilter(request, response); // Continuar con la cadena de filtros
    }
}
