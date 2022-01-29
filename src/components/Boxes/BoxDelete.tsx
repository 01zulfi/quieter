import React, { FC, useState } from 'react';
import { useBox } from '../../context/BoxContext';
import Button from '../Button';

const BoxDelete: FC = function BoxDelete() {
  const box = useBox();
  const [isDeleted, setIsDeleted] = useState(false);

  const onBoxDelete = () => {
    setIsDeleted(true);
    firebase.deleteBox(box.id);
  };

  return (
    <div>
      {isDeleted ? (
        <div>
          <h2>the box has been deleted</h2>
          <p>go back to home</p>
        </div>
      ) : (
        <div>
          <Button
            type="submit"
            textContent="Delete box"
            clickHandler={onBoxDelete}
          />
        </div>
      )}
    </div>
  );
};

export default BoxDelete;
