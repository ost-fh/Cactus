import React from "react";
import { Link } from "react-router-dom";
import PublicLayout from "../layout/PublicLayout";
import "./home.css";

const home = () => {
  return (
    <PublicLayout activeLink='home'>
      <div className='home-intro'>
        <h2>Welcome to Project Cactus</h2>
        <p>
          We provide a Platform to test and provide results to qualify UI
          libraries in terms of accessibility.
        </p>
      </div>
      <div className='home-section '>
        <div className='home-title'>
          <span>The Mission</span>
        </div>
        <div className='home-text'>
          <p>
            To make the web more accessible for everyone, we aim to provide a
            resource to improve and ease the inclusion of accessibility in
            projects early. We do this by providing accessibility metrics to UI
            libraries, to make a choice for your next project easier.
          </p>
          <Link to='/libraries' className='button'>
            Check out the scores
          </Link>
        </div>
      </div>
      <div className='home-section '>
        <div className='home-title'>
          <span>How does it work?</span>
        </div>
        <div className='home-text'>
          <p>
            We test UI libraries to see, if they provide a baseline of
            accessibility. There is a criteria-catalogue specially developed for
            this, that is manually checked against the libraries. This is a
            crowdsourced effort.
          </p>
          <Link to='/about' className='button'>
            Find out how it works
          </Link>
        </div>
      </div>
      <div className='home-section '>
        <div className='home-title'>
          <span>We need your help!</span>
        </div>
        <div className='home-text'>
          <p>
            Ther are a lot of UI libraries. It takes a lot of time to test them
            all. Therefore we made the testing crowdsourced. Are you interested
            to help out?
          </p>
          <Link to='/contribute' className='button'>
            See how you can contribute
          </Link>
        </div>
      </div>
    </PublicLayout>
  );
};

export default home;
