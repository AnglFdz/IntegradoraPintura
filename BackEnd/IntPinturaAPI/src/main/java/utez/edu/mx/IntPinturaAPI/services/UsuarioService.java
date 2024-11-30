package utez.edu.mx.IntPinturaAPI.services;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.IntPinturaAPI.models.dao.RoleDao;
import utez.edu.mx.IntPinturaAPI.models.dao.UsuarioDao;
import utez.edu.mx.IntPinturaAPI.models.dto.UsuarioDto;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    private static final Logger logger = LoggerFactory.getLogger(UsuarioService.class);

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private RoleDao roleDao;

    @Autowired
    @Lazy
    private PasswordEncoder passwordEncoder;

    public UsuarioService(UsuarioDao usuarioDao, RoleDao roleDao, PasswordEncoder passwordEncoder) {
        this.usuarioDao = usuarioDao;
        this.roleDao = roleDao;
        this.passwordEncoder = passwordEncoder;
    }

    @Transactional(readOnly = true)
    public List<UsuarioDto> getAllUsuarios() {
        return usuarioDao.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public Optional<UsuarioDto> getUsuarioById(Integer id) {
        return usuarioDao.findById(id).map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public Optional<UsuarioDto> getUsuarioByEmail(String email) {
        return usuarioDao.findByEmail(email).map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public Optional<UsuarioBean> findByMail(String mail) {
        return usuarioDao.findByEmail(mail);
    }

    @Transactional
    public UsuarioDto saveUsuario(UsuarioDto usuarioDto) {
        UsuarioBean usuario = new UsuarioBean();
        setUsuarioData(usuario, usuarioDto, true);
        UsuarioBean savedUsuario = usuarioDao.save(usuario);
        return toDTO(savedUsuario);
    }

    @Transactional
    public Optional<UsuarioDto> updateUsuario(Integer id, UsuarioDto usuarioDto) {
        Optional<UsuarioBean> existingUsuario = usuarioDao.findById(id);
        if (existingUsuario.isPresent()) {
            UsuarioBean usuario = existingUsuario.get();
            setUsuarioData(usuario, usuarioDto, false);
            usuarioDao.save(usuario);
            return Optional.of(toDTO(usuario));
        }
        return Optional.empty();
    }

    @Transactional
    public boolean deleteUsuario(Integer id) {
        if (usuarioDao.existsById(id)) {
            usuarioDao.deleteById(id);
            return true;
        }
        return false;
    }

    private void setUsuarioData(UsuarioBean usuario, UsuarioDto usuarioDto, boolean isNew) {
        logger.info("Iniciando la configuración del usuario...");
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setAp1(usuarioDto.getAp1());
        usuario.setAp2(usuarioDto.getAp2());
        usuario.setEmail(usuarioDto.getEmail());

        if (usuarioDto.getContrasena() != null && !usuarioDto.getContrasena().isEmpty()) {
            String encodedPassword = passwordEncoder.encode(usuarioDto.getContrasena());
            logger.info("Contraseña original: {}", usuarioDto.getContrasena());
            logger.info("Contraseña encriptada: {}", encodedPassword);
            usuario.setContrasena(encodedPassword);
        } else if (isNew) {
            throw new IllegalArgumentException("La contraseña es obligatoria para un nuevo usuario.");
        }

        if (usuarioDto.getRole() != null && usuarioDto.getRole().getNombre() != null) {
            Optional<RoleBean> role = roleDao.findByNombre(usuarioDto.getRole().getNombre());
            role.ifPresent(usuario::setRole);
        }

        if (isNew) {
            usuario.setStatus(true);
            usuario.setBlocked(false);
        }
        logger.info("Configuración del usuario completada: {}", usuario);
    }

    @Transactional
    public UsuarioDto createUsuarioByRole(UsuarioDto usuarioDto, String roleName) {
        logger.info("Buscando rol con nombre: {}", roleName);

        // Buscar el rol en la base de datos
        Optional<RoleBean> role = roleDao.findByNombre(roleName);
        if (!role.isPresent()) {
            logger.error("Rol no encontrado: {}", roleName);
            throw new IllegalArgumentException("El rol especificado no existe: " + roleName);
        }

        // Crear y asignar el usuario con el rol encontrado
        UsuarioBean usuario = new UsuarioBean();
        logger.info("Asignando datos al usuario con email: {}", usuarioDto.getEmail());
        setUsuarioData(usuario, usuarioDto, true);

        // Asignar el rol encontrado
        usuario.setRole(role.get());
        logger.info("Rol asignado: {}", role.get().getNombre());

        // Guardar el usuario en la base de datos
        UsuarioBean savedUsuario = usuarioDao.save(usuario);
        logger.info("Usuario creado con éxito: ID {}", savedUsuario.getId_usuario());

        return toDTO(savedUsuario);
    }


    private UsuarioDto toDTO(UsuarioBean usuario) {
        return UsuarioDto.builder()
                .id_usuario(usuario.getId_usuario())
                .nombre(usuario.getNombre())
                .ap1(usuario.getAp1())
                .ap2(usuario.getAp2())
                .email(usuario.getEmail())
                .contrasena(usuario.getContrasena())
                .role(usuario.getRole())
                .build();
    }
}
