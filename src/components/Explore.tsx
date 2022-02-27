import React, { FC, useState, useEffect } from 'react';
import firebase from '../utils/firebase';
import Loading from './Loading';

const Explore: FC = function Explore() {
  const [boxes, setBoxes] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      const fetchedData = await firebase.getBoxList(1000);
      setBoxes(fetchedData);
      setIsLoaded(true);
    })();
  }, []);

  return (
    <section>
      {isLoaded ? (
        boxes.map((box: any) => <div key={box.id}>{box.name}</div>)
      ) : (
        <Loading width="50px" />
      )}
    </section>
  );
};

export default Explore;
