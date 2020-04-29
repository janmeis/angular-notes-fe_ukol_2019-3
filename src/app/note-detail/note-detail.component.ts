import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';
import { markControlsDirty } from '../components/common-functions';
import { INote, Priority } from './note';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  validateForm: FormGroup;
  id: string;
  priorityKeys: number[];
  user$: Observable<firebase.User>;
  Priority = Priority;

  /// <see cref="https://stackblitz.com/edit/angular-reactive-forms-validation"/>
  // convenience getter for easy access to form fields
  get f() { return this.validateForm.controls; }

  constructor(
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.user$ = this.authenticationService.user$;
  }



  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || 'new';

    this.priorityKeys = this.fillPriority()

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null],
      priority: [Priority.Normal],
    });

    this.user$.subscribe(user => {
      for (const control in this.f) {
        if (!user)
          this.f[control].disable();
        else
          this.f[control].enable();
      }
    });

    this.noteService.get(this.id).subscribe(data => {
      this.validateForm.patchValue(data);
    });
  }

  buttonClicked(direction: 'up' | 'down') {
    let priority = this.f.priority.value;
    if (direction == 'up') {
      if (priority < this.priorityKeys[this.priorityKeys.length - 1])
        priority++;
    } else if (priority > this.priorityKeys[0])
      priority--;

    this.f.priority.setValue(priority);
  }

  onSubmit() {
    this.save().subscribe(saved => {
      if (saved) {
        this.validateForm.markAsPristine();
        this.router.navigate(['/']);
      }
    })
  }

  private save(): Observable<boolean> {
    markControlsDirty(this.validateForm);
    if (this.validateForm.invalid)
      return of(false);

    const note = this.validateForm.value as INote;
    if (this.id == 'new')
      note.created = new Date();

    return this.noteService.save(this.id, note);
  }

  private fillPriority(): number[] {
    const keys = Object.keys(Priority)
    return keys.slice(0, keys.length / 2).map(k => +k);
  }
}

