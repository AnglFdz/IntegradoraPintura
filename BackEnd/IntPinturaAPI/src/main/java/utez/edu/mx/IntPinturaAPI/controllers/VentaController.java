package utez.edu.mx.IntPinturaAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDto;
import utez.edu.mx.IntPinturaAPI.models.entity.VentaBean;
import utez.edu.mx.IntPinturaAPI.services.VentaService;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/ventas")
public class VentaController {

    @Autowired
    private VentaService ventaService;

    // Obtener todas las ventas
    @GetMapping
    public ApiResponse getAllVentas() {
        List<VentaDto> ventas = ventaService.getAllVentas();
        return new ApiResponse(ventas, HttpStatus.OK);
    }

    // Obtener venta por ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getVentaById(@PathVariable Integer id) {
        Optional<VentaDto> ventaDto = ventaService.getVentaById(id);
        return ventaDto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Venta no encontrada")));
    }

    // Crear o actualizar venta
    @PostMapping
    public ResponseEntity<ApiResponse> saveVenta(@RequestBody VentaDto ventaDto) {
        VentaBean ventaBean = new VentaBean();
        ventaBean.setCantidad(ventaDto.getCantidad());
        ventaBean.setTotal(ventaDto.getTotal());
        ventaBean.setFechaVenta(ventaDto.getFechaVenta());

        // Asignar el usuario y el pedido a la venta
        // Aquí debes asignar el usuario y el pedido correctamente.
        // UsuarioBean usuario = usuarioService.getUsuarioById(ventaDto.getId_usuario()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        // PedidoBean pedido = pedidoService.getPedidoById(ventaDto.getId_pedido()).orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
        // ventaBean.setUsuario(usuario);
        // ventaBean.setPedido(pedido);

        VentaDto savedVenta = ventaService.saveVenta(ventaBean);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(savedVenta, HttpStatus.CREATED));
    }

    // Actualizar venta
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateVenta(@PathVariable Integer id, @RequestBody VentaDto ventaDto) {
        Optional<VentaDto> existingVenta = ventaService.getVentaById(id);
        if (existingVenta.isPresent()) {
            VentaBean ventaBean = new VentaBean();
            ventaBean.setId_venta(id);
            ventaBean.setCantidad(ventaDto.getCantidad());
            ventaBean.setTotal(ventaDto.getTotal());
            ventaBean.setFechaVenta(ventaDto.getFechaVenta());

            // Asignar el usuario y el pedido
            // UsuarioBean usuario = usuarioService.getUsuarioById(ventaDto.getId_usuario()).orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
            // PedidoBean pedido = pedidoService.getPedidoById(ventaDto.getId_pedido()).orElseThrow(() -> new RuntimeException("Pedido no encontrado"));
            // ventaBean.setUsuario(usuario);
            // ventaBean.setPedido(pedido);

            VentaDto updatedVenta = ventaService.saveVenta(ventaBean);
            return ResponseEntity.ok(new ApiResponse(updatedVenta, HttpStatus.OK));
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Venta no encontrada"));
        }
    }

    // Eliminar venta
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteVenta(@PathVariable Integer id) {
        ventaService.deleteVenta(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).body(new ApiResponse("Venta eliminada correctamente", HttpStatus.NO_CONTENT));
    }
}
