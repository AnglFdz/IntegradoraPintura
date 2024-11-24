package utez.edu.mx.IntPinturaAPI.security.entity;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;

import java.util.Collection;
import java.util.Collections;

public class UserDetailsImpl implements UserDetails {

    private String username;
    private String password;
    private boolean isBlocked;
    private boolean isEnabled;
    private Collection<? extends GrantedAuthority> authorities;

    public UserDetailsImpl(String username, String password, boolean isBlocked, boolean isEnabled, Collection<? extends GrantedAuthority> authorities) {
        this.username = username;
        this.password = password;
        this.isBlocked = isBlocked;
        this.isEnabled = isEnabled;
        this.authorities = authorities;
    }

    public static UserDetailsImpl build(UsuarioBean user) {
        if (user.getRole() == null || user.getRole().getNombre() == null) {
            throw new IllegalArgumentException("El usuario no tiene un rol asignado.");
        }
        GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole().getNombre());
        return new UserDetailsImpl(
                user.getEmail(),
                user.getContrasena(),
                user.getBlocked(), // Inversión lógica se maneja directamente aquí
                user.getStatus(),
                Collections.singleton(authority)
        );
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public String getUsername() {
        return username;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return !isBlocked; // Refleja si la cuenta está bloqueada
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return isEnabled;
    }
}
