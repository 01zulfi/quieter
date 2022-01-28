import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import StringContext from '../../context/StringContext';
import Button from '../Button';
import String from './String';
import StringEdit from './StringEdit';
import Knot from '../Knots/Knot';
import KnotCreate from '../Knots/KnotCreate';

const StringContainer: FC = function StringContainer() {
  const params = useParams();
  const [string, setString] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const user = useUser();

  useEffect(() => {
    (async () => {
      const stringData = await firebase.getString(params.stringId);
      setString(stringData);
    })();
  }, []);

  const isCurrentUserAuthor = user.authoredStrings.find(
    (id: string) => id === params.stringId,
  );

  const editButtonHandler = () => setIsEditMode(true);

  const deleteButtonHandler = () => {};

  return (
    <div>
      <StringContext.Provider value={string}>
        {isCurrentUserAuthor && (
          <div>
            <p>you are the author of this string</p>
            <Button
              textContent="Edit"
              type="button"
              clickHandler={editButtonHandler}
            />
            <Button
              textContent="Delete"
              type="button"
              clickHandler={deleteButtonHandler}
            />
          </div>
        )}
        {isEditMode ? (
          <StringEdit />
        ) : (
          <div>
            <String />
            {string.knots.map((knotId: string) => (
              <div key={knotId}>
                <Knot id={knotId} />
              </div>
            ))}
            <KnotCreate />
          </div>
        )}
      </StringContext.Provider>
    </div>
  );
};

export default StringContainer;
