import React, { FC } from 'react';
import { useString } from '../../context/StringContext';

const String: FC = function String() {
  const string = useString();

  return (
    <section>
      <h2>{string.title}</h2>
      <p>{string.content}</p>
    </section>
  );
};

export default String;
