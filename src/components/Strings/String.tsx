import React, { FC } from 'react';

interface StringProps {
  title: string;
  content: string;
}

const String: FC<StringProps> = function String({ title, content }) {
  return (
    <section>
      <h2>{title}</h2>
      <p>{content}</p>
    </section>
  );
};

export default String;
