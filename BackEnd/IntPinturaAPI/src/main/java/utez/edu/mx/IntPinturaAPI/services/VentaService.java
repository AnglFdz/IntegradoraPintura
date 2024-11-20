package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.edu.mx.IntPinturaAPI.models.dao.VentaDao;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDto;
import utez.edu.mx.IntPinturaAPI.models.entity.VentaBean;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class VentaService {

    @Autowired
    private VentaDao ventaRepository;

    // Obtener todas las ventas
    public List<VentaDto> getAllVentas() {
        return ventaRepository.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener venta por ID
    public Optional<VentaDto> getVentaById(Integer id) {
        return ventaRepository.findById(id).map(this::toDTO);
    }

    // Crear o actualizar venta
    public VentaDto saveVenta(VentaBean venta) {
        return toDTO(ventaRepository.save(venta));
    }

    // Convertir de VentaBean a VentaDto
    private VentaDto toDTO(VentaBean venta) {
        return VentaDto.builder()
                .id_venta(venta.getId_venta())
                .cantidad(venta.getCantidad())
                .total(venta.getTotal())
                .fechaVenta(venta.getFechaVenta())
                .id_usuario(venta.getUsuario() != null ? venta.getUsuario().getId_usuario() : null)
                .id_pedido(venta.getPedido() != null ? venta.getPedido().getId() : null)
                .productos(venta.getProductos().stream()
                        .map(producto -> ProductoDto.builder()
                                .id_producto(producto.getId_producto())
                                .nombre(producto.getNombre())
                                .precio(producto.getPrecio())
                                .build())
                        .collect(Collectors.toSet()))
                .build();
    }

    // Método adicional para eliminar venta (opcional)
    public void deleteVenta(Integer id) {
        ventaRepository.deleteById(id);
    }
}
