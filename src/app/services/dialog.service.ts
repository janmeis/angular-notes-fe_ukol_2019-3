import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { from, Observable, of } from 'rxjs';
import { catchError, flatMap } from 'rxjs/operators';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable({ providedIn: 'root' })
export class DialogService {

  constructor(
    private modalService: NgbModal
  ) { }

  dirtyConfirmation(
    saveCallback: () => Observable<boolean>,
    customText?: string,
  ): Observable<boolean> {
    const modalRef = this.modalService.open(ConfirmDialogComponent);
    modalRef.componentInstance.customText = customText;

    return from(modalRef.result).pipe(
      flatMap(_ => saveCallback()),
      catchError(err => of(err == 'cancel click'))
    );
  }
}
