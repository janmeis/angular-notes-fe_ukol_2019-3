import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';
import { TranslationService } from 'src/app/services/translation.service';

@Pipe({
  name: 'fbaseDate'
})
export class FbaseDatePipe implements PipeTransform {
  constructor(
    private datePipe: DatePipe,
    private translation: TranslationService
  ) { }

  transform(value: any, hours = false): string {
    if (!value || !+value)
      return null;

    return this.datePipe.transform(value.seconds * 1000, this.getDateFormat(hours));
  }

  getDateFormat(hours = false) {
    let dateFormat = this.translation.activeLang == 'cs'
      ? 'dd.MM.yyyy'
      : 'MM/dd/yyyy';
    if (hours)
      dateFormat += ' hh:mm';

    return dateFormat;
  }
}
