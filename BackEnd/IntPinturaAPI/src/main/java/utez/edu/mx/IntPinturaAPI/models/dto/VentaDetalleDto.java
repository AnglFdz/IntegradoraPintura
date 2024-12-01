package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class VentaDetalleDto {
    private Integer id_venta;
    private Integer cantidad;
    private Double total;
    private String fechaVenta;
    private Integer id_usuario;
    private Integer id_pedido;
    private List<ProductoDto> productos;
}

