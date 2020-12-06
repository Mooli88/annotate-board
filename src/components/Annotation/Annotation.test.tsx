import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import {UpdateAnnotation} from '../../store/types';
import Annotation from './Annotation';

test('tst', () => {
  render(<Annotation id={`${0}x${0}`} note="" x={0} y={0} />);
});

test('pass UPDATE action when clicking on existing Annotate', () => {
  const expectedRes: UpdateAnnotation['payload'] = {
    id: '100x100',
    note: 'update me',
  };

  const onClick = jest.fn((action) => {
    console.log('🚀  action', action);
    expect(action).toMatchObject(expectedRes);
  });

  const {getByTestId} = render(
    <Annotation id={'100x100'} note="update me" x={100} y={100} onClick={onClick} />
  );
  const annotationEl = getByTestId('annotation_100x100');
  fireEvent.click(annotationEl);

  expect(onClick).toBeCalledTimes(1);
});

test('show note only on hover', () => {
  const {getByTestId, getByText} = render(
    <Annotation id={'100x100'} note="Note..." x={100} y={100} />
  );

  const noteEl = getByText('Note...');
  // expect(getByText('Note...')).toThrowError();
  expect(noteEl).not.toBeVisible();
  fireEvent.mouseOver(getByTestId('annotation_100x100'));
  expect(noteEl).toBeVisible();
});
