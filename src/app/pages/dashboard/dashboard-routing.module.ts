import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { AuthGuard } from '../../auth/auth.guard';
import { RecursosDeUsuariosComponent } from './recursos-de-usuarios/recursos-de-usuarios.component';
import { VerUsuariosComponent } from './ver-usuarios/ver-usuarios.component';
import { CrearUsuariosComponent } from './crear-usuarios/crear-usuarios.component';
import { EditarUsuariosComponent } from './editar-usuarios/editar-usuarios.component';
import { EliminarUsuariosComponent } from './eliminar-usuarios/eliminar-usuarios.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'admin, user' }, // Permitir a todos los usuarios acceder al dashboard
  },
  {
    path: 'recursos-de-usuarios',
    component: RecursosDeUsuariosComponent,
    data: { expectedRole: 'user' }, // Solo admin puede crear usuarios // RUTA DISPONIBLE PARA TODOS LOS USUARIOS
  },
  {
    path: 'ver-usuarios',
    component: VerUsuariosComponent,
    data: { expectedRole: 'user' }, // Solo admin puede crear usuarios
  },
  {
    path: 'crear-usuarios',
    component: CrearUsuariosComponent,
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
