import React, { useContext } from "react";
import { UserContext } from "../../../App";
import Alert from "../../../shared/components/alert";
import Bubble from "../../../shared/components/bubble";
import LinkButton from "../../../shared/components/link-button";
import ScoreBubble from "../../../shared/components/score-bubble";

const LibrariesHeader = () => {
  const userData = useContext(UserContext);

  return (
    <div className='layout-split'>
      <header className='library-header'>
        <p>
          Down below you can find all libraries that have been added to Project
          Cactus.
        </p>
        {/* <Alert type='help'>
          <h3>Important Note</h3>
          <p>
            The cactus score shows the baseline of accessibility of a given
            library according to our criteria, based on keyboard and
            screenreader use.
          </p>
        </Alert> */}
        <Alert type='info'>
          <h2>Do you miss a UI library?</h2>
          {userData?.token ? (
            <>
              <p>
                Add a library, after that test its components to immediatly
                compare it to other libraries:
              </p>
              <LinkButton
                to='new'
                label='Add a new library'
                className='button-primary'
              />
            </>
          ) : (
            <>
              <p>
                We are always looking for help. And you might be able to improve
                this directory for yourself and for others.
              </p>
              <LinkButton to='/contribute' label='Find out how to contribute' />
            </>
          )}
        </Alert>
      </header>
      <section>
        <Alert type='help'>
          <h2>Scoring System</h2>
          <div className='lib-detail-help'>
            <ScoreBubble score={100} />
            <p>
              The cactus score shows how good the library and its components did
              in the cactus accessibility testing. The criteria are based on
              keyboard and screenreader usage.
            </p>
            <Bubble value={100 + "%"} label='Focus Score' color='blue' />
            <p>
              Select components interesting to you below to get a personalized
              evaluation.
            </p>
          </div>
        </Alert>
      </section>
    </div>
  );
};

export default LibrariesHeader;
