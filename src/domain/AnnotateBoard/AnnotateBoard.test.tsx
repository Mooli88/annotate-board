import {fireEvent, render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {useStore} from 'react-hookstore';
import annotationsStore from '../../store/annotations';
import {AnnotationActionTypes, IAnnotation} from '../../store/types';
import AnnotateBoard from './AnnotateBoard';

annotationsStore([]);
const {result} = renderHook(() =>
  useStore<IAnnotation[], AnnotationActionTypes>('annotations')
);

it('mount NoteEditor and Board', () => {
  const {getByTestId} = render(<AnnotateBoard />);
  getByTestId('board-el');
  getByTestId('note-editor-el');
});

it('should open NoteEditor when clicking Board', () => {
  const {getByTestId, getByDisplayValue} = render(<AnnotateBoard />);

  const noteEditorEl = getByTestId('note-editor-el');
  fireEvent.click(getByTestId('board-el'));
  expect(noteEditorEl).toBeVisible();
});
