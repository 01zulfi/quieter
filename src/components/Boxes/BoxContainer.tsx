import React, { FC, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useUser } from '../../context/UserContext';
import BoxContext from '../../context/BoxContext';

const BoxContainer: FC = function BoxContainer() {
  const params = useParams();
  const [box, setBox] = useState<any>({});
  const user = useUser();

  useEffect(() => {
    (async () => {
      const fetchBox = await firebase.getBox(params.boxId);
      setBox(fetchBox);
    })();
  }, []);

  const isCurrentUserAdmin = user.adminBoxes.some(
    (id: string) => id === params.boxId,
  );

  return (
    <div>
      <BoxContext.Provider value={box}>
        {isCurrentUserAdmin && <p>you are the admin of this box</p>}
        <Box />
      </BoxContext.Provider>
    </div>
  );
};

export default BoxContainer;
