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
@Table(name = "role")
public class RoleBean {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id_role;

    @Column(name = "nombre", nullable = false)
    private String nombre;

    @OneToMany(mappedBy = "role")
    @JsonIgnore // Evita la serialización cíclica
    private Set<UsuarioBean> usuario;

}
