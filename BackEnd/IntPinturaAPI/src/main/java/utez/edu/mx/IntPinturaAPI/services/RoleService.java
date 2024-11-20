package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.edu.mx.IntPinturaAPI.models.dao.RoleDao;
import utez.edu.mx.IntPinturaAPI.models.dto.RoleDto;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleDao roleDao;

    // Obtener todos los roles
    public List<RoleDto> getAllRoles() {
        return roleDao.findAll().stream()
                .map(role -> RoleDto.builder()
                        .id_role(role.getId_role())
                        .nombre(role.getNombre())
                        .build())
                .collect(Collectors.toList());
    }

    // Obtener rol por ID
    public Optional<RoleDto> getRoleById(Integer id) {
        return roleDao.findById(id)
                .map(role -> RoleDto.builder()
                        .id_role(role.getId_role())
                        .nombre(role.getNombre())
                        .build());
    }

    // Crear rol
    public RoleDto saveRole(RoleDto roleDto) {
        RoleBean role = new RoleBean();
        role.setNombre(roleDto.getNombre());
        roleDao.save(role);

        return RoleDto.builder()
                .id_role(role.getId_role())
                .nombre(role.getNombre())
                .build();
    }

    // Actualizar rol
    public Optional<RoleDto> updateRole(Integer id, RoleDto roleDto) {
        return roleDao.findById(id)
                .map(role -> {
                    role.setNombre(roleDto.getNombre());
                    roleDao.save(role);
                    return RoleDto.builder()
                            .id_role(role.getId_role())
                            .nombre(role.getNombre())
                            .build();
                });
    }

    // Eliminar rol
    public boolean deleteRole(Integer id) {
        if (roleDao.existsById(id)) {
            roleDao.deleteById(id);
            return true;
        }
        return false;
    }
}
