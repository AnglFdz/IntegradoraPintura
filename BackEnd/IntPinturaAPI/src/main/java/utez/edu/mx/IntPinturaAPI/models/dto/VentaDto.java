package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.Builder;
import lombok.Data;
import java.util.Set;

@Data
@Builder
public class VentaDto {
    private Integer id_venta;
    private Integer cantidad;
    private Double total;
    private String fechaVenta;
    private Integer id_usuario;  // O algún objeto UsuarioDto si lo prefieres
    private Integer id_pedido;   // Asegúrate de que este campo esté presente
    private Set<ProductoDto> productos;
}
