import {
  ADD_ANNOTATION,
  AnotationActionTypes,
  IAnnotaion,
  REMOVE_ANNOTATION,
  RESET_ANNOTATION,
  UPDATE_ANNOTATION,
} from './types';

export function AddAnnotation(payload: IAnnotaion): AnotationActionTypes {
  return {
    type: ADD_ANNOTATION,
    payload,
  };
}
export function removeAnnotation(payload: Pick<IAnnotaion, 'id'>): AnotationActionTypes {
  return {
    type: REMOVE_ANNOTATION,
    payload,
  };
}
export function updateAnnotation(
  payload: Pick<IAnnotaion, 'id' | 'note'>
): AnotationActionTypes {
  return {
    type: UPDATE_ANNOTATION,
    payload,
  };
}

export function resetAnnotation(payload: IAnnotaion[] = []): AnotationActionTypes {
  return {
    type: RESET_ANNOTATION,
    payload,
  };
}
