package utez.edu.mx.IntPinturaAPI.services.auth;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;
import utez.edu.mx.IntPinturaAPI.controllers.auth.Dto.SignedDto;
import utez.edu.mx.IntPinturaAPI.models.dto.UsuarioDto;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;
import utez.edu.mx.IntPinturaAPI.security.jwt.JwtProvider;
import utez.edu.mx.IntPinturaAPI.services.UsuarioService;

import java.util.Optional;

@Service
@Transactional
public class AuthService {
    private final UsuarioService Service;
    private final AuthenticationManager manager;
    private final JwtProvider provider;

    public AuthService(UsuarioService service, AuthenticationManager manager, JwtProvider provider) {
        Service = service;
        this.manager = manager;
        this.provider = provider;
    }

    @Transactional(readOnly = true)
    public ResponseEntity<ApiResponse> signIn(String usuario, String contrasenia) {
        try {

            Optional<UsuarioBean> foundUsuario = Service.findByMail(usuario);
            if (foundUsuario.isEmpty())
                return new ResponseEntity<>(
                        new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario no encontrado"),
                        HttpStatus.BAD_REQUEST);

            UsuarioBean user = foundUsuario.get();
            if (!user.getStatus())
                return new ResponseEntity<>(
                        new ApiResponse(HttpStatus.UNAUTHORIZED, true, "Inactivo"),
                        HttpStatus.BAD_REQUEST);

            if (user.getBlocked())
                return new ResponseEntity<>(
                        new ApiResponse(HttpStatus.UNAUTHORIZED, true, "Bloqueado"),
                        HttpStatus.BAD_REQUEST);

            Authentication auth = manager.authenticate(
                    new UsernamePasswordAuthenticationToken(usuario, contrasenia)
            );
            SecurityContextHolder.getContext().setAuthentication(auth);
            String token = provider.generateToken(auth);

            UsuarioDto usuarioDto = new UsuarioDto(user);

            SignedDto signedDto = new SignedDto(token, "Bearer", usuarioDto, usuarioDto.getRole());
            return new ResponseEntity<>(
                    new ApiResponse(signedDto, HttpStatus.OK),
                    HttpStatus.OK);

        } catch (Exception e) {
            String mensaje = "Las credenciales no coinciden";
            if (e instanceof DisabledException) {
                mensaje = "Usuario desactivado";
            }
            return new ResponseEntity<>(
                    new ApiResponse(HttpStatus.BAD_REQUEST, true, mensaje),
                    HttpStatus.BAD_REQUEST);
        }
    }


}
