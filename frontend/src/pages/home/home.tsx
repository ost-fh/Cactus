import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import "./home.scss";

const Home = () => {
  return (
    <PublicLayout className='home' activeLink='home'>
      <div className='home-intro'>
        <Heading>Welcome to Project Cactus</Heading>
        {/* <p>
          We provide a platform to test and provide results to qualify UI
          libraries in terms of accessibility.
        </p> */}

        <div className='home-cact'>
          <div className='item'>
            <img
              src='/crowd.jpeg'
              width={150}
              height={150}
              alt='symbolic representation of a group of people'
              className='image'
            />
            <p className='highlight'>
              <span>C</span>ollaborative
            </p>
            {/* <p className='description'>
            This is a community driven platform
          </p> */}
          </div>
          <div className='item'>
            <img
              src='/accessibility.jpeg'
              width={150}
              height={150}
              alt='symbol for web accessibility'
              className='image'
            />
            <p className='highlight'>
              <span>A</span>ccessibility
            </p>
            {/* <p className='description'>
            Making the web a little bit more accessible
          </p> */}
          </div>
          <div className='item'>
            <img
              src='/components.png'
              width={150}
              height={150}
              alt='symbolic representation of a group of UI Components'
              className='image'
            />
            <div>
              <p className='highlight'>
                <span>C</span>omponents
              </p>
              <p className='description'>from Web UI Libraries</p>
            </div>
          </div>
          <div className='item'>
            <img
              src='/testing.jpeg'
              alt='a checklist'
              className='image'
              width={150}
              height={150}
            />
            <p className='highlight'>
              <span>T</span>esting
            </p>
            {/* <p className='description'>
            This is a community driven platform
          </p> */}
          </div>
          <div className='item'>
            <img
              width={150}
              height={150}
              src='/cactus_logo.png'
              alt='the project cactus logo'
              className='image'
            />
            <div>
              <p className='highlight'>
                cact<span>US</span>
              </p>
              <p className='description'>That's what we do!</p>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className='home-section '>
        <div className='title'>
          <h3>The Mission</h3>
        </div>
        <div className='text'>
          <p>
            "Is my favourite UI library accessible?" - "What UI Frameworks could
            I choose for my project that gives me a headstart in accessibility?"
            These are the questions project cactus tries to answer!
          </p>
        </div>
        <Link to='/libraries' className='button button-primary'>
          Check out the scored Libraries
        </Link>
      </div>
      <div className='home-section '>
        <div className='title'>
          <h3>How does it work?</h3>
        </div>
        <div className='text'>
          <p>
            This is a comparison platform for UI Libraries. The UI Libraries are
            compared by the performance evaluated by users in manual testing.
            Currently the tests focus on keyboard and on screenreader (NVDA)
            usage.
          </p>
        </div>
        <Link to='/contribute#FAQ' className='button'>
          Visit our FAQ
        </Link>
      </div>
      <div className='home-section '>
        <div className='title'>
          <h3>We need your Help!</h3>
        </div>
        <div className='text'>
          <p>
            There are a lot of UI libraries with a lot of components. It takes a
            lot of time to test them all. Therefore we made the testing
            crowdsourced. We have a criteria-catalogue specially developed for
            this, and you can check it against different components of the
            libraries. Are you interested to help out?
          </p>
        </div>
        <Link to='/contribute' className='button'>
          See how you can contribute
        </Link>
      </div>
    </PublicLayout>
  );
};

export default Home;
