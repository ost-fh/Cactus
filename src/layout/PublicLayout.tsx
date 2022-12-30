import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../App";
// import { FaSignOutAlt } from "react-icons/fa";
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
        <div className='page-header-group'>
          {userData?.token && (
            <div className='page-header-user'>
              Logged in as {userData.username}
            </div>
          )}
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
                {/* <FaSignOutAlt />*/} Logout
              </Link>
            )}
          </nav>
        </div>
      </header>
      <main>{children}</main>
      <footer className='page-footer'></footer>
    </div>
  );
};

export default PublicLayout;
