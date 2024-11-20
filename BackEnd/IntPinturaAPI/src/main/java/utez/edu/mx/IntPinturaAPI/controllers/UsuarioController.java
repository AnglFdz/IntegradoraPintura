package utez.edu.mx.IntPinturaAPI.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import utez.edu.mx.IntPinturaAPI.models.dto.UsuarioDto;
import utez.edu.mx.IntPinturaAPI.services.UsuarioService;
import utez.edu.mx.IntPinturaAPI.config.ApiResponse;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/usuarios")
public class UsuarioController {

    @Autowired
    private UsuarioService usuarioService;

    // Obtener todos los usuarios
    @GetMapping
    public ResponseEntity<ApiResponse> getAllUsuarios() {
        List<UsuarioDto> usuarios = usuarioService.getAllUsuarios();
        ApiResponse response = new ApiResponse(usuarios, HttpStatus.OK);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    // Obtener un usuario por ID
    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse> getUsuarioById(@PathVariable Integer id) {
        Optional<UsuarioDto> usuario = usuarioService.getUsuarioById(id);
        ApiResponse response;

        if (usuario.isPresent()) {
            response = new ApiResponse(usuario.get(), HttpStatus.OK);
        } else {
            response = new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario no encontrado");
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

    // Obtener un usuario por email
    @GetMapping("/email/{email}")
    public ResponseEntity<ApiResponse> getUsuarioByEmail(@PathVariable String email) {
        Optional<UsuarioDto> usuario = usuarioService.getUsuarioByEmail(email);
        ApiResponse response;

        if (usuario.isPresent()) {
            response = new ApiResponse(usuario.get(), HttpStatus.OK);
        } else {
            response = new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario con este email no encontrado");
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

    // Crear un nuevo usuario
    @PostMapping
    public ResponseEntity<ApiResponse> createUsuario(@RequestBody UsuarioDto usuarioDto) {
        ApiResponse response;
        try {
            UsuarioDto createdUsuario = usuarioService.saveUsuario(usuarioDto);
            response = new ApiResponse(createdUsuario, HttpStatus.CREATED);
        } catch (Exception e) {
            response = new ApiResponse(HttpStatus.INTERNAL_SERVER_ERROR, true, "Error al crear el usuario");
        }
        return new ResponseEntity<>(response, response.getStatus());
    }

    // Actualizar un usuario existente
    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse> updateUsuario(@PathVariable Integer id, @RequestBody UsuarioDto usuarioDto) {
        Optional<UsuarioDto> updatedUsuario = usuarioService.updateUsuario(id, usuarioDto);
        ApiResponse response;

        if (updatedUsuario.isPresent()) {
            response = new ApiResponse(updatedUsuario.get(), HttpStatus.OK);
        } else {
            response = new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario no encontrado para actualizar");
        }

        return new ResponseEntity<>(response, response.getStatus());
    }

    // Eliminar un usuario
    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse> deleteUsuario(@PathVariable Integer id) {
        boolean isDeleted = usuarioService.deleteUsuario(id);
        ApiResponse response;

        if (isDeleted) {
            response = new ApiResponse(HttpStatus.NO_CONTENT, false, "Usuario eliminado con éxito");
        } else {
            response = new ApiResponse(HttpStatus.NOT_FOUND, true, "Usuario no encontrado para eliminar");
        }

        return new ResponseEntity<>(response, response.getStatus());
    }
}
