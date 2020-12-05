import {act, fireEvent, render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {useStore} from 'react-hookstore';
import {resetAnnotation} from '../../store/actions';
import annotationsStore from '../../store/annotations';
import {
  AddAnnotation,
  AnnotationActionTypes,
  IAnnotation,
  UpdateAnnotation,
  UPDATE_ANNOTATION,
} from '../../store/types';
import Board from './Board';

annotationsStore([]);
const {result} = renderHook(() =>
  useStore<IAnnotation[], AnnotationActionTypes>('annotations')
);
const [, dispatchAnnotationStore] = result.current;

describe('shallow test Board', () => {
  test('render board', () => {
    const {getByTestId} = render(<Board onClick={() => {}} />);
    const boardEl = getByTestId('board-el');

    expect(boardEl).toBeInTheDocument();
  });

  test('pass ADD action when clicking on empty space', () => {
    const expectedRes: AddAnnotation['payload'] = {
      id: `${2}x${2}`,
      x: 2,
      y: 2,
      note: '',
    };

    const onClick = jest.fn((action) => {
      expect(action.payload).toMatchObject(expectedRes);
    });

    const {getByTestId} = render(<Board onClick={onClick} />);
    const boardEl = getByTestId('board-el');
    fireEvent.click(boardEl);
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe('test Board', () => {
  afterEach(() => {
    act(() => dispatchAnnotationStore(resetAnnotation()));
  });

  test('empty board', () => {
    const {getByTestId} = render(<Board onClick={() => {}} />);
    const boardEl = getByTestId('board-el');
    expect(boardEl).toBeEmptyDOMElement();
  });

  test('render init annotations on board', async () => {
    act(() => {
      dispatchAnnotationStore(
        resetAnnotation([
          {x: 1, y: 80, id: `${1}x${80}`, note: ''},
          {x: 100, y: 80, id: `${100}x${80}`, note: ''},
        ])
      );
    });
    const {getAllByTestId} = render(<Board onClick={() => {}} />);
    const annotations = getAllByTestId(/^(annotation_)\d+[x]\d+$/i);

    expect(annotations).toHaveLength(2);
  });

  test('show placeholder when clicking on empty spot in board', () => {
    const {getByTestId} = render(<Board onClick={() => {}} />);
    fireEvent.click(getByTestId('board-el'));
    const placeholderEl = getByTestId('annotation_placeholder');

    expect(placeholderEl).toBeInTheDocument();
  });

  test('pass UPDATE action when clicking on existing Annotate', () => {
    const expectedRes: UpdateAnnotation['payload'] = {
      id: `${2}x${2}`,
      note: 'update me',
    };

    const onClick = jest.fn((action) => {
      expect(action.type).toBe(UPDATE_ANNOTATION);
      expect(action.payload).toMatchObject(expectedRes);
    });

    const {getByTestId} = render(<Board onClick={onClick} />);
    const boardEl = getByTestId('board-el');
    fireEvent.click(boardEl);

    expect(onClick).toBeCalledTimes(1);
  });
});
