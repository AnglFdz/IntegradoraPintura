package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;
import utez.edu.mx.IntPinturaAPI.models.dao.ProductoDao;
import utez.edu.mx.IntPinturaAPI.models.dao.VentaDao;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;
import utez.edu.mx.IntPinturaAPI.models.entity.VentaBean;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class ProductoService {

    @Autowired
    private ProductoDao productoRepository;

    @Autowired
    private VentaDao ventaRepository;

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
    public ProductoDto createProducto(ProductoDto productoDto, MultipartFile imagen) {
        try {
            ProductoBean producto = productoDto.toEntity();

            if (imagen != null && !imagen.isEmpty()) {
                System.out.println("Imagen recibida: " + imagen.getOriginalFilename());
                byte[] imageBytes = imagen.getBytes();
                producto.setImagen(imageBytes);
                System.out.println("Bytes de la imagen: " + imageBytes.length);
            } else {
                System.out.println("No se recibió una imagen válida.");
            }

            ProductoBean savedProducto = productoRepository.save(producto);


            System.out.println("Imagen guardada en la base de datos: " +
                    (savedProducto.getImagen() != null ? savedProducto.getImagen().length : "null"));

            return toDTO(savedProducto);
        } catch (IOException e) {
            throw new RuntimeException("Error al procesar la imagen", e);
        }
    }


    public Optional<ProductoDto> updateProducto(Integer id, ProductoDto productoDto) {
        Optional<ProductoBean> existingProducto = productoRepository.findById(id);
        if (existingProducto.isPresent()) {
            ProductoBean producto = existingProducto.get();

            // Actualiza solo si los valores no son nulos
            if (productoDto.getNombre() != null) producto.setNombre(productoDto.getNombre());
            if (productoDto.getStock() != null) producto.setStock(productoDto.getStock());
            if (productoDto.getPrecio() != null) producto.setPrecio(productoDto.getPrecio());
            if (productoDto.getDescripcion() != null) producto.setDescripcion(productoDto.getDescripcion());
            if (productoDto.getCategoria() != null) producto.setCategoria(productoDto.getCategoria());
            if (productoDto.getImagen() != null) producto.setImagen(productoDto.getImagen());

            ProductoBean updatedProducto = productoRepository.save(producto);
            return Optional.of(toDTO(updatedProducto));
        }
        return Optional.empty();
    }



    // Eliminar producto
    @Transactional
    public boolean eliminarProducto(Integer idProducto) {
        // Obtener el producto con sus relaciones
        ProductoBean producto = productoRepository.findById(idProducto)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado"));

        // Desvincular el producto de las ventas
        Set<VentaBean> ventasAsociadas = producto.getVentas();
        for (VentaBean venta : ventasAsociadas) {
            venta.getProductos().remove(producto);
            ventaRepository.save(venta); // Actualiza la venta en la base de datos
        }

        // Eliminar el producto después de desvincularlo
        productoRepository.delete(producto);

        return true;
    }


    // Convertir de ProductoBean a ProductoDTO
    private ProductoDto toDTO(ProductoBean producto) {
        return ProductoDto.fromEntity(producto);
    }

}
