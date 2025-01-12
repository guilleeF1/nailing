package com.nailing.app.usuario;

import com.nailing.app.securityConfiguration.DbInit;
import java.util.List;
import java.util.Map;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;


@RestController
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.DELETE })
public class UsuarioController {

    @Autowired
    public UsuarioService usuarioSer;
            
    @Autowired
    public DbInit encoder;

    @PostMapping("/usuarios")
    public ResponseEntity<Usuario> addUsuario(@RequestBody Usuario usuario){
        Usuario result = usuarioSer.addUsuario(usuario);
        if(result != null)
            return new ResponseEntity<>(result, HttpStatus.CREATED);
        return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
    }
    
    @PostMapping("/login")
    public ResponseEntity<Usuario> addUsuario(@RequestBody Map<String,String> usuario){
        Usuario result = encoder.findByUsuarioContrasenya(usuario.get("user"), usuario.get("password"));
        if(result!=null){
            return new ResponseEntity<>(result, HttpStatus.OK);
        }else{
            return new ResponseEntity<>(result, HttpStatus.BAD_REQUEST);
        }
        
    }

    @GetMapping("/usuarios")
    public ResponseEntity<List<Usuario>> listUsuarios(){
        List<Usuario> usuarios = usuarioSer.findAll();
        return new ResponseEntity<>(usuarios, HttpStatus.OK);
    }
    
    @DeleteMapping("/usuarios/{id}")
    public void deleteUsuario(@PathVariable Long id) {
        usuarioSer.removeUsuario(id);
    }
    
    @GetMapping("/usuarios/{id}")
    public ResponseEntity<Usuario> showUsuario(@PathVariable Long id){
        return new ResponseEntity<>(usuarioSer.findById(id).get(), HttpStatus.OK);
    }
	
}
