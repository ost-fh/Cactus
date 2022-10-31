import React from "react";
import { Link, Outlet } from "react-router-dom";

const TestLabLayout = () => {
  return (
    <div className='container'>
      <header className='page-header page-header-testlab'>
        <img alt='logo' />
        <h1>Testlab</h1>
        <nav>
          <Link to='overview'>Overview</Link>
          <Link to='/'>LogOut</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default TestLabLayout;
