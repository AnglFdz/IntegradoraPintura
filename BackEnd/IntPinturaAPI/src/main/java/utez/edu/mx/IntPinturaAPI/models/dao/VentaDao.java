package utez.edu.mx.IntPinturaAPI.models.dao;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;
import utez.edu.mx.IntPinturaAPI.models.entity.VentaBean;

import java.util.List;
import java.util.Optional;

public interface VentaDao extends JpaRepository<VentaBean, Integer> {
    @EntityGraph(attributePaths = {"productos"})
    List<VentaBean> findAll();

    @EntityGraph(attributePaths = {"productos"})
    Optional<VentaBean> findById(Integer id);

    List<VentaBean> findByUsuario(UsuarioBean usuario);

}