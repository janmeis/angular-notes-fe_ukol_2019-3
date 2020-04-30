export enum Priority {
  UltraLow,
  VeryLow,
  Low,
  Normal,
  High,
  VeryHigh,
  UltraHigh,
}

export interface INote {
  title: string;
  text: string;
  priority: Priority;
  created: Date;
}

export interface INoteWithRef extends INote {
  refId: string;
}

// <see cref="https://ng-bootstrap.github.io/#/components/table/examples#complete">
export type SortColumn = keyof INoteWithRef | '';
export type SortDirection = 'asc' | 'desc' | '';

export interface ISortEvent {
  column: SortColumn;
  direction: SortDirection;
}

export interface IState {
  page: number;
  pageSize: number;
  searchTerm: string;
  sortColumn: SortColumn;
  sortDirection: SortDirection;
}
