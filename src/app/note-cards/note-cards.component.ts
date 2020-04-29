import { Component, OnInit } from '@angular/core';
import { NoteService } from '../services/note.service';
import { Observable } from 'rxjs';
import { INoteWithRef, Priority } from '../note-detail/note';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.scss']
})
export class NoteCardsComponent implements OnInit {
  notes$: Observable<INoteWithRef[]>;
  refId: string[];
  Priority = Priority

  constructor(
    private noteService: NoteService,
  ) { }

  ngOnInit(): void {
    this.notes$ = this.noteService.getAll();
  }
}
