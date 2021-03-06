export interface IAnnotation {
  id: string;
  x: number;
  y: number;
  note: string;
}

export const ADD_ANNOTATION = 'ADD';
export const REMOVE_ANNOTATION = 'REMOVE';
export const UPDATE_ANNOTATION = 'UPDATE';
export const RESET_ANNOTATION = 'RESET';

export interface AddAnnotation {
  type: typeof ADD_ANNOTATION;
  payload: IAnnotation;
}
export interface RemoveAnnotation {
  type: typeof REMOVE_ANNOTATION;
  payload: Pick<IAnnotation, 'id'>;
}
export interface UpdateAnnotation {
  type: typeof UPDATE_ANNOTATION;
  payload: Pick<IAnnotation, 'id' | 'note'>;
}
export interface ResetAnnotation {
  type: typeof RESET_ANNOTATION;
  payload: IAnnotation[];
}

export type AnnotationActionTypes =
  | AddAnnotation
  | RemoveAnnotation
  | UpdateAnnotation
  | ResetAnnotation;
