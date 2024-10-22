import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'translateTitle',
})
export class TranslateTitlePipe implements PipeTransform {
  private translations: { [key: string]: string } = {
    'accusamus beatae ad facilis cum similique qui sunt':
      'acusamos a quienes son similares y fáciles',
    'laudantium enim quasi est quidem magnam voluptate ipsam eos':
      'laudantium en verdad es una gran alegría para ellos',
    // Agrega más traducciones según sea necesario
  };

  transform(value: string): string {
    return this.translations[value] || value; 
  }
}
