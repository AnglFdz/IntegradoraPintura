package utez.edu.mx.IntPinturaAPI.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.IntPinturaAPI.models.dao.RoleDao;
import utez.edu.mx.IntPinturaAPI.models.dao.UsuarioDao;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

import java.util.Optional;

@Configuration
@RequiredArgsConstructor
@Order(1)
public class InitialConfig implements CommandLineRunner {

    private final RoleDao roleRepository;
    private final UsuarioDao usuarioRepository;

    private final PasswordEncoder encoder;

    @Override
    @Transactional
    public void run(String... args) {
        // Crear o buscar roles
        RoleBean adminRole = getOrSaveRol(new RoleBean(null, "ADMIN_ROLE", null));
        RoleBean employeeRole = getOrSaveRol(new RoleBean(null, "EMPLOYEE_ROLE", null));
        RoleBean userRole = getOrSaveRol(new RoleBean(null, "USER_ROLE", null));

        // Crear o buscar usuario administrador
        getOrSaveUser(new UsuarioBean(
                null,
                "Administrador",
                "ApellidoPaterno",
                "ApellidoMaterno",
                "admin@example.com",
                encoder.encode("admin"),
                true,
                false,
                adminRole, // Relación directa con rol
                null,
                null
        ));
    }

    // Método genérico para obtener o guardar un rol
    @Transactional
    public RoleBean getOrSaveRol(RoleBean role) {
        return roleRepository.findByNombre(role.getNombre())
                .orElseGet(() -> roleRepository.saveAndFlush(role));
    }

    // Método genérico para obtener o guardar un usuario
    @Transactional
    public UsuarioBean getOrSaveUser(UsuarioBean usuario) {
        return usuarioRepository.findByEmail(usuario.getEmail())
                .orElseGet(() -> usuarioRepository.saveAndFlush(usuario));
    }
}
