import React, { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import firebase from '../../utils/firebase';
import { useString } from '../../context/StringContext';
import Button from '../Button';

const StringDelete: FC = function StringDelete() {
  const string = useString();
  const [isDeleted, setIsDeleted] = useState(false);

  const onBoxDelete = async () => {
    await firebase.deleteString(string.id);
    setIsDeleted(true);
  };

  return (
    <div>
      {isDeleted ? (
        <div>
          <h2>the string has been deleted</h2>
          <Link to={`/box/${string.associatedBox}`}>go back to box</Link>
        </div>
      ) : (
        <div>
          <Button
            type="submit"
            textContent="Delete String"
            clickHandler={onBoxDelete}
          />
        </div>
      )}
    </div>
  );
};

export default StringDelete;
