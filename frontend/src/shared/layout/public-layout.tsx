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
          </nav>
        </div>
      </header>
      <main id='main'>{children}</main>
      <hr />
      <footer className='page-footer'>
        <div>
          <p>
            Project Cactus is developed and maintained
            <br /> by{" "}
            <a href='https://www.ost.ch/en/'>OST Ostschweizer Fachhochschule</a>
          </p>{" "}
          <a href='https://www.ost.ch'>
            <img
              src='/ost-logo-en.svg'
              className='footer-ost-img'
              alt='OST Logo'
            />
          </a>
        </div>
        <div>
          <p>Sponsors</p>
          <p>Stiftung sowieso (Logo)</p>
        </div>
        <div>
          <ul className='footer-links'>
            <li>
              <Link to='/impressum'>Impressum</Link>
            </li>
            <li>
              <a href='#main'>Accessibility Statement</a>
            </li>
            <li>
              <a href='#main'>Privacy Policy</a>
            </li>
            <li>
              <a className='nav-icon' href='https://github.com/ost-fh/Cactus'>
                The project's github repository{" "}
                <img src='/github-mark.svg' alt='GitHub Mark' />
              </a>
            </li>
          </ul>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;
