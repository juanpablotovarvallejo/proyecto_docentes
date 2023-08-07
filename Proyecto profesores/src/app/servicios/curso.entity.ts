export class Curso {
    id: number;
    facultad: string;
    carrera: string;
    asignatura: string;
    periodo: string;
    nivel: number;
    paralelo: string;
    profesor_id: number;

    constructor(id: number, facultad: string, carrera: string, asignatura: string, periodo: string, nivel: number, paralelo: string, profesor_id: number) {
        this.id = id;
        this.facultad = facultad;
        this.carrera = carrera;
        this.asignatura = asignatura;
        this.periodo = periodo;
        this.nivel = nivel;
        this.paralelo = paralelo;
        this.profesor_id = profesor_id;
    }
}