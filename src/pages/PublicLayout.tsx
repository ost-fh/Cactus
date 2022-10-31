import React from "react";
import { Link, Outlet } from "react-router-dom";

const PublicLayout = () => {
  return (
    <div className="container">
      <header className="page-header">
        <img alt="logo" />
        <h1>Sitename</h1>
        <nav>
          <Link to="home">Home</Link>
          <Link to="results">Results</Link>
          <Link to="contribute">Contribute</Link>
          <Link to="login">Login</Link>
          <Link to="testlab">[Testlab]</Link>
        </nav>
      </header>
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default PublicLayout;
