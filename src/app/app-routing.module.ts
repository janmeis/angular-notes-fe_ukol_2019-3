import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';
import { NoteCardsComponent } from './note-cards/note-cards.component';


const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'cards', component: NoteCardsComponent },
  { path: 'detail/new', component: NoteDetailComponent },
  { path: 'detail/:id', component: NoteDetailComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
