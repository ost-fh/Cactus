import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
import "./publiclayout.css";

type PublicLayoutProps = {
  children?: React.ReactNode;
  activeLink?: string;
};

const PublicLayout = ({ children, activeLink }: PublicLayoutProps) => {
  const userData = useContext(UserContext);

  return (
    <div className='container'>
      <header className='page-header'>
        <img className='logo' alt='logo' src='/cactus_logo.png' />
        <h1>Project Cactus</h1>
        <nav>
          <Link
            className={`nav-link ${
              activeLink === "home" ? "nav-link-active" : ""
            }`}
            to='/'
          >
            Home
          </Link>
          <Link
            className={`nav-link ${
              activeLink === "libraries" ? "nav-link-active" : ""
            }`}
            to='/libraries'
          >
            Libraries
          </Link>
          <Link
            className={`nav-link ${
              activeLink === "about" ? "nav-link-active" : ""
            }`}
            to='/about'
          >
            About
          </Link>
          <Link
            className={`nav-link ${
              activeLink === "contribute" ? "nav-link-active" : ""
            }`}
            to='/contribute'
          >
            Contribute
          </Link>
          {!userData?.token ? (
            <Link
              className={`nav-link ${
                activeLink === "login" ? "nav-link-active" : ""
              }`}
              to='/login'
            >
              Login
            </Link>
          ) : (
            <Link className='nav-link' to='/logout'>
              Logout
            </Link>
          )}
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default PublicLayout;
