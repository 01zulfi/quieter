import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';

const StringContainer: FC = function String() {
  const params = useParams();
  const [string, setString] = useState<any>({});
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

  return (
    <div>
      {isCurrentUserAuthor && <p>you are the author of this string</p>}
      <String title={string.title} content={string.content} />
      {string.knots.map((knot) => {
        <div key={knot.id}>
          <Knot id={knot.id} />
        </div>;
      })}
    </div>
  );
};

export default StringContainer;
