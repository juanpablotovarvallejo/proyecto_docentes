import { Component, OnInit, ViewChild } from '@angular/core';
import { Curso } from 'src/app/servicios/curso.entity';
import { TablaComponent } from 'src/app/componentes/tabla/tabla.component';
import { ApiService } from 'src/app/servicios/usuarios.service';


@Component({
  selector: 'app-registro-cursos',
  templateUrl: './registro-cursos.component.html',
  styleUrls: ['./registro-cursos.component.css']
})
export class RegistroCursosComponent {

  columnas = [
    'id',
    'facultad',
    'carrera',
    'asignatura',
    'periodo',
    'nivel',
    'paralelo'
  ]

  cursos: Curso[]
  nuevoCurso: Curso

  @ViewChild(TablaComponent) tablaComponente!: TablaComponent<Curso>// Reemplaza 'TuTablaComponent' con el nombre correcto de tu componente de tabla

  constructor(private apiService: ApiService) {
    this.cursos = []
    this.nuevoCurso = new Curso(0, '', '', '', '', 0, '', JSON.parse(localStorage.getItem('usuario')!)['id'])
  }

  async ngOnInit(): Promise<void> {
    this.obtenerCursos();
  }

  obtenerCursos() {
    this.apiService.solicitudGet('cursos/' + JSON.parse(localStorage.getItem('usuario')!)['id']).subscribe(
      (cursos: any[]) => {
        this.cursos = cursos;
        this.actualizarTabla();
      }
      ,
      (error) => {
        console.error(error);
        this.cursos = []
      }
    );
  }

  agregarCurso() {
    this.apiService.solicitudPost('cursos', this.nuevoCurso).subscribe(
      (curso: any) => {
        this.obtenerCursos();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private actualizarTabla(): void {
    // Comprueba si el componente de tabla existe antes de intentar actualizarlo
    if (this.tablaComponente) {
      this.tablaComponente['dataSource'] = this.cursos; // Acceso directo al Input (dataSource)
      this.tablaComponente['displayedColumns'] = this.columnas; // Acceso directo al Input (displayedColumns)
    }
  }

}
