import React, { FC, useState, useEffect } from 'react';
import firebase from '../../utils/firebase';
import ExploreItem from '../Explore/ExploreItem';
import Loading from '../Loading';

interface AdminedTabProps {
  adminedBoxes: any[];
}

const AdminedTab: FC<AdminedTabProps> = function AdminedTab({ adminedBoxes }) {
  const [boxes, setBoxes] = useState<any>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    (async () => {
      if (adminedBoxes.length === 0) {
        setIsLoaded(true);
        return;
      }

      const fetchedBoxes: any[] = [];

      adminedBoxes.forEach(async (boxId: string, index: number) => {
        const fetchedBox = await firebase.getBox(boxId);
        if (fetchedBox) {
          fetchedBoxes.push(fetchedBox);
        }
        if (index === adminedBoxes.length - 1) {
          setBoxes(fetchedBoxes);
          setIsLoaded(true);
        }
      });
    })();
  }, []);

  if (!isLoaded) {
    return <Loading width="25px" />;
  }

  if (adminedBoxes.length === 0) {
    return <p>User has no admin boxes.</p>;
  }

  return (
    <section>
      {boxes.map((box: any) => (
        <div key={box.id}>
          <ExploreItem
            boxName={box.name}
            boxDescription={box.description}
            boxId={box.id}
          />
        </div>
      ))}
    </section>
  );
};

export default AdminedTab;
