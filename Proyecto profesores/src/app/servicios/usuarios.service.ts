// app/usuarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from './usuario.entity';
// Asegúrate de tener el modelo Usuario definido

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    private apiUrl = 'http://localhost:3000/api/';

    constructor(private http: HttpClient) { }

    solicitudGet(url: string): Observable<Object[]> {
        return this.http.get<Object[]>(this.apiUrl + url);
    }

    solicitudPost(url: string, data: any): Observable<Object> {
        return this.http.post<Object>(this.apiUrl + url, data);
    }

    // Agregar métodos para actualizar y eliminar usuarios
}
