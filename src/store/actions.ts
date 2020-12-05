import {
  AddAnnotation,
  ADD_ANNOTATION,
  AnnotationActionTypes,
  IAnnotation,
  REMOVE_ANNOTATION,
  RESET_ANNOTATION,
  UpdateAnnotation,
  UPDATE_ANNOTATION,
} from './types';

export function addAnnotation(payload: IAnnotation): AddAnnotation {
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
): UpdateAnnotation {
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
