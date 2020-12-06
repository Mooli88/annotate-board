import {
  AddAnnotation,
  ADD_ANNOTATION,
  AnnotationActionTypes,
  RemoveAnnotation,
  REMOVE_ANNOTATION,
  ResetAnnotation,
  RESET_ANNOTATION,
  UpdateAnnotation,
  UPDATE_ANNOTATION,
} from './types';

export function addAnnotation(payload: AddAnnotation['payload']): AddAnnotation {
  return {
    type: ADD_ANNOTATION,
    payload,
  };
}
export function removeAnnotation(
  payload: RemoveAnnotation['payload']
): AnnotationActionTypes {
  return {
    type: REMOVE_ANNOTATION,
    payload,
  };
}
export function updateAnnotation(payload: UpdateAnnotation['payload']): UpdateAnnotation {
  return {
    type: UPDATE_ANNOTATION,
    payload,
  };
}

export function resetAnnotation(
  payload: ResetAnnotation['payload'] = []
): AnnotationActionTypes {
  return {
    type: RESET_ANNOTATION,
    payload,
  };
}
