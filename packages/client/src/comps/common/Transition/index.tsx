import React from 'react';

interface ITransitionProps {
  children: React.ReactNode;
}
const Transition = (props: ITransitionProps) => {
  const { children } = props;
  return <>{children}</>;
};
export default Transition;
