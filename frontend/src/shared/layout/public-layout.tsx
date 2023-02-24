import React, { useContext } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { UserContext } from "../../App";
import "./public-layout.css";

type PublicLayoutProps = {
  children?: React.ReactNode;
  activeLink?: string;
};

const PublicLayout = ({ children, activeLink }: PublicLayoutProps) => {
  const userData = useContext(UserContext);

  return (
    <div className='container'>
      <a className='skip-link' href='#main'>
        skip menu
      </a>
      <header className='page-header'>
        <Link tabIndex={-1} title='Navigate to homepage' to={"/"}>
          <img
            className='logo'
            alt='logo of project cactus'
            src='/cactus_logo.png'
          />
        </Link>
        <Link
          title='Navigate to homepage'
          to={"/"}
          className='page-header-title'
        >
          <h1>Project Cactus</h1>
        </Link>
        <div className='page-header-group'>
          <div className='page-header-user'>
            {userData?.token ? (
              <>
                <BsFillPersonFill /> Logged in as {userData.username}
                {" - "}
                <Link to='/logout'>Logout</Link>
              </>
            ) : (
              <>
                <BsFillPersonFill />
                <Link to='/login'>Login</Link>
              </>
            )}
          </div>
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
                activeLink === "contribute" ? "nav-link-active" : ""
              }`}
              to='/contribute'
            >
              Contribute
            </Link>
            <Link className={`nav-link ${
                activeLink === "impressum" ? "nav-link-active" : ""
              }`} to='/impressum'>Impressum</Link>
            <a className='nav-icon' href='https://github.com/ost-fh/Cactus'>
              <img src='github-mark.svg' alt='GitHub Mark'></img>
            </a>
          </nav>
        </div>
      </header>
      <main id='main'>{children}</main>
      <footer className='page-footer'></footer>
    </div>
  );
};

export default PublicLayout;
