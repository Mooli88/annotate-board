import React, {ReactElement, useRef, useState} from 'react';
import {useStore} from 'react-hookstore';
import {IAnnotaion} from '../../store/types';
import Annotation from '../Annotation/Annotation';

interface Props {}

const calcAnnotationPosition = (pos: number, space: number) => {
  const border = 2;
  const _space = space + border;
  const size = 40;
  if (pos <= size) return pos + border;
  else if (pos > size && pos < _space - size) return pos - size / 2;
  else if (0 <= _space - pos) return pos - size;

  return pos;
};

const baseStyle: React.CSSProperties = {
  position: 'relative',
  height: '80vh',
  width: '80vw',
  border: '2px solid',
};

const Board = (props: Props) => {
  const [annotationStore, setAnnotationStore] = useStore<IAnnotaion[]>('annotations');
  const [placeHolderState, setPlaceholderState] = useState<ReactElement>();
  const boardRef = useRef<HTMLDivElement>(null);

  const setPlaceholder = (posX: number, posY: number) => {
    const {clientHeight, clientWidth} = boardRef.current!;
    const [x, y] = [
      calcAnnotationPosition(posX, clientWidth),
      calcAnnotationPosition(posY, clientHeight),
    ];

    setPlaceholderState(<Annotation bgColour="#ffeb00b0" note="" {...{x, y}} />);
  };

  const onBoardClick = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPlaceholder(clientX, clientY);
  };
  //TODO: useMemo
  const renderAnnotations = () =>
    annotationStore?.map(({id, ...annotation}) => (
      <Annotation key={id} {...annotation} />
    ));

  return (
    <div ref={boardRef} data-testid="board-el" style={baseStyle} onClick={onBoardClick}>
      {renderAnnotations()}
      {placeHolderState}
    </div>
  );
};

export default Board;
