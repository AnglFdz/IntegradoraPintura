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
@ToString
@Table(name = "usuario")
public class UsuarioBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_usuario;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "ap1", nullable = false)
    private String ap1;

    @Column(name = "ap2", nullable = false)
    private String ap2;

    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "contrasena", nullable = false)
    private String contrasena;

    @Column(columnDefinition = "BOOL DEFAULT true")
    private Boolean status;
    @Column(columnDefinition = "BOOL DEFAULT false")
    private Boolean blocked;


    // Relación Many-to-One con Role (cada usuario tiene un rol)
    @ManyToOne
    @JoinColumn(name = "id_role")
    private RoleBean role;

    // Relación One-to-Many con Venta (un usuario puede hacer muchas ventas)
    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private Set<VentaBean> ventas;

    // Relación One-to-Many con Pedido (un usuario puede tener muchos pedidos)
    @OneToMany(mappedBy = "usuario")
    @JsonIgnore
    private Set<PedidoBean> pedidos;


    public UsuarioBean(Integer idUsuario, String nombre, String ap1, String ap2, String email, String contrasena, boolean b, boolean b1, RoleBean role) {
    }
}
