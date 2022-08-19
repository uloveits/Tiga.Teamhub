import React from 'react';

interface ISeparationProps {
  color?: string;
  height?: number;
  width?: number;
  type?: 'horizontal' | 'vertical';
}
const Separation = (props: ISeparationProps) => {
  const { color = '#f0f0f0', height = 1, width = 1, type = 'horizontal' } = props;

  return (
    <div
      style={{
        height: `${type === 'horizontal' ? `${height}px` : '100%'}`,
        width: `${type === 'vertical' ? `${width}px` : '100%'}`,
        background: color,
      }}
    />
  );
};

export default Separation;
