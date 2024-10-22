import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import DashboardComponent from './dashboard.component';
import { AuthGuard } from '../../auth/auth.guard';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearPublicacionComponent } from './crear-usuarios/crear-publicacion.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { EliminarUsuariosComponent } from './eliminar-usuarios/eliminar-usuarios.component';
import { ListarPublicacionesComponent } from './listar-publicaciones/listar-publicaciones.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin, user' }, // Permitir a todos los usuarios acceder al dashboard
  },
  {
    path: 'listar-publicaciones',
    component: ListarPublicacionesComponent,
    data: { expectedRole: 'user' }, // Solo admin puede crear usuarios // RUTA DISPONIBLE PARA TODOS LOS USUARIOS
  },
  {
    path: 'ver-usuarios',
    component: VerUsuariosComponent,
    data: { expectedRole: 'user' }, // Solo admin puede crear usuarios
  },
  {
    path: 'crear-publicacion',
    component: CrearPublicacionComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }, // Solo admin puede crear usuarios
  },
  {
    path: 'editar-usuarios',
    component: EditarUsuariosComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }, // Solo admin puede editar usuarios
  },
  {
    path: 'eliminar-usuarios',
    component: EliminarUsuariosComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin' }, // Solo admin puede eliminar usuarios
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)], // forChild porque es un módulo cargado perezosamente
  exports: [RouterModule],
})
export class DashboardRoutingModule {}
