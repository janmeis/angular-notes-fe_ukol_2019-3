import { FormGroup, FormArray } from '@angular/forms';

export function markControlsDirty(group: FormGroup | FormArray): void {
  Object.keys(group.controls).forEach((key: string) => {
    const abstractControl = group.controls[key];

    if (abstractControl instanceof FormGroup || abstractControl instanceof FormArray)
      markControlsDirty(abstractControl);
    else
      abstractControl.markAsDirty();
  });
}

export function sortFn(a: string, b: string): number {
  const a1 = a.toLowerCase();
  const b1 = b.toLowerCase();

  if (a1 > b1)
    return 1;
  if (a1 < b1)
    return -1;

  return 0;
}
