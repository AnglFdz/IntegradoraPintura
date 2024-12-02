package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.*;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;

import jakarta.validation.constraints.NotBlank;

import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoDto {
    private Integer id_producto;
    private String nombre;
    private Integer  stock;
    private Double precio;
    private String descripcion;

    @NotBlank(message = "La categoría no puede estar vacía")
    private String categoria;

    private byte[] imagen;

    public ProductoBean toEntity() {
        ProductoBean producto = ProductoBean.builder()
                .nombre(this.nombre)
                .stock(this.stock)
                .precio(this.precio)
                .descripcion(this.descripcion)
                .categoria(this.categoria)
                .build();
        if (imagen != null) { // Solo verifica que no sea nulo
            producto.setImagen(imagen); // Asigna directamente el byte[]
        }
        return producto;
    }


    public static ProductoDto fromEntity(ProductoBean producto) {
        return ProductoDto.builder()
                .id_producto(producto.getId_producto())
                .nombre(producto.getNombre())
                .stock(producto.getStock())
                .precio(producto.getPrecio())
                .descripcion(producto.getDescripcion())
                .categoria(producto.getCategoria())
                .imagen(producto.getImagen() != null ? producto.getImagen() : null) // Incluye los bytes de la imagen
                .build();
    }

}


