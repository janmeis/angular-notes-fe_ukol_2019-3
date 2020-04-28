import { Component, OnInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';
import { INoteWithRef, Priority } from '../note-detail/note';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit {
  notes$: Observable<INoteWithRef[]>;
  refId: string[];
  user$: Observable<firebase.User>;
  Priority = Priority

  constructor(
    private authenticationService: AuthenticationService,
    private noteService: NoteService,
  ) {
    this.user$ = this.authenticationService.user$;
  }

  ngOnInit(): void {
    this.notes$ = this.noteService.getAll();
  }

  popClose(pop: NgbPopover, id: string) {
    this.noteService.delete(id)
      .subscribe(deleted => {
        if (!deleted) {
          console.log(`item ${id} not deleted!`);
        }
        pop.close();
      });
  }
}
