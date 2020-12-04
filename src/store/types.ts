export interface IAnnotaion {
  id: string;
  x: number;
  y: number;
  note: string;
}
// export interface IAnnotaionAction {
//   type: TActionType;
//   payload: IAnnotaionAction['type'] extends 'REMOVE'
//     ? Pick<IAnnotaion, 'id'>
//     : IAnnotaionAction['type'] extends 'UPDATE'
//     ? Pick<IAnnotaion, 'id' | 'note'>
//     : IAnnotaionAction['type'] extends 'RESET'
//     ? IAnnotaion[] | null | undefined
//     : IAnnotaion;
// }

export const ADD_ANNOTATION = 'ADD';
export const REMOVE_ANNOTATION = 'REMOVE';
export const UPDATE_ANNOTATION = 'UPDATE';
export const RESET_ANNOTATION = 'RESET';

interface AddAnitaion {
  type: typeof ADD_ANNOTATION;
  payload: IAnnotaion;
}
interface RemoveAnitaion {
  type: typeof REMOVE_ANNOTATION;
  payload: Pick<IAnnotaion, 'id'>;
}
interface UpdateAnitaion {
  type: typeof UPDATE_ANNOTATION;
  payload: Pick<IAnnotaion, 'id' | 'note'>;
}
interface ResetAnitaion {
  type: typeof RESET_ANNOTATION;
  payload: IAnnotaion[];
}

export type AnotationActionTypes =
  | AddAnitaion
  | RemoveAnitaion
  | UpdateAnitaion
  | ResetAnitaion;
