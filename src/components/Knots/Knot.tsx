import React, { FC, useState, useEffect } from 'react';
import { useUser } from '../../context/UserContext';

interface KnotProps {
  id: string;
}

const Knot: FC<KnotProps> = function Knot({ id }) {
  const [knot, setKnot] = useState<any>({});
  const user = useUser();

  useEffect(() => {
    (async () => {
      const fetchKnot = await firebase.getKnot(id);
      setKnot(fetchKnot);
    })();
  }, []);

  const isCurrentUserAuthor = user.authoredKnots.find(
    (knotId: string) => knotId === id,
  );

  // TODO: show user name & avatar
  return (
    <div>
      {isCurrentUserAuthor && <p>you are the author of this knot</p>}
      <div>
        <p>{knot.content}</p>
      </div>
    </div>
  );
};

export default Knot;
