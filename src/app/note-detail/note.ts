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
