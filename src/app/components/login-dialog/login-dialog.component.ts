import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { markControlsDirty } from '../common-functions';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.scss']
})
export class LoginDialogComponent implements OnInit {
  validateForm: FormGroup;
  error: string;

  get f() { return this.validateForm.controls; }

  constructor(
    public activeModal: NgbActiveModal,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validateForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]]
    });
  }

  onSubmit() {
    markControlsDirty(this.validateForm);
    if (this.validateForm.invalid)
      return of(false);

    const email = this.f.email.value;
    const password = this.f.password.value;
    this.authenticationService.signIn$(email, password)
      .subscribe(user => {
        this.activeModal.close('signed in')
      },
        err => this.error = err
      )
  }

  fillIn() {
    this.f.email.setValue('petr.koutny@bsc-ideas.com');
    this.f.password.setValue('bsc-ideas');
  }
}
