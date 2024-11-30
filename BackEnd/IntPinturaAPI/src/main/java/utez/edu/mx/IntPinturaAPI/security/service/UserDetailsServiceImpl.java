package utez.edu.mx.IntPinturaAPI.security.service;

import org.springframework.context.annotation.Lazy;
import utez.edu.mx.IntPinturaAPI.models.entity.UsuarioBean;
import utez.edu.mx.IntPinturaAPI.security.entity.UserDetailsImpl;
import utez.edu.mx.IntPinturaAPI.services.UsuarioService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional
public class UserDetailsServiceImpl implements UserDetailsService {

    @Lazy
    private final UsuarioService service;

    public UserDetailsServiceImpl(@Lazy UsuarioService service) {
        this.service = service;
    }

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String usuario) throws UsernameNotFoundException {
        Optional<UsuarioBean> foundUser = service.findByMail(usuario);
        if (foundUser.isPresent())
            return UserDetailsImpl.build(foundUser.get());
        throw new UsernameNotFoundException("UserNotFound");
    }
}

