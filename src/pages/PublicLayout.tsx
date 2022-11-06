import React from "react";
import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className='container'>
      <header className='page-header'>
        <img alt='logo' />
        <h1>Project Cactus</h1>
        <nav>
          <Link to='home'>Home</Link>
          <Link to='libraries'>Libraries</Link>
          <Link to='contribute'>Contribute</Link>
          <Link to='login'>Login</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
