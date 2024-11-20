package utez.edu.mx.IntPinturaAPI.models.dao;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductoDao extends JpaRepository<ProductoBean, Integer> {

    // Buscar producto por nombre
    Optional<ProductoBean> findByNombre(String nombre);

    // Buscar producto por precio
    Optional<ProductoBean> findByPrecio(double precio);

    // Buscar productos con stock disponible
    List<ProductoBean> findByStockGreaterThan(int stock);


}
