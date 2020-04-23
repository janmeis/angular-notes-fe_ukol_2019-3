import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { NoteService } from 'src/services/note.service';
import { Observable, of } from 'rxjs';
import { INote } from './note';

export function markControlsDirty(group: FormGroup | FormArray): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.controls[key];

    if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray)
      markControlsDirty(abstractControl);
    else
      abstractControl.markAsDirty();
  });
}

@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  validateForm: FormGroup;
  id: string;

  /// <see cref="https://stackblitz.com/edit/angular-reactive-forms-validation"/>
  // convenience getter for easy access to form fields
  get f() { return this.validateForm.controls; }

  constructor(
    private fb: FormBuilder,
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null, [Validators.required]]
    });

    this.noteService.get(this.id).pipe(
      first()
    ).subscribe(data => {
      this.validateForm.patchValue(data);
    });
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

    const note = {...this.validateForm.value, created: new Date(), priority: 1000, color: 'grey' } as INote;
    return this.noteService.save(this.id, note);
  }
}

