import React, { useContext, useEffect, useState } from "react";
import { BsFillPersonFill } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import Alert from "../components/alert";
import "./public-layout.scss";

type PublicLayoutProps = {
  children?: React.ReactNode;
  activeLink?: string;
  className?: string;
};

const PublicLayout = ({
  children,
  activeLink,
  className,
}: PublicLayoutProps) => {
  const userData = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState<string>();

  useEffect(() => {
    const alert = searchParams.get("alert");
    if (alert === "login") {
      setSuccessMessage("Login succeeded");
    }
    if (alert === "logout") {
      setSuccessMessage("Logout succeeded");
    }
  }, [searchParams]);

  return (
    <div className='container'>
      <a className='skip-link' href='#main'>
        skip menu
      </a>
      <header className='page-header'>
        <div className='title'>
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
        </div>

        <div className='user'>
          {userData?.token ? (
            <>
              <BsFillPersonFill /> Logged in as {userData.username}
              {" - "}
              <Link to={`/logout?path=${window.location.pathname}`}>
                Logout
              </Link>
            </>
          ) : (
            <>
              <BsFillPersonFill />
              <Link to={`/login?path=${window.location.pathname}`}>Login</Link>
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
      </header>
      <div aria-live='assertive'>
        {successMessage && (
          <Alert
            type='success'
            className='main-alert'
            message={successMessage}
          />
        )}
      </div>
      <main className={className ? className : ""} id='main'>
        {children}
      </main>
      <hr />
      <footer className='page-footer'>
        <div className='ost'>
          <p>
            Developed and maintained
            <br /> by{" "}
            <a href='https://www.ost.ch/en/'>OST Ostschweizer Fachhochschule</a>
          </p>{" "}
          <a href='https://www.ost.ch'>
            <img src='/ost-logo-en.svg' className='img-ost' alt='OST Logo' />
          </a>
        </div>
        <div className='sponsor'>
          <p>Sponsor</p>
          <a href='https://frh-fondation.ch/en/'>
            <img
              src='/FRH-logo.png'
              className='img-sponsor'
              alt='Logo: Fondation pour la Recherche pour les personnes avec Handicap'
            />
          </a>
        </div>
        <div className='links'>
          <ul>
            <li>
              <Link to='/impressum'>Impressum</Link>
            </li>
            <li>
              <Link to='/accessibility-statement'>Accessibility Statement</Link>
            </li>
            <li>
              <Link to='/privacy-policy'>Privacy Policy</Link>
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
