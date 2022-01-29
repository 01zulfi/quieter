import React, { FC } from 'react';
import Button from '../Button';
import { useBox } from '../../context/BoxContext';

interface BoxRegularViewProps {
  onButtonClick: React.MouseEventHandler<HTMLButtonElement>;
}

const BoxRegularView: FC<BoxRegularViewProps> = function BoxRegularView({
  onButtonClick,
}) {
  const box = useBox();

  return (
    <div>
      <h2>{box.name}</h2>
      <p>{box.description}</p>
      <Button
        type="button"
        textContent={`Start a string in ${box.name}`}
        clickHandler={onButtonClick}
      />
    </div>
  );
};

export default BoxRegularView;
