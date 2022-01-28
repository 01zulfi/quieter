import React, { FC, useState } from 'react';
import { useString } from '../../context/StringContext';
import Button from '../Button';

const KnotCreate: FC = function KnotCreate() {
  const [knot, setKnot] = useState('');
  const string = useString();

  const onKnotInput = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setKnot(event.target.value);

  const onKnotSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await firebase.addKnot({ stringId: string.id, knotContent: knot });
    setKnot('');
  };

  return (
    <div>
      <form onSubmit={onKnotSubmit}>
        <textarea
          value={knot}
          name="knot-input"
          id="knot-input"
          cols={15}
          rows={5}
          onChange={onKnotInput}
        />
        <Button
          type="submit"
          textContent="Create knot"
          clickHandler={() => {}}
        />
      </form>
    </div>
  );
};

export default KnotCreate;
