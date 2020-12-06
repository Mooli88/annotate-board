import React, {ReactElement, useEffect, useRef, useState} from 'react';
import {useStore} from 'react-hookstore';
import {addAnnotation, updateAnnotation} from '../../store/actions';
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

const collisionDetection = (
  {x, y}: {x: number; y: number},
  items: IAnnotation[]
): boolean => {
  if (items.length === 0) return true;
  return (
    items.filter((item) => {
      const {x: itemX, y: itemY} = item;
      const xOnRow = itemX - 40 > x || itemX + 40 < x;
      const yOnColumn = itemY - 40 > y || itemY + 40 < y;
      return !(xOnRow || yOnColumn);
    }).length === 0
  );
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
  const disabled = useRef(false);

  const setPlaceholder = (posX: number, posY: number) => {
    const {clientHeight, clientWidth} = boardRef.current!;
    const [x, y] = [
      calcAnnotationPosition(posX, clientWidth),
      calcAnnotationPosition(posY, clientHeight),
    ];
    console.log('🚀 ~ file: Board.tsx ~ line 38 ~ setPlaceholder ~ x, y', x, y);
    const isValid = collisionDetection({x, y}, annotationStore);
    if (isValid) {
      console.log('🚀 ~ file: Board.tsx ~ line 61 ~ setPlaceholder ~ isValid', isValid);
      setPlaceholderState(
        <Annotation id="placeholder" bgColour="#ffeb00b0" note="" {...{x, y}} />
      );
      return (cb: ([x, y]: [number, number]) => void) => {
        cb([x, y]);
      };
    }
    return () => {};
  };

  useEffect(() => {}, [annotationStore]);

  const onBoardClick = ({
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    setPlaceholder(
      clientX,
      clientY
    )(([x, y]) => {
      onClick(
        addAnnotation({
          id: `${x}x${y}`,
          x,
          y,
          note: '',
        })
      );
    });
  };

  const editAnnotation = (data: UpdateAnnotation['payload']) => {
    onClick(updateAnnotation(data));
  };
  //TODO: useMemo
  const renderAnnotations = () =>
    annotationStore?.map(({id, ...annotation}) => (
      <Annotation key={id} id={id} {...annotation} onClick={editAnnotation} />
    ));

  return (
    <div ref={boardRef} data-testid="board-el" style={baseStyle} onClick={onBoardClick}>
      {renderAnnotations()}
      {placeHolderState}
    </div>
  );
};

export default Board;
