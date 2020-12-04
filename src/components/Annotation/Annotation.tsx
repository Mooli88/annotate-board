import React from 'react';
import {IAnnotaion} from '../../store/types';

interface Props extends Omit<IAnnotaion, 'id'> {
  onClick?: () => void;
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

const Annotation = ({x, y, note, bgColour = '#bec3c9', onClick}: Props) => {
  return (
    <div
      data-testid={`annotation_${x}x${y}`}
      style={{
        ...baseStyle,
        top: y,
        left: x,
        backgroundColor: bgColour,
      }}
    ></div>
  );
};

export default Annotation;
