package utez.edu.mx.IntPinturaAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.IntPinturaAPI.models.dto.PedidoDto;
import utez.edu.mx.IntPinturaAPI.services.PedidoService;
import utez.edu.mx.IntPinturaAPI.models.entity.PedidoBean;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/pedidos")
public class PedidoController {

    @Autowired
    private PedidoService pedidoService;

    // Obtener todos los pedidos
    @GetMapping
    public ApiResponse getAllPedidos() {
        List<PedidoDto> pedidos = pedidoService.getAllPedidos();
        return new ApiResponse(pedidos, HttpStatus.OK);
    }

    // Obtener pedido por ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getPedidoById(@PathVariable Integer id) {
        Optional<PedidoDto> pedidoDto = pedidoService.getPedidoById(id);
        return pedidoDto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Pedido no encontrado")));
    }

    // Obtener pedido por número de identificador
    @GetMapping("/identificador/{num_identificador}")
    public ResponseEntity<ApiResponse> getPedidoByNumIdentificador(@PathVariable String numidentificador) {
        Optional<PedidoDto> pedidoDto = pedidoService.getPedidoByNumIdentificador(numidentificador);
        return pedidoDto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Pedido no encontrado")));
    }

    // Crear o actualizar pedido
    @PostMapping
    public ResponseEntity<ApiResponse> savePedido(@RequestBody PedidoDto pedidoDto) {
        PedidoBean pedidoBean = new PedidoBean();
        pedidoBean.setNumidentificador(pedidoDto.getNumidentificador());
        pedidoBean.setTotal(pedidoDto.getTotal());

        // Asignar usuario y role aquí si es necesario
        // pedidoBean.setUsuario(usuarioService.getUsuarioById(pedidoDto.getId_usuario()).orElseThrow(...));
        // pedidoBean.setRole(roleService.getRoleById(pedidoDto.getId_role()).orElseThrow(...));

        PedidoDto savedPedido = pedidoService.savePedido(pedidoBean);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(savedPedido, HttpStatus.CREATED));
    }
}
