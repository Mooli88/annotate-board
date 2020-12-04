import {
  ADD_ANNOTATION,
  AnnotationActionTypes,
  IAnnotation,
  REMOVE_ANNOTATION,
  RESET_ANNOTATION,
  UPDATE_ANNOTATION,
} from './types';

export function AddAnnotation(payload: IAnnotation): AnnotationActionTypes {
  return {
    type: ADD_ANNOTATION,
    payload,
  };
}
export function removeAnnotation(
  payload: Pick<IAnnotation, 'id'>
): AnnotationActionTypes {
  return {
    type: REMOVE_ANNOTATION,
    payload,
  };
}
export function updateAnnotation(
  payload: Pick<IAnnotation, 'id' | 'note'>
): AnnotationActionTypes {
  return {
    type: UPDATE_ANNOTATION,
    payload,
  };
}

export function resetAnnotation(payload: IAnnotation[] = []): AnnotationActionTypes {
  return {
    type: RESET_ANNOTATION,
    payload,
  };
}
