import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/layout/layout.component';
import DashboardComponent from './pages/dashboard/dashboard.component';
import { VerUsuariosComponent } from './pages/dashboard/ver-usuarios/ver-usuarios.component';
import { CrearPublicacionComponent } from './pages/dashboard/crear-usuarios/crear-publicacion.component';
import { EliminarUsuariosComponent } from './pages/dashboard/eliminar-usuarios/eliminar-usuarios.component';
import { EditarUsuariosComponent } from './pages/dashboard/editar-usuarios/editar-usuarios.component';
import { ListarPublicacionesComponent } from './pages/dashboard/listar-publicaciones/listar-publicaciones.component';

const routes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent,
      },
      { path: 'listar-publicaciones', component: ListarPublicacionesComponent },
      { path: 'ver-usuarios', component: VerUsuariosComponent },
      { path: 'crear-publicacion', component: CrearPublicacionComponent },
      { path: 'editar-usuarios', component: EditarUsuariosComponent },
      { path: 'eliminar-usuarios', component: EliminarUsuariosComponent },
      { path: '**', redirectTo: '/auth/login' }, // Redirigir cualquier ruta no encontrada al login
    ],
  },
];

export { routes };
