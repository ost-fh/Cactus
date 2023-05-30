import React, { useContext, useEffect, useState } from "react";
import { BsFillPersonFill, BsHouse, BsHouseFill, BsList } from "react-icons/bs";
import { Link, useSearchParams } from "react-router-dom";
import { UserContext } from "../../App";
import Alert from "../components/alert";
import "./public-layout.scss";

type PublicLayoutProps = {
  children?: React.ReactNode;
  activeLink?: string;
  className?: string;
  id?: string;
};

const PublicLayout = ({
  children,
  activeLink,
  className,
  id,
}: PublicLayoutProps) => {
  const userData = useContext(UserContext);
  const [searchParams] = useSearchParams();
  const [successMessage, setSuccessMessage] = useState<string>();
  const [menuOpen, setMenuOpen] = useState(false);

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
              src='/cactus_logo.svg'
              height='705'
              width='705'
            />
          </Link>
        </div>

        <button onClick={() => setMenuOpen(!menuOpen)} className='menu-button'>
          <BsList size={"1.5rem"} />
          {menuOpen ? "Close" : "Open "} Menu
        </button>

        <nav className={menuOpen ? "visible" : "hidden"}>
          <Link
            className={`nav-link ${
              activeLink === "home" ? "nav-link-active" : ""
            }`}
            aria-current={activeLink === "home" && "page"}
            to='/'
          >
            Cactus{" "}
            {activeLink === "home" ? (
              <BsHouseFill title='home' />
            ) : (
              <BsHouse title='home' />
            )}
          </Link>
          <Link
            className={`nav-link ${
              activeLink === "libraries" ? "nav-link-active" : ""
            }`}
            aria-current={activeLink === "libraries" && "page"}
            to='/libraries'
          >
            Libraries
          </Link>
          <Link
            className={`nav-link ${
              activeLink === "faq" ? "nav-link-active" : ""
            }`}
            aria-current={activeLink === "faq" && "page"}
            to='/faq'
          >
            FAQ
          </Link>
          <Link
            className={`nav-link ${
              activeLink === "contribute" ? "nav-link-active" : ""
            }`}
            aria-current={activeLink === "contribute" && "page"}
            to='/contribute'
          >
            Contribute
          </Link>
        </nav>

        <div className={`user ${menuOpen ? "visible" : "hidden"}`}>
          {userData?.token ? (
            <>
              <BsFillPersonFill />
              {userData.username}
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
        <h2 className='visually-hidden'>Footer</h2>
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
              <Link to='/criteria'>Criteria Reference</Link>
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
