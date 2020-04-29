import { Component } from '@angular/core';
import { Priority } from '../note-detail/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.scss']
})
export class NoteCardsComponent {
  Priority = Priority

  constructor(
    public noteService: NoteService,
  ) { }
}
