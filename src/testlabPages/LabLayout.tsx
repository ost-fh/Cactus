import React from "react";
import { Link, Outlet } from "react-router-dom";

const TestLabLayout = () => {
  return (
    <div className='container'>
      <header className='page-header page-header-testlab'>
        <img className='logo' alt='logo' src='/cactus_logo.png' />
        <h1>Cactus Testlab</h1>
        {/* <nav>
          <Link to='.'>Overview</Link>
          <Link to='1'>DetailExample</Link>
          <Link to='test'>Test</Link>
          <Link to='/'>LogOut</Link>
        </nav> */}
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TestLabLayout;
