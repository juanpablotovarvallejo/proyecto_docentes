import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { NotasComponent } from './notas/notas.component';
import { RegistroCursosComponent } from './notas/registro-cursos/registro-cursos.component';
import { RegistroNotasComponent } from './notas/registro-notas/registro-notas.component';
import { GestionUsuariosComponent } from './notas/gestion-usuarios/gestion-usuarios.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirige a /login cuando la ruta es /
  { path: 'login', component: LoginComponent },
  { path: 'notas', component: NotasComponent},
  { path: 'registroCursos', component: RegistroCursosComponent},
  { path: 'registroNotas', component: RegistroNotasComponent},
  { path: 'gestionUsuarios', component: GestionUsuariosComponent}
  // Otras rutas de tu aplicación, si las tienes, pueden ir aquí.
  // Por ejemplo:
  // { path: 'home', component: HomeComponent },
  // { path: 'dashboard', component: DashboardComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
