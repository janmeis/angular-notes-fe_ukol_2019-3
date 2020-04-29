import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { BehaviorSubject, from, Observable, of, Subject } from 'rxjs';
import { catchError, first, flatMap, map } from 'rxjs/operators';
import { INote, INoteWithRef, SortColumn, SortDirection } from 'src/app/note-detail/note';
import { compare } from '../components/common-functions';

interface ISearchResult {
  notes: INoteWithRef[];
  total: number;
}

interface IState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
@Injectable({
  providedIn: 'root'
})
// <see cref="https://ng-bootstrap.github.io/#/components/table/examples#complete">
export class NoteService {
  private _search$ = new Subject<void>();
  private _notes$ = new BehaviorSubject<INoteWithRef[]>([]);
  private _total$ = new BehaviorSubject<number>(0);

  private _state = {
    page: 1,
    pageSize: 5,
    searchTerm: '',
    sortColumn: 'title',
    sortDirection: 'asc'
  } as IState;

  get notes$() { return this._notes$.asObservable(); }
  get total$() { return this._total$.asObservable(); }

  get page() { return this._state.page; }
  set page(page: number) { this._set({ page }); }

  get pageSize() { return this._state.pageSize; }
  set pageSize(pageSize: number) { this._set({ pageSize }); }

  set sortColumn(sortColumn: SortColumn) { this._set({ sortColumn }); }
  set sortDirection(sortDirection: SortDirection) { this._set({ sortDirection }); }

  constructor(
    private db: AngularFirestore,
  ) {
    this.db.collection<INote>('/Notes').valueChanges()
      .subscribe(_ => this._search$.next());

    this._search$.pipe(
      flatMap(_ => this._search())
    ).subscribe(result => {
      this._notes$.next(result.notes);
      this._total$.next(result.total);
    });

    this._search$.next();
  }

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

  private _set(patch: Partial<IState>) {
    Object.assign(this._state, patch);
    this._search$.next();
  }

  private _search = (): Observable<ISearchResult> =>
    this.db.collection<INote>('/Notes').get().pipe(
      map(querySnapshot => querySnapshot.docs),
      map(docs => docs.map(doc => this.getNoteWithRef(doc))),
      map(items => this.sort(items, this._state.sortColumn, this._state.sortDirection)),
      map(items => {
        const notes = items.slice(
          (this._state.page - 1) * this._state.pageSize,
          (this._state.page - 1) * this._state.pageSize + this._state.pageSize);
        const total = items.length;
        return ({ notes, total } as ISearchResult);
      })
    )

  private getNoteWithRef = (doc: firestore.QueryDocumentSnapshot<firestore.DocumentData>): INoteWithRef =>
    Object.assign({ refId: doc.id } as INoteWithRef, doc.data())

  private sort(notes: INoteWithRef[], column: SortColumn, direction: string): INoteWithRef[] {
    if (direction === '' || column === '') {
      return notes;
    } else {
      return [...notes].sort((a, b) => {
        const res = compare(`${a[column]}`, `${b[column]}`);
        return direction === 'asc' ? res : -res;
      });
    }
  }
}
