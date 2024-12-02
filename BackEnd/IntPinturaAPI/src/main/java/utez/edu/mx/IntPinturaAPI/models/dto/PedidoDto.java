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
    private Integer id_usuario;
    private Integer id_role;
    private Set<VentaDto> ventas;
}
