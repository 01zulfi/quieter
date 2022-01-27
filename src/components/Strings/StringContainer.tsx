import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import Button from '../Button';
import String from './String';

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
        <StringEdit data={string} />
      ) : (
        <div>
          <String title={string.title} content={string.content} />
          {string.knots.map((knot) => {
            <div key={knot.id}>
              <Knot id={knot.id} />
            </div>;
          })}
        </div>
      )}
    </div>
  );
};

export default StringContainer;
