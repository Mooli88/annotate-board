import React, {useState} from 'react';
import {IAnnotation, UpdateAnnotation} from '../../store/types';

interface Props extends IAnnotation {
  onClick?: (d: UpdateAnnotation['payload']) => void;
  // isHovered?: (id: string) => void;
  bgColour?: string;
}

// const baseStyle = (x: number, y: number): React.CSSProperties => {
//   const size = 40;
//   const transformX = x < size ? 0 : '-50%';
//   const transformY = y < size ? 0 : '-50%';
//   return {
//     position: 'absolute',
//     height: 40,
//     width: 40,
//     top: y,
//     left: x,
//     // transform: `translate(${transformX}, ${transformY})`,
//   };
// };
const baseStyle: React.CSSProperties = {
  position: 'absolute',
  height: 40,
  width: 40,
};

const Annotation = ({id, x, y, note, bgColour = '#bec3c9', onClick}: Props) => {
  const [noteState, setNoteState] = useState(false);
  return (
    <div onMouseOver={() => setNoteState(true)} onMouseOut={() => setNoteState(false)}>
      <div
        data-testid={`annotation_${id}`}
        style={{
          ...baseStyle,
          top: y,
          left: x,
          backgroundColor: bgColour,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onClick && onClick({id, note});
        }}
      ></div>
      <div style={{display: noteState ? 'block' : 'none'}}>{note}</div>
    </div>
  );
};

export default Annotation;
