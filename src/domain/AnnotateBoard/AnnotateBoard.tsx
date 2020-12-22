import React, {useReducer} from 'react';
import {useStore} from 'react-hookstore';
import Board from '../../components/Board/Board';
import NoteEditor, {
  Props as NoteEditorProps,
} from '../../components/NoteEditor/NoteEditor';
import {
  AddAnnotation,
  ADD_ANNOTATION,
  AnnotationActionTypes,
  IAnnotation,
  UpdateAnnotation,
  UPDATE_ANNOTATION,
} from '../../store/types';

interface Props {}
interface INoteEditorAction {
  type: typeof ADD_ANNOTATION | typeof UPDATE_ANNOTATION;
  payload: {
    onSubmit: NoteEditorProps['onSubmit'];
  };
}
type AnnotateActionType = AddAnnotation | UpdateAnnotation;
// interface IReducerActionPayload extends IAnnotation , Pick<IAnnotation, 'id' | 'note'> {
//   onSubmit: NoteEditorProps['onSubmit']
// }
// interface IReducerAction {
//   type: typeof ADD_ANNOTATION | typeof UPDATE_ANNOTATION;
//   payload: IReducerActionPayload;
// }

const INIT_EDITOR_OPTS: NoteEditorProps = {
  value: '',
  visible: false,
  position: 'top',
  onSubmit: () => {},
};

function editorReducer(
  state: NoteEditorProps,
  action: INoteEditorAction
): NoteEditorProps {
  switch (action.type) {
    case 'ADD':
      return {
        ...action.payload,
        position: 'top',
        visible: true,
      };

    case 'UPDATE':
      return {
        ...action.payload,
        visible: true,
        position: 'bottom',
      };

    default:
      return INIT_EDITOR_OPTS;
  }
}

const AnnotateBoard = (props: Props) => {
  const [, dispatchAnnotationStore] = useStore<IAnnotation[], AnnotationActionTypes>(
    'annotations'
  );
  const [editorState, dispatchEditorState] = useReducer(editorReducer, INIT_EDITOR_OPTS);

  const setNote = ({type, payload}: AnnotateActionType) => {
    dispatchEditorState({
      type,
      payload: {
        onSubmit(note) {
          console.log('🚀 ~ file: AnnotateBoard.tsx ~ line 77 ~ onSubmit ~ note', note);
          console.log(
            '🚀 ~ file: AnnotateBoard.tsx ~ line 77 ~ onSubmit ~ payload',
            payload
          );
          const action = {type, payload: {...payload, note}} as AnnotateActionType;
          dispatchAnnotationStore(action);
        },
      },
    });
  };

  return (
    <main data-testid="annotate-board" className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <NoteEditor {...editorState} />
      <div className="border-4 border-dashed border-gray-200 rounded-lg h-96">
        <Board onClick={setNote} />
      </div>
    </main>
  );
};

export default AnnotateBoard;
