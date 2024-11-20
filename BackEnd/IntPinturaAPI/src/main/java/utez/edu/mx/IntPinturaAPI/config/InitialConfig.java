package utez.edu.mx.IntPinturaAPI.config;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;
import utez.edu.mx.IntPinturaAPI.models.dao.UsuarioDao;
import utez.edu.mx.IntPinturaAPI.models.dao.RoleDao;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;

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

        RoleBean adminRole = getOrSaveRol(new RoleBean(null, "ADMIN_ROLE", null));
        RoleBean employeeRole = getOrSaveRol(new RoleBean(null, "EMPLOYEE_ROLE", null));
        RoleBean userRole = getOrSaveRol(new RoleBean(null, "USER_ROLE", null));

        UsuarioBean admin = getOrSaveUser(
                new UsuarioBean(
                        null,  "Administrador", // nombre
                        "ApellidoPaterno", // ap1
                        "ApellidoMaterno", // ap2
                        "admin@example.com", // email
                        encoder.encode("admin"), // contrasena
                        true, // status
                        false, // blocked
                        adminRole, // role
                        null, // ventas
                        null // pedidos
                )
                );

    }

    @Transactional
    public RoleBean getOrSaveRol(RoleBean role) {
        Optional<RoleBean> foundRole = roleRepository.findByNombre(role.getNombre());
        return foundRole.orElseGet(() -> roleRepository.saveAndFlush(role));
    }

    @Transactional
    public UsuarioBean getOrSaveUser(UsuarioBean usuario) {
        Optional<UsuarioBean> foundUser = usuarioRepository.findByEmail(usuario.getEmail());
        return foundUser.orElseGet(() -> usuarioRepository.saveAndFlush(usuario));
    }
}

