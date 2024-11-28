package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import utez.edu.mx.IntPinturaAPI.models.dao.RoleDao;
import utez.edu.mx.IntPinturaAPI.models.dao.UsuarioDao;
import utez.edu.mx.IntPinturaAPI.models.dto.UsuarioDto;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class UsuarioService {

    @Autowired
    private UsuarioDao usuarioDao;

    @Autowired
    private RoleDao roleDao;

    // Obtener todos los usuarios
    @Transactional(readOnly = true)
    public List<UsuarioDto> getAllUsuarios() {
        return usuarioDao.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener un usuario por ID
    @Transactional(readOnly = true)
    public Optional<UsuarioDto> getUsuarioById(Integer id) {
        return usuarioDao.findById(id).map(this::toDTO);
    }

    // Obtener un usuario por email
    @Transactional(readOnly = true)
    public Optional<UsuarioDto> getUsuarioByEmail(String email) {
        return usuarioDao.findByEmail(email).map(this::toDTO);
    }


    @Transactional(readOnly = true)
    public Optional<UsuarioBean> findByMail(String mail) {
        return usuarioDao.findByEmail(mail);
    }

    @Transactional
    public UsuarioDto createUsuarioByRole(UsuarioDto usuarioDto, String roleName) {
        // Buscar el rol en la base de datos
        Optional<RoleBean> role = roleDao.findByNombre(roleName);
        if (!role.isPresent()) {
            throw new IllegalArgumentException("El rol especificado no existe");
        }

        // Crear y asignar el usuario con el rol encontrado
        UsuarioBean usuario = new UsuarioBean();
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setAp1(usuarioDto.getAp1());
        usuario.setAp2(usuarioDto.getAp2());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setContrasena(usuarioDto.getContrasena());
        usuario.setRole(role.get());

        // Guardar el usuario en la base de datos
        UsuarioBean savedUsuario = usuarioDao.save(usuario);
        return toDTO(savedUsuario);
    }


    // Crear o actualizar un usuario
    @Transactional
    public UsuarioDto saveUsuario(UsuarioDto usuarioDto) {
        UsuarioBean usuario = new UsuarioBean();
        usuario.setNombre(usuarioDto.getNombre());
        usuario.setAp1(usuarioDto.getAp1());
        usuario.setAp2(usuarioDto.getAp2());
        usuario.setEmail(usuarioDto.getEmail());
        usuario.setContrasena(usuarioDto.getContrasena());

        // Asignar rol al usuario
        if (usuarioDto.getRole() != null && usuarioDto.getRole().getNombre() != null) {
            Optional<RoleBean> role = roleDao.findByNombre(usuarioDto.getRole().getNombre());
            role.ifPresent(usuario::setRole);
        }

        UsuarioBean savedUsuario = usuarioDao.save(usuario);
        return toDTO(savedUsuario);
    }

    // Actualizar usuario
    @Transactional
    public Optional<UsuarioDto> updateUsuario(Integer id, UsuarioDto usuarioDto) {
        Optional<UsuarioBean> existingUsuario = usuarioDao.findById(id);
        if (existingUsuario.isPresent()) {
            UsuarioBean usuario = existingUsuario.get();
            usuario.setNombre(usuarioDto.getNombre());
            usuario.setAp1(usuarioDto.getAp1());
            usuario.setAp2(usuarioDto.getAp2());
            usuario.setEmail(usuarioDto.getEmail());
            usuario.setContrasena(usuarioDto.getContrasena());

            // Actualizar role si se pasa
            if (usuarioDto.getRole().getNombre() != null) {
                Optional<RoleBean> role = roleDao.findByNombre(usuarioDto.getRole().getNombre());
                role.ifPresent(usuario::setRole);
            }

            usuarioDao.save(usuario);
            return Optional.of(toDTO(usuario));
        }
        return Optional.empty();
    }

    // Eliminar usuario
    @Transactional
    public boolean deleteUsuario(Integer id) {
        if (usuarioDao.existsById(id)) {
            usuarioDao.deleteById(id);
            return true;
        }
        return false;
    }

    // Convertir de UsuarioBean a UsuarioDto
    private UsuarioDto toDTO(UsuarioBean usuario) {
        return UsuarioDto.builder()
                .id_usuario(usuario.getId_usuario())
                .nombre(usuario.getNombre())
                .ap1(usuario.getAp1())
                .ap2(usuario.getAp2())
                .email(usuario.getEmail())
                .contrasena(usuario.getContrasena())
                .role(usuario.getRole() != null ? usuario.getRole() : null)
                .build();
    }
}
