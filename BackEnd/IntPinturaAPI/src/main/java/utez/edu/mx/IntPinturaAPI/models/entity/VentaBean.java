package utez.edu.mx.IntPinturaAPI.models.entity;

import jakarta.persistence.*;
import lombok.*;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "venta")
public class VentaBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_venta;

    @Column(name = "cantidad", nullable = false)
    private Integer cantidad;  // Asegúrate de tener este campo

    @Column(name = "total", nullable = false)
    private Double total;

    @Column(name = "fecha_venta", nullable = false)
    private String fechaVenta;  // Asegúrate de tener este campo

    @ManyToOne
    @JoinColumn(name = "id_usuario", nullable = false)
    private UsuarioBean usuario;

    @ManyToOne
    @JoinColumn(name = "id_pedido", nullable = true)
    private PedidoBean pedido;

    @ManyToMany
    @JoinTable(
            name = "venta_producto",
            joinColumns = @JoinColumn(name = "id_venta"),
            inverseJoinColumns = @JoinColumn(name = "id_producto")
    )
    private Set<ProductoBean> productos;
}
