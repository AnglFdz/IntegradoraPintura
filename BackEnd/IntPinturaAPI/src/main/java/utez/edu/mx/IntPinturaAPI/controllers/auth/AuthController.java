package utez.edu.mx.IntPinturaAPI.controllers.auth;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;
import utez.edu.mx.IntPinturaAPI.controllers.auth.Dto.SignDto;
import utez.edu.mx.IntPinturaAPI.services.auth.AuthService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"*"})
public class AuthController {
    private final AuthService service;

    public AuthController(AuthService service) {
        this.service = service;
    }

    @PostMapping("/signin")
    public ResponseEntity<ApiResponse> signIn(@RequestBody SignDto dto) {
            System.out.println("Usuario: " + dto.getUsuario());
            System.out.println("Contraseña: " + dto.getContrasenia());
        return service.signIn(dto.getUsuario(), dto.getContrasenia());
    }
}

