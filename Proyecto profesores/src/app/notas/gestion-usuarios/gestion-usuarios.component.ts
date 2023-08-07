import { Component, OnInit, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/servicios/usuarios.service';
import { Usuario } from 'src/app/servicios/usuario.entity';
import { TablaComponent } from 'src/app/componentes/tabla/tabla.component';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {

  columnas = [
    'id',
    'nombre',
    'apellido',
    'cedula',
    'contrasena'
  ]

  usuarios: Usuario[]
  nuevoUsuario: Usuario

  @ViewChild(TablaComponent) tablaComponente!: TablaComponent<Usuario>// Reemplaza 'TuTablaComponent' con el nombre correcto de tu componente de tabla

  constructor(private apiService: ApiService) { 
    this.usuarios = []
    this.nuevoUsuario = new Usuario(0, '', '', '', '')
  }

  async ngOnInit(): Promise<void> {
    this.obtenerUsuarios();
  }

  obtenerUsuarios() {
    this.apiService.solicitudGet('usuarios').subscribe(
      (usuarios: any[]) => {
        this.usuarios = usuarios;
        this.actualizarTabla();
      }
      ,
      (error) => {
        console.error(error);
        this.usuarios = []
      }
    );
  }

  agregarUsuario() {
    console.log(this.nuevoUsuario)
    this.apiService.solicitudPost('usuarios',this.nuevoUsuario).subscribe(
      (usuario: Object) => {
        this.obtenerUsuarios();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  private actualizarTabla(): void {
    // Comprueba si el componente de tabla existe antes de intentar actualizarlo
    if (this.tablaComponente) {
      this.tablaComponente['dataSource'] = this.usuarios; // Acceso directo al Input (dataSource)
      this.tablaComponente['displayedColumns'] = this.columnas; // Acceso directo al Input (displayedColumns)
    }
  }

}
