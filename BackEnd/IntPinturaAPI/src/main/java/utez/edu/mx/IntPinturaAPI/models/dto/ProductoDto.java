package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

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
}
