package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.edu.mx.IntPinturaAPI.models.dao.ProductoDao;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    @Autowired
    private ProductoDao productoRepository;

    // Obtener todos los productos
    public List<ProductoDto> getAllProductos() {
        return productoRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener producto por ID
    public Optional<ProductoDto> getProductoById(Integer id) {
        return productoRepository.findById(id).map(this::toDTO);
    }

    // Obtener producto por nombre
    public Optional<ProductoDto> getProductoByNombre(String nombre) {
        return productoRepository.findByNombre(nombre).map(this::toDTO);
    }

    // Crear o actualizar producto
    public ProductoDto saveProducto(ProductoBean producto) {
        ProductoBean savedProducto = productoRepository.save(producto);

        return toDTO(savedProducto);
    }


    // Convertir de ProductoBean a ProductoDTO
    private ProductoDto toDTO(ProductoBean producto) {
        return ProductoDto.builder()
                .id_producto(producto.getId_producto())
                .nombre(producto.getNombre())
                .stock(producto.getStock())
                .precio(producto.getPrecio())
                .descripcion(producto.getDescripcion())
                .imagen(producto.getImagen())
                .build();
    }

    // Método adicional para eliminar producto (opcional)
    public void deleteProducto(Integer id) {
        productoRepository.deleteById(id);
    }
}
