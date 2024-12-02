package utez.edu.mx.IntPinturaAPI.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;
import utez.edu.mx.IntPinturaAPI.models.dao.PedidoDao;
import utez.edu.mx.IntPinturaAPI.models.dao.ProductoDao;
import utez.edu.mx.IntPinturaAPI.models.dao.UsuarioDao;
import utez.edu.mx.IntPinturaAPI.models.dao.VentaDao;
import utez.edu.mx.IntPinturaAPI.models.dto.ProductoDto;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDetalleDto;
import utez.edu.mx.IntPinturaAPI.models.dto.VentaDto;
import utez.edu.mx.IntPinturaAPI.models.entity.PedidoBean;
import utez.edu.mx.IntPinturaAPI.models.entity.ProductoBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;
import utez.edu.mx.IntPinturaAPI.models.entity.VentaBean;

import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class VentaService {

    @Autowired
    private VentaDao ventaRepository;

    @Autowired
    private ProductoDao productoRepository;

    @Autowired
    private PedidoDao pedidoRepository;

    @Autowired
    private UsuarioDao usuarioRepository;

    public List<VentaDetalleDto> getAllVentas() {
        return ventaRepository.findAll().stream()
                .map(this::toDetalleDTO)
                .collect(Collectors.toList());
    }

    public Optional<VentaDetalleDto> getVentaById(Integer id) {
        return ventaRepository.findById(id).map(this::toDetalleDTO);
    }


    // Crear o actualizar venta
    public VentaDto saveVenta(VentaDto ventaDto) {
        VentaBean ventaBean = new VentaBean();
        ventaBean.setCantidad(ventaDto.getCantidad());
        ventaBean.setTotal(ventaDto.getTotal());
        ventaBean.setFechaVenta(ventaDto.getFechaVenta());

        // Permitir crear la venta sin un pedido inicialmente
        if (ventaDto.getId_pedido() != null) {
            PedidoBean pedido = pedidoRepository.findById(ventaDto.getId_pedido())
                    .orElseThrow(() -> new RuntimeException("Pedido con ID " + ventaDto.getId_pedido() + " no encontrado"));
            ventaBean.setPedido(pedido);
        }

        // Asociar usuario
        UsuarioBean usuario = usuarioRepository.findById(ventaDto.getId_usuario())
                .orElseThrow(() -> new RuntimeException("Usuario con ID " + ventaDto.getId_usuario() + " no encontrado"));
        ventaBean.setUsuario(usuario);

        // Asociar productos
        Set<ProductoBean> productos = ventaDto.getProductos().stream()
                .map(idProducto -> productoRepository.findById(idProducto)
                        .orElseThrow(() -> new RuntimeException("Producto con ID " + idProducto + " no encontrado")))
                .collect(Collectors.toSet());
        ventaBean.setProductos(productos);

        VentaBean savedVenta = ventaRepository.save(ventaBean);

        return VentaDto.builder()
                .id_venta(savedVenta.getId_venta())
                .cantidad(savedVenta.getCantidad())
                .total(savedVenta.getTotal())
                .fechaVenta(savedVenta.getFechaVenta())
                .id_usuario(savedVenta.getUsuario().getId_usuario())
                .id_pedido(savedVenta.getPedido() != null ? savedVenta.getPedido().getId() : null) // Puede ser null
                .productos(ventaDto.getProductos())
                .build();
    }

    public VentaDto updateVentaWithPedido(Integer idVenta, Integer idPedido) {
        VentaBean venta = ventaRepository.findById(idVenta)
                .orElseThrow(() -> new RuntimeException("Venta con ID " + idVenta + " no encontrada"));

        PedidoBean pedido = pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido con ID " + idPedido + " no encontrado"));

        venta.setPedido(pedido);
        VentaBean updatedVenta = ventaRepository.save(venta);

        return VentaDto.builder()
                .id_venta(updatedVenta.getId_venta())
                .cantidad(updatedVenta.getCantidad())
                .total(updatedVenta.getTotal())
                .fechaVenta(updatedVenta.getFechaVenta())
                .id_usuario(updatedVenta.getUsuario().getId_usuario())
                .id_pedido(updatedVenta.getPedido().getId())
                .productos(updatedVenta.getProductos().stream()
                        .map(ProductoBean::getId_producto)
                        .collect(Collectors.toList()))
                .build();
    }





    private VentaDetalleDto toDetalleDTO(VentaBean venta) {
        return VentaDetalleDto.builder()
                .id_venta(venta.getId_venta())
                .cantidad(venta.getCantidad())
                .total(venta.getTotal())
                .fechaVenta(venta.getFechaVenta())
                .id_usuario(venta.getUsuario().getId_usuario())
                .id_pedido(venta.getPedido() != null ? venta.getPedido().getId() : null)
                .productos(venta.getProductos().stream()
                        .map(producto -> ProductoDto.builder()
                                .id_producto(producto.getId_producto())
                                .nombre(producto.getNombre())
                                .stock(producto.getStock())
                                .precio(producto.getPrecio())
                                .build())
                        .collect(Collectors.toList()))
                .build();
    }



    private VentaDto toDTO(VentaBean venta) {
        return VentaDto.builder()
                .id_venta(venta.getId_venta())
                .cantidad(venta.getCantidad())
                .total(venta.getTotal())
                .fechaVenta(venta.getFechaVenta())
                .id_usuario(venta.getUsuario().getId_usuario())
                .id_pedido(venta.getPedido() != null ? venta.getPedido().getId() : null)
                .productos(venta.getProductos().stream()
                        .map(ProductoBean::getId_producto) // Extraer solo los IDs
                        .collect(Collectors.toList()))
                .build();
    }



    private PedidoBean validateAndGetPedido(Integer idPedido) {
        if (idPedido == null) {
            throw new RuntimeException("El ID del pedido es obligatorio para crear una venta");
        }
        return pedidoRepository.findById(idPedido)
                .orElseThrow(() -> new RuntimeException("Pedido con ID " + idPedido + " no encontrado"));
    }



    // Método adicional para eliminar venta
    public void deleteVenta(Integer id) {
        ventaRepository.deleteById(id);
    }

    public List<VentaDetalleDto> getComprasPorUsuario(Integer idUsuario) {
        UsuarioBean usuario = usuarioRepository.findById(idUsuario)
                .orElseThrow(() -> new RuntimeException("Usuario con ID " + idUsuario + " no encontrado"));

        return ventaRepository.findByUsuario(usuario).stream()
                .map(this::toDetalleDTO)
                .collect(Collectors.toList());
    }



}
