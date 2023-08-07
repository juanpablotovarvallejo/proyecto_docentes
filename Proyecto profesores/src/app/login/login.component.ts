import { Component } from '@angular/core';
import { AuthService } from '../servicios/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  cedula= '';
  contrasena = '';

  constructor(private authService: AuthService) { }

  onSubmit() {
    console.log(this.cedula+ ' ' + this.contrasena)
    this.authService.login(this.cedula, this.contrasena).subscribe(
      (response) => {
        // Manejar la respuesta del backend en caso de éxito
        console.log(response);
        // Guardar el usuario en memoria interna
        localStorage.setItem('usuario', JSON.stringify(response))
        // Redirijir a la ruta /notas
        window.location.href='/notas'
      },
      (error) => {
        // Manejar el error del backend en caso de fallo en la autenticación
        console.error('Error en el inicio de sesión');
      }
    );
  }
}
