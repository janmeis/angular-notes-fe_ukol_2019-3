import { Component, OnInit } from '@angular/core';
import { Priority } from '../note-detail/note';
import { NoteService } from '../services/note.service';

@Component({
  selector: 'app-note-cards',
  templateUrl: './note-cards.component.html',
  styleUrls: ['./note-cards.component.scss']
})
export class NoteCardsComponent implements OnInit {
  Priority = Priority

  constructor(
    public noteService: NoteService,
  ) { }

  ngOnInit(): void {
    this.noteService.reset();
  }
}
