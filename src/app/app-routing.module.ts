import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CanDeactivateGuard } from './components/guards/can-deactivate.guard';
import { NoteCardsComponent } from './note-cards/note-cards.component';
import { NoteDetailComponent } from './note-detail/note-detail.component';
import { NoteListComponent } from './note-list/note-list.component';


const routes: Routes = [
  { path: '', component: NoteListComponent },
  { path: 'cards', component: NoteCardsComponent },
  { path: 'detail/new', component: NoteDetailComponent, canDeactivate: [CanDeactivateGuard] },
  { path: 'detail/:id', component: NoteDetailComponent, canDeactivate: [CanDeactivateGuard] }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
