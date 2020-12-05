import {fireEvent, render} from '@testing-library/react';
import React from 'react';
import NoteEditor from './NoteEditor';

test('hidden by default', () => {
  const {getByTestId} = render(<NoteEditor visible={false} onSubmit={() => {}} />);
  const testEditorEl = getByTestId('note-editor-el');

  expect(testEditorEl).not.toBeVisible();
});

test('show if visible set to true', () => {
  const {getByTestId, rerender} = render(<NoteEditor visible onSubmit={() => {}} />);
  const testEditorEl = getByTestId('note-editor-el');

  expect(testEditorEl).toBeVisible();

  rerender(<NoteEditor visible={false} onSubmit={() => {}} />);

  expect(testEditorEl).not.toBeVisible();
});

test('init with default value', () => {
  const {getByDisplayValue, getByPlaceholderText, unmount} = render(
    <NoteEditor visible onSubmit={() => {}} />
  );
  const value = 'init with value';
  let inputEl = getByPlaceholderText('Enter annotation note') as HTMLInputElement;

  expect(inputEl).toBeInstanceOf(HTMLInputElement);
  expect(inputEl).not.toHaveValue();

  unmount();

  render(<NoteEditor visible onSubmit={() => {}} value={value} />);

  inputEl = getByDisplayValue(value) as HTMLInputElement;

  expect(inputEl).toHaveValue(value);
  expect(inputEl.value).toBe(value);
});

test('pass value on submit', () => {
  const value = 'value to pass';
  const onSubmit = jest.fn();
  const {getByText} = render(<NoteEditor visible {...{onSubmit, value}} />);

  const buttonEl = getByText('submit');
  fireEvent.click(buttonEl);
  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(onSubmit).toBeCalledWith(value);
});

test('clear value on submit', () => {
  const value = 'to be cleared';
  const {getByText, getByPlaceholderText} = render(
    <NoteEditor visible onSubmit={() => {}} value={value} />
  );

  const inputEl = getByPlaceholderText('Enter annotation note') as HTMLInputElement;
  const buttonEl = getByText('submit');

  fireEvent.click(buttonEl);

  expect(inputEl).not.toHaveDisplayValue(value);
  expect(inputEl).not.toHaveValue();
  expect(inputEl.value).toBe('');
});
