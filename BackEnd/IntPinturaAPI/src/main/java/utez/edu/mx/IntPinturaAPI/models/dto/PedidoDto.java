package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Set;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PedidoDto {

    private Integer id;
    private String numidentificador;
    private Double total;
    private Integer id_usuario; // ID del usuario que realizó el pedido
    private Integer id_role;   // ID del role del usuario
    private Set<VentaDto> ventas; // Ventas asociadas al pedido
}
