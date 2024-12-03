package utez.edu.mx.IntPinturaAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;
import utez.edu.mx.IntPinturaAPI.services.ProductoService;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    @GetMapping
    public ApiResponse getAllProductos() {
        List<ProductoDto> productos = productoService.getAllProductos();
        return new ApiResponse(productos, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductoById(@PathVariable Integer id) {
        Optional<ProductoDto> productoDto = productoService.getProductoById(id);
        return productoDto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado")));
    }

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> saveProducto(
            @RequestParam("nombre") String nombre,
            @RequestParam("stock") int stock,
            @RequestParam("precio") double precio,
            @RequestParam("descripcion") String descripcion,
            @RequestParam("categoria") String categoria,
            @RequestParam("imagen") MultipartFile imagen) {

        try {
            byte[] imageBytes = null;
            if (imagen != null && !imagen.isEmpty()) {
                imageBytes = imagen.getBytes();
            }

            ProductoDto productoDto = ProductoDto.builder()
                    .nombre(nombre)
                    .stock(stock)
                    .precio(precio)
                    .descripcion(descripcion)
                    .categoria(categoria)
                    .imagen(imageBytes)
                    .build();

            ProductoDto savedProducto = productoService.createProducto(productoDto, imagen);
            return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(savedProducto, HttpStatus.CREATED));
        } catch (IOException e) {
            throw new RuntimeException("Error al procesar la imagen", e);
        }
    }



    @PutMapping(value = "/{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<ApiResponse> updateProducto(
            @PathVariable Integer id,
            @RequestParam(value = "nombre", required = false) String nombre,
            @RequestParam(value = "stock", required = false) Integer stock,
            @RequestParam(value = "precio", required = false) Double precio,
            @RequestParam(value = "descripcion", required = false) String descripcion,
            @RequestParam(value = "categoria", required = false) String categoria,
            @RequestParam(value = "imagen", required = false) MultipartFile imagen) {

        Optional<ProductoDto> productoExistente = productoService.getProductoById(id);
        if (!productoExistente.isPresent()) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado"));
        }

        ProductoDto productoActualizado = productoExistente.get();

        // Actualiza solo los campos que no sean nulos
        if (nombre != null) productoActualizado.setNombre(nombre);
        if (stock != null) productoActualizado.setStock(stock);
        if (precio != null) productoActualizado.setPrecio(precio);
        if (descripcion != null) productoActualizado.setDescripcion(descripcion);
        if (categoria != null) productoActualizado.setCategoria(categoria);

        // Maneja la imagen si se proporciona
        try {
            if (imagen != null && !imagen.isEmpty()) {
                productoActualizado.setImagen(imagen.getBytes());
            }
        } catch (IOException e) {
            throw new RuntimeException("Error al procesar la imagen", e);
        }

        Optional<ProductoDto> updatedProducto = productoService.updateProducto(id, productoActualizado);
        return updatedProducto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado")));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProducto(@PathVariable Integer id) {
        Optional<ProductoDto> existingProducto = productoService.getProductoById(id);
        if (existingProducto.isPresent()) {
            productoService.eliminarProducto(id);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(new ApiResponse(HttpStatus.OK, false, "Producto eliminado exitosamente"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado"));
        }
    }

}
