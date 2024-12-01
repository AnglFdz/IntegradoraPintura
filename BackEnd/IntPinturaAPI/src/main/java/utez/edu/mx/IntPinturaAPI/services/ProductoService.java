package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import utez.edu.mx.IntPinturaAPI.models.dao.ProductoDao;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;

import java.io.IOException;
import java.util.Arrays;
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


    public Optional<ProductoDto> updateProducto(Integer id, ProductoDto productoDto, MultipartFile imagen) {
        Optional<ProductoBean> existingProducto = productoRepository.findById(id);
        if (existingProducto.isPresent()) {
            ProductoBean producto = existingProducto.get();
            producto.setNombre(productoDto.getNombre());
            producto.setStock(productoDto.getStock());
            producto.setPrecio(productoDto.getPrecio());
            producto.setDescripcion(productoDto.getDescripcion());
            producto.setCategoria(productoDto.getCategoria());

            try {
                if (imagen != null && !imagen.isEmpty()) {
                    producto.setImagen(imagen.getBytes()); // Actualizar la imagen si se proporciona
                }
            } catch (IOException e) {
                throw new RuntimeException("Error al procesar la imagen", e);
            }

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
        return ProductoDto.fromEntity(producto);
    }

}
