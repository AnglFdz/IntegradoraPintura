package utez.edu.mx.IntPinturaAPI.models.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {

    private Integer id_usuario;
    private String nombre;
    private String ap1;
    private String ap2;
    private String email;
    private String contrasena;
    private RoleBean role;

    // Constructor que recibe una entidad UsuarioBean
    public UsuarioDto(UsuarioBean usuarioEntity) {
        this.id_usuario = usuarioEntity.getId_usuario();
        this.nombre = usuarioEntity.getNombre();
        this.ap1 = usuarioEntity.getAp1();
        this.ap2 = usuarioEntity.getAp2();
        this.email = usuarioEntity.getEmail();
        this.contrasena = usuarioEntity.getContrasena();
        this.role = usuarioEntity.getRole();
    }

    // Método para convertir el DTO en una entidad UsuarioBean
    public UsuarioBean toEntity() {
        UsuarioBean usuario = new UsuarioBean();
        usuario.setId_usuario(this.id_usuario);
        usuario.setNombre(this.nombre);
        usuario.setAp1(this.ap1);
        usuario.setAp2(this.ap2);
        usuario.setEmail(this.email);
        usuario.setContrasena(this.contrasena);
        usuario.setRole(this.role);
        usuario.setStatus(true); // Activo por defecto
        usuario.setBlocked(false); // No bloqueado por defecto
        return usuario;
    }
}
