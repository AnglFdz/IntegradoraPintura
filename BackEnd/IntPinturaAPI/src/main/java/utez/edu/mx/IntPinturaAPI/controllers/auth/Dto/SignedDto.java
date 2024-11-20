package utez.edu.mx.IntPinturaAPI.controllers.auth.Dto;

import lombok.Value;
import utez.edu.mx.IntPinturaAPI.models.dto.UsuarioDto;
import utez.edu.mx.IntPinturaAPI.models.entity.RoleBean;


import java.util.List;

@Value
public class SignedDto {
    String token;
    String tokenType;
    UsuarioDto user;
    RoleBean role;
}
