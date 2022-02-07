import React, { FC } from 'react';
import { Link } from 'react-router-dom';

const Navbar: FC = function Navbar() {
  return (
    <div>
      <div>
        <h1>quieter</h1>
        <h2>social media for quiet folks</h2>
      </div>
      <div>Search Component Placeholder</div>
      <div>Avatar Component Placeholder</div>
      <div>
        <Link to="/sign-out">Sign out</Link>
      </div>
    </div>
  );
};

export default Navbar;
