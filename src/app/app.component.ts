import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AppComponent {
  title = 'angular-notes';

  get activeLang() {
    return this.translocoService.getActiveLang();
  }

  constructor(
    public location: Location,
    private translocoService: TranslocoService
  ) { }

  setLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }
}
