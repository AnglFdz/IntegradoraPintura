package utez.edu.mx.IntPinturaAPI.controllers.auth.Dto;


import lombok.Data;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Data
public class SignDto {
    @NotBlank
    @NotEmpty
    private String usuario;
    @NotBlank
    @NotEmpty
    private String contrasenia;
}
