package utez.edu.mx.IntPinturaAPI.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

import java.util.List;
import java.util.Optional;

public interface UsuarioDao extends JpaRepository<UsuarioBean, Integer> {

    // Buscar usuario por email
    Optional<UsuarioBean> findByEmail(String email);
    @Modifying
    @Query(value = "INSERT INTO usuario_roles(usuario_id, rol_id) VALUES (:usuarioId, :rolId)", nativeQuery = true)
    int saveUsuarioRol(@Param("usuarioId") Integer usuarioId, @Param("rolId") Integer rolId);

    @Query(value = "SELECT usuario_id FROM usuario_roles WHERE usuario_id = :usuarioId AND rol_id = :rolId", nativeQuery = true)
    Integer getIdUsuarioRoles(@Param("usuarioId") Integer usuarioId, @Param("rolId") Integer rolId);

}
