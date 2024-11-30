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

    // Crear producto
    public ProductoDto createProducto(ProductoDto productoDto) {
        ProductoBean producto = productoDto.toEntity();
        ProductoBean savedProducto = productoRepository.save(producto);
        return toDTO(savedProducto);
    }

    // Actualizar producto
    public Optional<ProductoDto> updateProducto(Integer id, ProductoDto productoDto) {
        Optional<ProductoBean> existingProducto = productoRepository.findById(id);
        if (existingProducto.isPresent()) {
            ProductoBean producto = existingProducto.get();
            producto.setNombre(productoDto.getNombre());
            producto.setStock(productoDto.getStock());
            producto.setPrecio(productoDto.getPrecio());
            producto.setDescripcion(productoDto.getDescripcion());
            producto.setCategoria(productoDto.getCategoria());
            producto.setImagen(productoDto.getImagen());
            ProductoBean updatedProducto = productoRepository.save(producto);
            return Optional.of(toDTO(updatedProducto));
        }
        return Optional.empty();
    }

    // Eliminar producto
    public void deleteProducto(Integer id) {
        productoRepository.deleteById(id);
    }

    // Convertir de ProductoBean a ProductoDTO
    private ProductoDto toDTO(ProductoBean producto) {
        return ProductoDto.builder()
                .id_producto(producto.getId_producto())
                .nombre(producto.getNombre())
                .stock(producto.getStock())
                .precio(producto.getPrecio())
                .descripcion(producto.getDescripcion())
                .categoria(producto.getCategoria())
                .imagen(producto.getImagen())
                .build();
    }
}
