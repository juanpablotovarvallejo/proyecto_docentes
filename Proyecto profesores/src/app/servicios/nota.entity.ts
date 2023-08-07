export class Nota{
    id: number;
    cedula: string;
    nombres: string;
    nota1: string;
    nota2: string;
    nota3: string;
    recuperacion: number;
    curso_id: string;

    constructor(id: number, cedula: string, nombres: string, nota1: string, nota2: string, nota3: string, recuperacion: number, curso_id: string) {
        this.id = id;
        this.cedula = cedula;
        this.nombres = nombres;
        this.nota1 = nota1;
        this.nota2 = nota2;
        this.nota3 = nota3;
        this.recuperacion = recuperacion;
        this.curso_id = curso_id;
    }
}