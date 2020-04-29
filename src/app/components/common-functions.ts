import { FormGroup, FormArray } from '@angular/forms';
import { SortDirection, INote, SortColumn, INoteWithRef } from '../note-detail/note';

export const markControlsDirty = (group: FormGroup | FormArray): void => {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.controls[key];

    if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray)
      markControlsDirty(abstractControl);
    else
      abstractControl.markAsDirty();
  });
}

export const compare = (a: string, b: string): number => {
  const a1 = a.toLowerCase();
  const b1 = b.toLowerCase();
  return a1 < b1 ? -1 : a1 > b1 ? 1 : 0;
};
