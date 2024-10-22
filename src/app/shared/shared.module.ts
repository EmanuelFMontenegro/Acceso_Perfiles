import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes
import { ToolbarModule } from 'primeng/toolbar'; // Importar ToolbarModule
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { TranslateTitlePipe } from './translateTitle.pipe';
import SidebarComponent from './sidebar/sidebar.component';

@NgModule({
  declarations: [
    ToolbarComponent, // Declara los componentes compartidos
    TranslateTitlePipe, // Asegúrate de declarar el pipe aquí
    // otros componentes que desees incluir
  ],
  imports: [
    CommonModule, // Importa CommonModule
    ToolbarModule, // Asegúrate de agregar el ToolbarModule aquí
    // otros módulos que desees importar
  ],
  exports: [
    ToolbarComponent, // Exporta los componentes para que puedan ser utilizados en otros módulos
    ToolbarModule,
    TranslateTitlePipe,
     // Exporta el pipe para que pueda ser utilizado en otros módulos
    // otros componentes o módulos que desees exportar
  ],
  providers: [],
})
export class SharedModule {}
