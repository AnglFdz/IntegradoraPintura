package utez.edu.mx.IntPinturaAPI.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utez.edu.mx.IntPinturaAPI.models.entity.PedidoBean;

import java.util.Optional;

@Repository
public interface PedidoDao extends JpaRepository<PedidoBean, Integer> {

    // Buscar por ID
    Optional<PedidoBean> findById(Integer id);

    // Buscar por número de identificador
    Optional<PedidoBean> findByNumidentificador(String numidentificador);


}
