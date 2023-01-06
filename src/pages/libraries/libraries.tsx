import React, { useContext, useEffect, useState } from "react";
import { getLibraries } from "../../shared/services/api";
import { UserContext } from "../../App";

import Alert from "../../shared/components/alert";
import LinkButton from "../../shared/components/link-button";
import LibraryCard from "./parts/library-card";
import PublicLayout from "../../shared/layout/public-layout";

import "./libraries.css";
import { library } from "../../shared/resources/types";

const Libraries = () => {
  const userData = useContext(UserContext);
  const [libraries, setLibraries] = useState<library[]>();

  // Fetch Libraries
  useEffect(() => {
    getLibraries().then((items) => {
      setLibraries(items);
    });
  }, []);

  return (
    <PublicLayout activeLink='libraries'>
      <h2>Libraries</h2>
      <div className='layout-split'>
        <header className='library-header'>
          <p>
            Down below you can find all libraries that have been added to
            Project Cactus.
          </p>
          <Alert type='help'>
            <h3>Important Note</h3>
            <p>
              The accessibility scores do not neccessarily represent how
              accessible a finished webapplication using that library is. It
              only shows how good the baseline is it starts from, according to
              our criteria.
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
                  We are always looking for help. And you might be able to
                  improve this directory for yourself and for others.
                </p>
                <LinkButton
                  to='/contribute'
                  label='Find out how to contribute'
                />
              </>
            )}
          </Alert>
        </section>
      </div>
      <hr />
      <section className='library-list'>
        {libraries ? (
          libraries.length === 0 ? (
            <Alert message='Currently, there are no libraries.' />
          ) : (
            libraries.map((library: library) => (
              <LibraryCard key={library._id} library={library} />
            ))
          )
        ) : (
          <Alert message='Libraries are loading ...' />
        )}
      </section>
      <hr />
    </PublicLayout>
  );
};

export default Libraries;
