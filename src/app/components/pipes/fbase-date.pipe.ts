import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'fbaseDate'
})
export class FbaseDatePipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
  ) {}

  transform(value: any): string {
    if (!value || !+value)
      return null;

    return this.datePipe.transform(value.seconds * 1000, 'dd.MM.yyyy')
  }

}
