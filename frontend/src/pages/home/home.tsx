import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import "./home.css";

const Home = () => {
  return (
    <PublicLayout activeLink='home'>
      <div className='home-intro'>
        <Heading>Welcome to Project Cactus</Heading>
        {/* <p>
          We provide a platform to test and provide results to qualify UI
          libraries in terms of accessibility.
        </p> */}

        <div className='home-cact'>
          <div className='home-cact-item'>
            <img
              src='/crowd.jpeg'
              width={150}
              height={150}
              alt='symbolic representation of a group of people'
              className='home-cact-image'
            />
            <p className='home-cact-highlight'>
              <span>C</span>ollaborative
            </p>
            {/* <p className='home-cact-description'>
            This is a community driven platform
          </p> */}
          </div>
          <div className='home-cact-item'>
            <img
              src='/accessibility.jpeg'
              width={150}
              height={150}
              alt='symbol for web accessibility'
              className='home-cact-image'
            />
            <p className='home-cact-highlight'>
              <span>A</span>ccessibility
            </p>
            {/* <p className='home-cact-description'>
            Making the web a little bit more accessible
          </p> */}
          </div>
          <div className='home-cact-item'>
            <img
              src='/components.png'
              width={150}
              height={150}
              alt='symbolic representation of a group of UI Components'
              className='home-cact-image'
            />
            <div>
              <p className='home-cact-highlight'>
                <span>C</span>omponents
              </p>
              <p className='home-cact-description'>from Web UI Libraries</p>
            </div>
          </div>
          <div className='home-cact-item'>
            <img
              src='/testing.jpeg'
              alt='a checklist'
              className='home-cact-image'
              width={150}
              height={150}
            />
            <p className='home-cact-highlight'>
              <span>T</span>esting
            </p>
            {/* <p className='home-cact-description'>
            This is a community driven platform
          </p> */}
          </div>
          <div className='home-cact-item'>
            <img
              width={150}
              height={150}
              src='/cactus_logo.png'
              alt='the project cactus logo'
              className='home-cact-image'
            />
            <div>
              <p className='home-cact-highlight'>
                cact<span>US</span>
              </p>
              <p className='home-cact-description'>That's what we do!</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='home-section '>
        <div className='home-title'>
          <h3>The Mission</h3>
        </div>
        <div className='home-text'>
          <p>
            "Is my favourite UI library accessible?" - "What UI Frameworks could
            I choose for my project that gives me a headstart in accessibility?"
            These are the questions project cactus tries to answer!
          </p>
          <Link to='/libraries' className='button button-primary'>
            Check out the scored libraries
          </Link>
        </div>
      </div>
      <div className='home-section '>
        <div className='home-title'>
          <h3>We need your help!</h3>
        </div>
        <div className='home-text'>
          <p>
            There are a lot of UI libraries with a lot of components. It takes a
            lot of time to test them all. Therefore we made the testing
            crowdsourced. We have a criteria-catalogue specially developed for
            this, and you can check it against different components of the
            libraries. Are you interested to help out?
          </p>
          <Link to='/contribute' className='button'>
            See how you can contribute
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default Home;
