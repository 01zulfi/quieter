import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBox } from '../../context/BoxContext';
import firebase from '../../utils/firebase';
import Button from '../Button';

const BoxDelete: FC = function BoxDelete() {
  const box = useBox();
  const [isDeleted, setIsDeleted] = useState(false);

  const onBoxDelete = async () => {
    await firebase.deleteBox(box.id);
    setIsDeleted(true);
  };

  return (
    <div>
      {isDeleted ? (
        <div>
          <h2>the box has been deleted</h2>
          <Link to="/">go back to home</Link>
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
