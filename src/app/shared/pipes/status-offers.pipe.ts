import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'statusOffers'
})
export class StatusOffersPipe implements PipeTransform {

  transform(status: number): string {
    switch (status) {
      case 1:
        return 'CREADO';
      case 2:
        return 'ACTIVADO';
      case 3:
        return 'DESACTIVADO';
      default:
        return 'CREADO';
    }
  }

}
