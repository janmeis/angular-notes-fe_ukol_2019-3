import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { from, Observable, of } from 'rxjs';
import { catchError, first, flatMap, map } from 'rxjs/operators';
import { INote, INoteWithRef } from 'src/app/note-detail/note';
import { sortFn } from '../components/common-functions';


@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(
    private db: AngularFirestore,
  ) { }

  getAll = (): Observable<INoteWithRef[]> =>
    this.db.collection<INote>('/Notes').valueChanges().pipe(
      flatMap(_ => this.db.collection<INote>('/Notes').get()),
      map(querySnapshot => querySnapshot.docs),
      map(docs => docs.map(doc => this.getNoteWithRef(doc))),
      map(items => items.sort((a, b) => sortFn(a.title, b.title)))
    )

  get(id: string): Observable<INote> {
    if (id != 'new')
      return this.db.collection<INote>('/Notes').doc(id).get().pipe(
        first(),
        map(item => item.data() as INote)
      );
    else
      return of({ title: '', text: '' } as INote);
  }

  delete = (id: string): Observable<boolean> =>
    from(this.db.collection<INote>('/Notes').doc(id).delete()).pipe(
      first(),
      map(_ => true),
      catchError(err => {
        console.log(err);
        return of(false);
      })
    )

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

  private getNoteWithRef = (doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>): INoteWithRef =>
    Object.assign({ refId: doc.id } as INoteWithRef, doc.data())
}
