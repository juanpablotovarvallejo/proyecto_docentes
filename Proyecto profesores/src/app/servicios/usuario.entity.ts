// backend/usuario.entity.ts
export class Usuario {
    id: number;
    nombre: string;
    apellido: string;
    cedula: string;
    contrasena: string;

    constructor(id: number, nombre: string, apellido: string, cedula: string, contrasena: string) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.cedula = cedula;
        this.contrasena = contrasena;
    }

}