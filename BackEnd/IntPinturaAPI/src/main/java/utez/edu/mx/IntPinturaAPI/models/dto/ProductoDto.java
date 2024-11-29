package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductoDto {

    private Integer id_producto;
    private String nombre;
    private int stock;
    private double precio;
    private String descripcion;
    private byte[] imagen;

    public ProductoBean toEntity() {
        return ProductoBean.builder()
                .id_producto(this.id_producto)
                .nombre(this.nombre)
                .stock(this.stock)
                .precio(this.precio)
                .descripcion(this.descripcion)
                .imagen(this.imagen)
                .build();
    }
}
