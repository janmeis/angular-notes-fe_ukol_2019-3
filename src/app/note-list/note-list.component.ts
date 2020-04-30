import { Component, QueryList, ViewChildren, OnInit } from '@angular/core';
import { NgbPopover } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { NoteService } from 'src/app/services/note.service';
import { NgbdSortableHeader } from '../components/directives/sortable.directive';
import { INoteWithRef, ISortEvent, Priority } from '../note-detail/note';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-note-list',
  templateUrl: './note-list.component.html',
  styleUrls: ['./note-list.component.scss']
})
export class NoteListComponent implements OnInit{
  notes$: Observable<INoteWithRef[]>;
  refId: string[];
  user$: Observable<firebase.User>;
  Priority = Priority;

  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

  constructor(
    private authenticationService: AuthenticationService,
    public noteService: NoteService,
  ) {
    this.user$ = this.authenticationService.user$;
  }

  ngOnInit(): void {
    this.noteService.reset({pageSize: 5});
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

  // <see cref="https://ng-bootstrap.github.io/#/components/table/examples#complete">
  onSort({ column, direction }: ISortEvent) {
    // resetting other headers
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });

    this.noteService.sortColumn = column;
    this.noteService.sortDirection = direction;
  }
}
