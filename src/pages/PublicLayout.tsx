import React from "react";
import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <>
      <div className='container'>
        <header className='page-header'>
          <img className='logo' alt='logo' src='/cactus_logo.png' />
          <h1>Project Cactus</h1>
          <nav>
            <Link to='home'>Home</Link>
            <Link to='libraries'>Libraries</Link>
            <Link to='contribute'>Contribute</Link>
            <Link to='login'>Login</Link>
          </nav>
        </header>
        <div className='hr'></div>
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default PublicLayout;
