import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';
import { markControlsDirty } from '../components/common-functions';
import { INote, Priority } from './note';


@Component({
  selector: 'app-note-detail',
  templateUrl: './note-detail.component.html',
  styleUrls: ['./note-detail.component.scss']
})
export class NoteDetailComponent implements OnInit {
  validateForm: FormGroup;
  id: string;
  priorityKeys: number[];
  Priority = Priority;

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

    this.priorityKeys = this.fillPriority()

    this.validateForm = this.fb.group({
      title: [null, [Validators.required]],
      text: [null],
      priority: [Priority.Normal],
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

    const note = { ...this.validateForm.value, created: new Date() } as INote;
    return this.noteService.save(this.id, note);
  }

  private fillPriority(): number[] {
    const keys = Object.keys(Priority)
    return keys.slice(0, keys.length / 2).map(k => +k);
  }
}

