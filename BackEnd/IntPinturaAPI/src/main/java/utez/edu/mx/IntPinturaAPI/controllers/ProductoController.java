package utez.edu.mx.IntPinturaAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;
import utez.edu.mx.IntPinturaAPI.services.ProductoService;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/productos")
public class ProductoController {

    @Autowired
    private ProductoService productoService;

    // Obtener todos los productos
    @GetMapping
    public ApiResponse getAllProductos() {
        List<ProductoDto> productos = productoService.getAllProductos();
        return new ApiResponse(productos, HttpStatus.OK);
    }

    // Obtener producto por ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getProductoById(@PathVariable Integer id) {
        Optional<ProductoDto> productoDto = productoService.getProductoById(id);
        return productoDto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado")));
    }

    // Crear producto
    @PostMapping
    public ResponseEntity<ApiResponse> saveProducto(@RequestBody ProductoDto productoDto) {
        ProductoDto savedProducto = productoService.createProducto(productoDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(savedProducto, HttpStatus.CREATED));
    }

    // Actualizar producto
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateProducto(@PathVariable Integer id, @RequestBody ProductoDto productoDto) {
        Optional<ProductoDto> updatedProducto = productoService.updateProducto(id, productoDto);
        return updatedProducto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado")));
    }

    // Eliminar producto
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteProducto(@PathVariable Integer id) {
        Optional<ProductoDto> existingProducto = productoService.getProductoById(id);
        if (existingProducto.isPresent()) {
            productoService.deleteProducto(id);
            return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse(HttpStatus.NO_CONTENT, false, "Producto eliminado exitosamente"));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Producto no encontrado"));
        }
    }
}
