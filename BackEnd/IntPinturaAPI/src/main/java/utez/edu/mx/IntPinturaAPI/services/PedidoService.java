package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.edu.mx.IntPinturaAPI.models.dao.PedidoDao;
import utez.edu.mx.IntPinturaAPI.models.dto.PedidoDto;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDto;
import utez.edu.mx.IntPinturaAPI.models.entity.PedidoBean;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoDao pedidoDao;

    // Obtener todos los pedidos
    public List<PedidoDto> getAllPedidos() {
        return pedidoDao.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    // Obtener pedido por ID
    public Optional<PedidoDto> getPedidoById(Integer id) {
        return pedidoDao.findById(id).map(this::toDTO);
    }

    // Obtener pedido por número de identificador
    public Optional<PedidoDto> getPedidoByNumIdentificador(String num_identificador) {
        return pedidoDao.findByNumidentificador(num_identificador).map(this::toDTO);
    }

    // Crear o actualizar pedido
    public PedidoDto savePedido(PedidoBean pedido) {
        return toDTO(pedidoDao.save(pedido));
    }

    // Convertir de PedidoBean a PedidoDTO
    private PedidoDto toDTO(PedidoBean pedido) {
        return PedidoDto.builder()
                .id(pedido.getId())
                .numidentificador(pedido.getNumidentificador())
                .total(pedido.getTotal())
                .id_usuario(pedido.getUsuario() != null ? pedido.getUsuario().getId_usuario() : null)
                .id_role(pedido.getRole() != null ? pedido.getRole().getId_role() : null)
                .ventas(pedido.getVentas().stream()
                        .map(venta -> VentaDto.builder()
                                .id_venta(venta.getId_venta())
                                .cantidad(venta.getCantidad())
                                .total(venta.getTotal())
                                .fechaVenta(venta.getFechaVenta())
                                .build())
                        .collect(Collectors.toSet()))
                .build();
    }
}
