import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslationService } from 'src/app/services/translation.service';

@Pipe({
  name: 'fbaseDate'
})
export class FbaseDatePipe implements PipeTransform {
  get dateFormat() {
    return this.translation.activeLang == 'cs'
      ? 'dd.MM.yyyy'
      : 'MM/dd/yyyy';
  }

  constructor(
    private datePipe: DatePipe,
    private translation: TranslationService
  ) { }

  transform(value: any): string {
    if (!value || !+value)
      return null;

    return this.datePipe.transform(value.seconds * 1000, this.dateFormat);
  }
}
