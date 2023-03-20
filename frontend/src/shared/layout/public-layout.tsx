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
            height='705'
            width='705'
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
            Developed and maintained
            <br /> by{" "}
            <a href='https://www.ost.ch/en/'>OST Ostschweizer Fachhochschule</a>
          </p>{" "}
          <a href='https://www.ost.ch'>
            <img
              src='/ost-logo-en.svg'
              className='footer-img-ost'
              alt='OST Logo'
            />
          </a>
        </div>
        <div id='footer-row-center'>
          <p>Sponsor</p>
          <a href='https://frh-fondation.ch/de/'>
            <img
              src='/FRH-logo.png'
              className='footer-img-sponsor'
              alt='Logo: Fondation pour la Recherche pour les personnes avec Handicap'
            />
          </a>
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
              <Link to="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <a className='nav-icon' href='https://github.com/ost-fh/Cactus'>
                Cactus on Github{" "}
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
