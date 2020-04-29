import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { Component } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { LoginDialogComponent } from './components/login-dialog/login-dialog.component';
import { AuthenticationService } from './services/authentication.service';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [Location, { provide: LocationStrategy, useClass: PathLocationStrategy }],
})
export class AppComponent {
  title = 'angular-notes';
  user$: Observable<firebase.User>;
  collapsed = false;

  get activeLang() {
    return this.translation.activeLang;
  }

  set activeLang(value: string) {
    this.translation.activeLang = value;
    window.location.reload();
  }

  get otherLang() {
    return this.translation.otherLang;
  }

  constructor(
    private authenticationService: AuthenticationService,
    public location: Location,
    private modalService: NgbModal,
    private translation: TranslationService,

  ) {
    this.user$ = this.authenticationService.user$;
  }

  signIn() {
    this.modalService.open(LoginDialogComponent)
  }

  signOut() {
    this.authenticationService.signOut$()
      .subscribe();
  }
}
