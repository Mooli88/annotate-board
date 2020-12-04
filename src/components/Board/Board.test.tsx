import {act, fireEvent, render, screen} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {useStore} from 'react-hookstore';
import {resetAnnotation} from '../../store/actions';
import annotationsStore from '../../store/annotations';
import {AnotationActionTypes, IAnnotaion} from '../../store/types';
import Board from './Board';

annotationsStore([]);
const {result} = renderHook(() =>
  useStore<IAnnotaion[], AnotationActionTypes>('annotations')
);
const [, dispathAnnotationStore] = result.current;

describe('shallow test Board', () => {
  test('render board', () => {
    render(<Board />);
    const boardEl = screen.getByTestId('board-el');

    expect(boardEl).toBeInTheDocument();
  });
});

describe('test Board', () => {
  afterEach(() => {
    act(() => dispathAnnotationStore(resetAnnotation()));
  });

  test('empty board', () => {
    const {getByTestId} = render(<Board />);
    const boardEl = getByTestId('board-el');
    expect(boardEl).toBeEmptyDOMElement();
  });

  test('render init annoations on board', async () => {
    act(() => {
      dispathAnnotationStore(
        resetAnnotation([
          {x: 1, y: 80, id: `annotation_${1}x${80}`, note: ''},
          {x: 100, y: 80, id: `annotation_${100}x${80}`, note: ''},
        ])
      );
    });
    const {getAllByTestId} = render(<Board />);
    const annotations = getAllByTestId(/^(annotation_)\d+[x]\d+$/i);

    expect(annotations).toHaveLength(2);
  });

  test('show placeholder when clicking on empty spot in board', () => {
    const {getByTestId} = render(<Board />);
    fireEvent.click(getByTestId('board-el'));
    const placeholderEl = getByTestId('annotation_2x2');

    expect(placeholderEl).toBeInTheDocument();
  });
});
