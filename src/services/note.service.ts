import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { from, Observable, of } from 'rxjs';
import { catchError, map, first } from 'rxjs/operators';
import { INote } from 'src/app/note-detail/note';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private db: AngularFirestore,
  ) { }

  get(id: string): Observable<INote> {
    if (id != 'new')
      return this.db.collection<INote>('/Notes').doc(id).get().pipe(
        map(item => item.data() as INote)
      );
    else
      return of({ title: '', text: '' } as INote);
  }

  save(id: string, note: INote): Observable<boolean> {
    if (id != 'new')
      return from(this.db.collection<INote>('/Notes').doc(id).set(note, { merge: true })).pipe(
        first(),
        map(_ => true),
        catchError(err => {
          console.log(err);
          return of(false);
        })
      );
    else
      return from(this.db.collection<INote>('/Notes').add(note)).pipe(
        first(),
        map(ref => {
          console.log(ref);
          return true;
        }),
        catchError(err => {
          console.log(err);
          return of(false);
        })
      );
  }
}
