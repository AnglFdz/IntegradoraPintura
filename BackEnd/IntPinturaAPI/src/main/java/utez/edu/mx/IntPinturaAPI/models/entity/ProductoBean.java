package utez.edu.mx.IntPinturaAPI.models.entity;

import jakarta.persistence.*;
import lombok.*;
import com.fasterxml.jackson.annotation.JsonIgnore;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Builder
@Table(name = "producto")
public class ProductoBean {
    // Método adicional para obtener el ID del producto
    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_producto;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @Column(name = "stock", nullable = false)
    private int stock;

    @Column(name = "precio", nullable = false)
    private double precio;

    @Column(name = "descripcion", nullable = false)
    private String descripcion;

    @Column(name = "imagen", nullable = false)  // Corregido aquí
    private byte[] imagen;

    // Relación Many-to-Many con Venta
    @ManyToMany(mappedBy = "productos")
    @JsonIgnore // Evita la serialización cíclica
    private Set<VentaBean> ventas;

}
