import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login'; // Reemplaza con la URL de tu backend de login


  constructor(private http: HttpClient) { }

  login(cedula: string, contrasena: string) {
    // Enviar las credenciales al backend para verificar la autenticación
    return this.http.post(this.apiUrl, { cedula: cedula, contrasena: contrasena });
  }
}
