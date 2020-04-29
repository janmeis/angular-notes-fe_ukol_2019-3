import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  get availableLangs(): string[] {
    return this.translocoService.getAvailableLangs() as string[];
  }

  get activeLang(): string {
    let lang = localStorage.getItem('activeLang');
    if (!lang) {
      lang = this.translocoService.getActiveLang();
      localStorage.setItem('activeLang', lang);
    }
    this.translocoService.setActiveLang(lang);

    return lang;
  }
  set activeLang(value: string) {
    localStorage.setItem('activeLang', value);
    this.translocoService.setActiveLang(value);
  }

  get otherLang(): string {
    return this.availableLangs.find(l => l != this.activeLang);
  }


  constructor(
    private translocoService: TranslocoService
  ) { }
}
