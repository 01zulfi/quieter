import React, { FC } from 'react';
import Feed from './Feed';
import Sidebar from './Sidebar';

const Home: FC = function Home() {
  return (
    <section>
      <Sidebar />
      <Feed />
    </section>
  );
};

export default Home;
