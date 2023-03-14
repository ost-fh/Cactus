import React, { useContext } from "react";
import { UserContext } from "../../../App";
import Alert from "../../../shared/components/alert";
import LinkButton from "../../../shared/components/link-button";

const LibrariesHeader = () => {
  const userData = useContext(UserContext);

  return (
    <div className='layout-split'>
      <header className='library-header'>
        <p>
          Down below you can find all libraries that have been added to Project
          Cactus.
        </p>
        <Alert type='help'>
          <h3>Important Note</h3>
          <p>
            The accessibility scores do not neccessarily represent how
            accessible a finished webapplication using that library is. It only
            shows how good the baseline is it starts from, according to our
            criteria.
          </p>
        </Alert>
      </header>
      <section>
        <Alert type='info'>
          <h3>Do you miss a UI library?</h3>
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
      </section>
    </div>
  );
};

export default LibrariesHeader;
