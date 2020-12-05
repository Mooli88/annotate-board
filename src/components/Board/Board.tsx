import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {useStore} from 'react-hookstore';
import {addAnnotation} from '../../store/actions';
import {AddAnnotation, IAnnotation, UpdateAnnotation} from '../../store/types';
import Annotation from '../Annotation/Annotation';

interface Props {
  onClick: (action: AddAnnotation | UpdateAnnotation) => void;
}

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

const Board = ({onClick}: Props) => {
  const [annotationStore] = useStore<IAnnotation[]>('annotations');
  const [placeHolderState, setPlaceholderState] = useState<ReactElement>();
  const boardRef = useRef<HTMLDivElement>(null);

  const setPlaceholder = (posX: number, posY: number) => {
    const {clientHeight, clientWidth} = boardRef.current!;
    const [x, y] = [
      calcAnnotationPosition(posX, clientWidth),
      calcAnnotationPosition(posY, clientHeight),
    ];

    setPlaceholderState(
      <Annotation id="placeholder" bgColour="#ffeb00b0" note="" {...{x, y}} />
    );
    return [x, y];
  };

  useEffect(() => {}, [annotationStore]);

  const onBoardClick = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const [x, y] = setPlaceholder(clientX, clientY);
    onClick(
      addAnnotation({
        id: `${x}x${y}`,
        x,
        y,
        note: '',
      })
    );
  };
  //TODO: useMemo
  const renderAnnotations = () =>
    annotationStore?.map(({id, ...annotation}) => (
      <Annotation key={id} id={id} {...annotation} />
    ));

  return (
    <div ref={boardRef} data-testid="board-el" style={baseStyle} onClick={onBoardClick}>
      {renderAnnotations()}
      {placeHolderState}
    </div>
  );
};

export default Board;
