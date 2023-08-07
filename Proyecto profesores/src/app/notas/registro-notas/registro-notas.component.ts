import { Component } from '@angular/core';
import { Nota } from 'src/app/servicios/nota.entity';
import { Curso } from 'src/app/servicios/curso.entity';
import { ApiService } from 'src/app/servicios/usuarios.service';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { HttpClient } from '@angular/common/http';



@Component({
  selector: 'app-registro-notas',
  templateUrl: './registro-notas.component.html',
  styleUrls: ['./registro-notas.component.css']
})
export class RegistroNotasComponent {
  columnas = [
    'id',
    'cedula',
    'nombres',
    'nota1',
    'nota2',
    'nota3',
    'recuperacion',
    'total',
    'estado'
  ]

  curso: string = ''
  cursos: Curso[]
  notas: Nota[]
  datosCargados: any = []

  constructor(private apiService: ApiService, private httpClient: HttpClient) {
    this.notas = []
    this.cursos = []
  }

  async ngOnInit(): Promise<void> {
    this.obtenerCursos();
  }

  obtenerNotas() {
    this.apiService.solicitudGet('notas/' + this.curso).subscribe(
      (notas: any[]) => {
        console.log(notas)
        this.notas = notas;
        this.notas.forEach(
          (nota: any) => {
            nota['total'] = ((nota.nota1 * 0.3) + (nota.nota2 * 0.35) + (nota.nota3 * 0.35)).toFixed(2);
            if (nota['total'] < 14) {
              nota['estado'] = "REPROBADO"
            } else {
              nota['estado'] = "APROBADO"
            }
          }
        )
      },
      (error) => {
        console.error(error);
        this.notas = []
      }
    );
  }

  obtenerCursos() {
    this.apiService.solicitudGet('cursos/' + JSON.parse(localStorage.getItem('usuario')!)['id']).subscribe(
      (cursos: any[]) => {
        this.cursos = cursos;
        if (this.cursos.length > 0) {
          this.curso = this.cursos[0].id.toString()
        }
        console.log(this.curso)
        this.obtenerNotas();
      },
      (error) => {
        console.error(error);
        this.cursos = []
      }
    );
  }



  exportToExcelTemplate() {
    const columnasNotas = ['nombre', 'edad', 'correo', 'identificacion']; // Agregamos 'identificacion' a la lista de columnas
    let curso: any = this.cursos.filter(
      (curso: any) => curso.id == this.curso
    )[0]

    // Cargar la plantilla Excel existente desde el directorio 'assets'
    const plantillaURL = 'assets/plantilla.xlsx';
    const httpOptions = {
      responseType: 'arraybuffer' as 'json'
    };

    // Hacer una solicitud HTTP para obtener el contenido de la plantilla
    this.httpClient.get(plantillaURL, httpOptions).subscribe(datos => {
      const workBook = XLSX.read(datos, { type: 'array' });

      const workSheet = workBook.Sheets['Plantilla']; // Asumimos que el nombre de la hoja es 'Sheet1', ajusta esto según el nombre real de la hoja en tu plantilla

      XLSX.utils.sheet_add_aoa(workSheet, [['']], { origin: 'C3' });
      XLSX.utils.sheet_add_aoa(workSheet, [['']], { origin: 'C4' });
      XLSX.utils.sheet_add_aoa(workSheet, [['']], { origin: 'C6' });
      XLSX.utils.sheet_add_aoa(workSheet, [['']], { origin: 'C8' });
      XLSX.utils.sheet_add_aoa(workSheet, [['']], { origin: 'H8' });
      XLSX.utils.sheet_add_aoa(workSheet, [['']], { origin: 'H9' });

      // Llenar los campos de la plantilla con los datos del curso
      workSheet['C3'].v = curso['facultad'];
      workSheet['C4'].v = curso['carrera'];
      workSheet['C6'].v = curso['asignatura'];
      workSheet['C8'].v = curso['periodo'];
      workSheet['H8'].v = curso['nivel'];
      workSheet['H9'].v = curso['paralelo']

      // Aquí puedes llenar otras celdas de la plantilla con los datos necesarios

      // Convertir el libro de trabajo a un Blob
      const excelBuffer: any = XLSX.write(workBook, { bookType: 'xlsx', type: 'array' });
      const data: Blob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
      const fileName: string = 'plantilla_actualizada.xlsx';
      saveAs(data, fileName);
    });
  }


  onFileSelected(event: any) {
    const file: File = event.target.files[0];

    if (file) {
      const fileReader: FileReader = new FileReader();

      fileReader.onload = (e: any) => {
        const datos: Uint8Array = new Uint8Array(e.target.result);
        const workBook = XLSX.read(datos, { type: 'array' });
        const workSheet = workBook.Sheets[workBook.SheetNames[0]];
        const datosExcel = XLSX.utils.sheet_to_json(workSheet, { header: 1 });

        // Asignar los datos cargados a la variable datosCargados
        this.datosCargados = datosExcel.slice(10); // Excluir la primera fila de encabezados
      };

      fileReader.readAsArrayBuffer(file);
    }
  }

  cargarDatos() {
    // Aquí puedes usar los datosCargados y almacenarlos en tu base de datos
    console.log(this.datosCargados)
    this.datosCargados.forEach((element: any[]) => {
      console.log(element)
      if (element[1] != '') {
        let nota = new Nota(0, element[1], element[2], element[3], element[4], element[5], element[6], this.curso)
        this.apiService.solicitudPost('notas', nota).subscribe(
          (respuesta) => {
            console.log(respuesta)
          }
        )
      }
    });
    // Lógica para almacenar los datos en la base de datos
  }


}

