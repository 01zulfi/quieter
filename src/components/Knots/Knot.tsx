import React, { FC, useState, useEffect } from 'react';
import firebase from '../../utils/firebase';
import { useUser } from '../../context/UserContext';

interface KnotProps {
  knotId: string;
}

const Knot: FC<KnotProps> = function Knot({ knotId }) {
  const [knot, setKnot] = useState<any>({});
  const user = useUser();

  useEffect(() => {
    (async () => {
      const fetchKnot = await firebase.getKnot(knotId);
      setKnot(fetchKnot);
    })();
  }, []);

  const isCurrentUserAuthor = user.authoredKnots.find(
    (id: string) => knotId === id,
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
