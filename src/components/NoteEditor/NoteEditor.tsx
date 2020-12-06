import React, {useRef} from 'react';

export interface Props {
  visible: boolean;
  onSubmit: (note: string) => void;
  position?: 'top' | 'bottom';
  value?: string;
}

const NoteEditor = ({visible, onSubmit, value = '', position = 'top'}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const submit = () => {
    onSubmit(inputRef.current!.value);
    inputRef.current!.value = '';
  };
  return (
    <div
      data-testid="note-editor-el"
      style={{display: visible ? 'block ' : 'none', position: 'fixed'}}
    >
      <div>
        <label htmlFor="noteEditor">Note</label>
        <input
          id="noteEditor"
          type="text"
          placeholder="Enter annotation note"
          defaultValue={value}
          ref={inputRef}
        />
        <button onClick={submit} type="submit">
          submit
        </button>
      </div>
    </div>
  );
};

export default NoteEditor;
