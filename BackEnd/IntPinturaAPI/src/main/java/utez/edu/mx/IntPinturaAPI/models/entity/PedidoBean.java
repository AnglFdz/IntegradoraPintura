package utez.edu.mx.IntPinturaAPI.models.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "pedido")
public class PedidoBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "numidentificador", nullable = false)
    private String numidentificador;

    @Column(name = "total", nullable = false)
    private Double total;

    // Relación Many-to-One con Usuario
    @ManyToOne
    @JoinColumn(name = "id_usuario")
    private UsuarioBean usuario;

    @ManyToOne
    @JoinColumn(name = "id_role")
    private RoleBean role;

    // Relación One-to-Many con Venta
    @OneToMany(mappedBy = "pedido")
    @JsonIgnore // Evita la serialización cíclica
    private Set<VentaBean> ventas;

}
