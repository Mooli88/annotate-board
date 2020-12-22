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
      className=""
      style={{display: visible ? 'block ' : 'none', position: 'fixed'}}
    >
      <form>
        <label className="sr-only" htmlFor="noteEditor">
          Note
        </label>
        <input
          id="noteEditor"
          type="text"
          placeholder="Enter annotation note"
          defaultValue={value}
          ref={inputRef}
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
        />
        <button
          onClick={submit}
          type="submit"
          className="relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          submit
        </button>
      </form>
    </div>
  );
};

export default NoteEditor;
