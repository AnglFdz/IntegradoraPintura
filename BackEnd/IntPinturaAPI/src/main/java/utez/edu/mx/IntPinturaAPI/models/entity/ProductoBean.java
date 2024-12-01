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

    @Column(name = "categoria", nullable = false)
    private String categoria;

    @Lob
    @Column( columnDefinition = "Longblob")
    private byte[] imagen;

    @ManyToMany(mappedBy = "productos")
    @JsonIgnore
    private Set<VentaBean> ventas;

}
