import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NoteService } from 'src/services/note.service';
import { INoteWithRef } from '../note-detail/note';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notes$: Observable<INoteWithRef[]>;
  refId: string[];

  constructor(
    private noteService: NoteService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.notes$ = this.noteService.getAll();
  }

  popClose(pop: NgbPopover, id: string) {
    this.noteService.delete(id)
      .subscribe(deleted => {
        if (deleted)
          pop.close();
      });
  }
}
