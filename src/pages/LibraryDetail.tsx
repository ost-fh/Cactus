import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLibrary } from "../services/api";
import { UserContext } from "../App";

import ComponentResult from "../components/ComponentResult";
import LinkButton from "../components/LinkButton";
import PublicLayout from "../layout/PublicLayout";
import ScoreBubble from "../components/ScoreBubble";
import Alert from "../components/Alert";

import { component, library, version } from "../types";
import "./librarydetail.css";

const LibraryDetail = () => {
  const userData = useContext(UserContext);
  const [library, setLibrary] = useState<library>();
  const { id } = useParams();
  const [version, setVersion] = useState<version | undefined>(undefined);

  useEffect(() => {
    if (id) {
      getLibrary(id).then((library: library) => {
        setLibrary(library);
        setVersion(
          library.versions.find(
            (version) => library.currentVersion === version.version
          )
        );
      });
    }
    return () => {};
  });

  // const changeVersion = () => {}

  return (
    <PublicLayout>
      <div className='lib-detail'>
        {library ? (
          <>
            <header>
              <h1>{library.title}</h1>
              <div className='lib-score'>
                {version?.accessibilityScore && (
                  <ScoreBubble
                    label='total accessibility score'
                    score={version.accessibilityScore}
                  />
                )}
              </div>
            </header>
            <main>
              <section className='lib-info'>
                <div className='lib-infos'>
                  Version: {library.currentVersion}
                  <a href={library.linkHome}>Homepage</a>
                  <a href={library.linkDocs}>Documentation</a>
                </div>
                <div className='lib-controls'>
                  {userData?.token && (
                    <LinkButton
                      to={`/testlab/${library._id}/${library.currentVersion}`}
                      className='button-primary button-wide'
                      label='Add a Component Test'
                    />
                  )}
                  {version && (
                    <Alert type='help'>
                      <h3>What do these numbers mean?</h3>
                      <p>
                        <strong>Accessibility Score:</strong> This is an average
                        score over all the tests that were made for a component
                        or library. It gives an idea, how good a library
                        performs in terms of accessibility
                      </p>
                      <p>
                        <strong>Agreement Score:</strong> This number between 0
                        and 1 displays, how much different testers agree with
                        each other. A number closer to 1 is better.
                      </p>
                    </Alert>
                  )}
                  {/* <LinkButton path='' label='New Version' /> */}
                </div>
              </section>

              <section className='lib-testresults'>
                {!version || version.components.length === 0 ? (
                  <Alert message='There are currently no component testresults for this library.' />
                ) : (
                  version.components.map((component: component) => (
                    <ComponentResult
                      key={component.name}
                      component={component}
                    />
                  ))
                )}
              </section>
            </main>
          </>
        ) : (
          <Alert>Library not found.</Alert>
        )}
      </div>
    </PublicLayout>
  );
};

export default LibraryDetail;
