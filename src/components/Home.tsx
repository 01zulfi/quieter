import React, { FC } from 'react';
import Feed from './Feed';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const Home: FC = function Home() {
  return (
    <section>
      <Navbar />
      <Sidebar />
      <Feed />
    </section>
  );
};

export default Home;
