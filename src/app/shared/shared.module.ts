import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common'; // Importa CommonModule para directivas comunes
import { BrowserModule } from '@angular/platform-browser';
import { ToolbarModule } from 'primeng/toolbar'; // Importar ToolbarModule
import { ToolbarComponent } from './components/toolbar/toolbar.component';

@NgModule({
  declarations: [
    ToolbarComponent, // Declara los componentes compartidos
    // otros componentes que desees incluir
  ],
  imports: [
    CommonModule, // Importa CommonModule
    BrowserModule, // Importa BrowserModule si es necesario
    ToolbarModule, // Asegúrate de agregar el ToolbarModule aquí
    // otros módulos que desees importar
  ],
  exports: [
    ToolbarComponent, // Exporta los componentes para que puedan ser utilizados en otros módulos
    ToolbarModule, // Exporta ToolbarModule para que esté disponible en otros módulos
    // otros componentes o módulos que desees exportar
  ],
  providers: [],
})
export class SharedModule {}
