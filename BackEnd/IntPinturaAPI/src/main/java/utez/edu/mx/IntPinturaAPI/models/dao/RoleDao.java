package utez.edu.mx.IntPinturaAPI.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;

import java.util.Optional;

@Repository
public interface RoleDao extends JpaRepository<RoleBean, Integer> {

    // Buscar rol por nombre (si es necesario)
    Optional<RoleBean> findByNombre(String nombre);
}
