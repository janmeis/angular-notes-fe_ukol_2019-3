import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { Observable } from 'rxjs';
import { AuthenticationService } from './services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AppComponent {
  title = 'angular-notes';
  user$: Observable<firebase.User>;
  collapsed = true;

  get activeLang() {
    return this.translocoService.getActiveLang();
  }

  constructor(
    private authenticationService: AuthenticationService,
    private modalService: NgbModal,
    public location: Location,
    private translocoService: TranslocoService
  ) {
    this.user$ = this.authenticationService.user$;
  }

  setLang(lang: string) {
    this.translocoService.setActiveLang(lang);
  }

  signIn() {
    this.modalService.open(LoginDialogComponent)
  }

  signOut() {
    this.authenticationService.signOut$()
      .subscribe();
  }
}
