import {act, fireEvent, render} from '@testing-library/react';
import {renderHook} from '@testing-library/react-hooks';
import React from 'react';
import {useStore} from 'react-hookstore';
import {resetAnnotation} from '../../store/actions';
import annotationsStore from '../../store/annotations';
import {AddAnnotation, AnnotationActionTypes, IAnnotation} from '../../store/types';
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

  test('Disable the option for adding Annotate if one already exist on the same area', () => {
    const onClick = jest.fn();
    const {getByTestId} = render(<Board onClick={onClick} />);

    fireEvent.click(getByTestId('board-el'));

    // const placeholderEl = getByTestId('annotation_placeholder');

    expect(onClick).not.toBeCalled();
  });
});
