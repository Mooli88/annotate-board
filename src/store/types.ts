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

interface AddAnnotation {
  type: typeof ADD_ANNOTATION;
  payload: IAnnotation;
}
interface RemoveAnnotation {
  type: typeof REMOVE_ANNOTATION;
  payload: Pick<IAnnotation, 'id'>;
}
interface UpdateAnnotation {
  type: typeof UPDATE_ANNOTATION;
  payload: Pick<IAnnotation, 'id' | 'note'>;
}
interface ResetAnnotation {
  type: typeof RESET_ANNOTATION;
  payload: IAnnotation[];
}

export type AnnotationActionTypes =
  | AddAnnotation
  | RemoveAnnotation
  | UpdateAnnotation
  | ResetAnnotation;
