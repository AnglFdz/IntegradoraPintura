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
}
