import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable, from } from 'rxjs';
import { tap } from 'rxjs/internal/operators/tap';
import { first } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  user$: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user$ = angularFireAuth.authState;
  }

  signIn$ = (email: string, password: string): Observable<firebase.auth.UserCredential> =>
    from(this.angularFireAuth
      .signInWithEmailAndPassword(email, password)).pipe(
        tap((credentials: firebase.auth.UserCredential) => console.log(`Succesfully signed in as '${credentials.user.email}'`)),
        first()
      )

  signOut$ = (): Observable<void> =>
    from(this.angularFireAuth
      .signOut()).pipe(
        tap(_ => console.log('Succesfully signed out')),
        first()
      )
}
