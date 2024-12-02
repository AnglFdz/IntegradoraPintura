package utez.edu.mx.IntPinturaAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDetalleDto;
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
    public ResponseEntity<List<VentaDetalleDto>> getAllVentas() {
        List<VentaDetalleDto> ventas = ventaService.getAllVentas();
        return ResponseEntity.ok(ventas);
    }

    // Obtener venta por ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getVentaById(@PathVariable Integer id) {
        Optional<VentaDetalleDto> ventaDto = ventaService.getVentaById(id);
        return ventaDto.map(dto -> ResponseEntity.ok(new ApiResponse(dto, HttpStatus.OK)))
                .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
                        .body(new ApiResponse(HttpStatus.NOT_FOUND, true, "Venta no encontrada")));
    }

    // Crear una nueva venta
    @PostMapping
    public ResponseEntity<ApiResponse> saveVenta(@RequestBody VentaDto ventaDto) {
        VentaDto savedVenta = ventaService.saveVenta(ventaDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(new ApiResponse(savedVenta, HttpStatus.CREATED));
    }

    @PutMapping("/{idVenta}/pedido/{idPedido}")
    public ResponseEntity<ApiResponse> updateVentaWithPedido(@PathVariable Integer idVenta, @PathVariable Integer idPedido) {
        VentaDto updatedVenta = ventaService.updateVentaWithPedido(idVenta, idPedido);
        return ResponseEntity.ok(new ApiResponse(updatedVenta, HttpStatus.OK));
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteVenta(@PathVariable Integer id) {
        ventaService.deleteVenta(id);
        return ResponseEntity.status(HttpStatus.NO_CONTENT)
                .body(new ApiResponse("Venta eliminada correctamente", HttpStatus.NO_CONTENT));
    }

    @GetMapping("/compras/{idUsuario}")
    public ResponseEntity<List<VentaDetalleDto>> getComprasPorUsuario(@PathVariable Integer idUsuario) {
        List<VentaDetalleDto> compras = ventaService.getComprasPorUsuario(idUsuario);
        return ResponseEntity.ok(compras);
    }


}

