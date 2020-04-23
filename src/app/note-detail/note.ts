export interface INote {
  title: string;
  text: string;
  priority: number;
  color: string;
  created: Date;
}

export interface INoteWithRef extends INote {
  refId: number;
}
