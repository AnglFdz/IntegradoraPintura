package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import utez.edu.mx.IntPinturaAPI.models.dao.PedidoDao;
import utez.edu.mx.IntPinturaAPI.models.dao.UsuarioDao;
import utez.edu.mx.IntPinturaAPI.models.dto.PedidoDto;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDto;
import utez.edu.mx.IntPinturaAPI.models.entity.PedidoBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class PedidoService {

    @Autowired
    private PedidoDao pedidoDao;

    @Autowired
    private UsuarioDao usuarioDao; // Inyección de UsuarioDao

    public List<PedidoDto> getAllPedidos() {
        return pedidoDao.findAll().stream()
                .map(this::toDTO)
                .collect(Collectors.toList());
    }

    public Optional<PedidoDto> getPedidoById(Integer id) {
        return pedidoDao.findById(id).map(this::toDTO);
    }

    public Optional<PedidoDto> getPedidoByNumIdentificador(String num_identificador) {
        return pedidoDao.findByNumidentificador(num_identificador).map(this::toDTO);
    }

    public PedidoDto savePedido(PedidoDto pedidoDto) {
        PedidoBean pedidoBean = new PedidoBean();
        pedidoBean.setNumidentificador(generateTrackingCode());
        pedidoBean.setTotal(pedidoDto.getTotal());
        pedidoBean.setRole(null);

        if (pedidoDto.getId_usuario() != null) {
            UsuarioBean usuario = usuarioDao.findById(pedidoDto.getId_usuario())
                    .orElseThrow(() -> new RuntimeException("Usuario con ID " + pedidoDto.getId_usuario() + " no encontrado"));
            pedidoBean.setUsuario(usuario);
        }

        PedidoBean savedPedido = pedidoDao.save(pedidoBean);
        return toDTO(savedPedido);
    }

    private String generateTrackingCode() {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder code = new StringBuilder();

        for (int i = 0; i < 6; i++) {
            code.append((int) (Math.random() * 10));
        }

        for (int i = 0; i < 2; i++) {
            code.append(characters.charAt((int) (Math.random() * characters.length())));
        }

        if (pedidoDao.findByNumidentificador(code.toString()).isPresent()) {
            return generateTrackingCode();
        }

        return code.toString();
    }

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
