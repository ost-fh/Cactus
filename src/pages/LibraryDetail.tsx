import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getLibrary } from "../services/api";
import { UserContext } from "../App";

import ComponentResult from "../components/ComponentResult";
import LinkButton from "../components/LinkButton";
import PublicLayout from "../layout/PublicLayout";
import ScoreBubble from "../components/ScoreBubble";
import Alert from "../components/Alert";

import { component, library, version } from "../types";
import "./librarydetail.css";
import AddVersion from "../components/AddVersion";
import { BsBoxArrowUpRight } from "react-icons/bs";

const LibraryDetail = () => {
  const { id, paramVersion } = useParams();
  const navigate = useNavigate();

  const userData = useContext(UserContext);
  enum state {
    new,
    loading,
    success,
    error,
  }
  const [pageLoadingState, setPageLoadingState] = useState<state>(state.new);

  const [library, setLibrary] = useState<library>();
  const [version, setVersion] = useState<version | undefined>(undefined);

  const changeVersion = (newVersion: string) => {
    if (library) {
      setVersion(
        library.versions.find((version) => version.version === newVersion)
      );
      navigate(`/libraries/${library._id}/${newVersion}`, { replace: true });
    }
  };

  useEffect(() => {
    if (id && !library) {
      setPageLoadingState(state.loading);
      getLibrary(id)
        .then((library: library) => {
          setPageLoadingState(state.success);
          setLibrary(library);
        })
        .catch(() => {
          setPageLoadingState(state.error);
        });
    }
  }, [id, library, state.error, state.loading, state.success]);

  useEffect(() => {
    if (library) {
      if (version === undefined) {
        if (paramVersion === undefined) {
          changeVersion(library.currentVersion);
        } else {
          changeVersion(paramVersion);
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [library, paramVersion, version]);

  const handleChangeVersion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeVersion(event.target.value);
  };

  return (
    <PublicLayout>
      <div className='lib-detail'>
        {library && (
          <>
            <header>
              <h1>{library.title}</h1>
              <div className='lib-score'>
                {version?.accessibilityScore !== undefined && (
                  <ScoreBubble
                    label='total accessibility score'
                    score={version.accessibilityScore}
                  />
                )}
              </div>
            </header>
            <main>
              <section className='lib-info layout-split'>
                <div className='lib-infos'>
                  <a href={library.linkHome}>Homepage</a>
                  <a href={library.linkDocs}>Documentation</a>
                  <label>
                    Version:{" "}
                    <select
                      onChange={(e) => handleChangeVersion(e)}
                      disabled={library.versions.length === 1}
                      value={version?.version || library.currentVersion}
                    >
                      {library.versions.map((version) => (
                        <option key={version.version} value={version.version}>
                          {version.version}
                        </option>
                      ))}
                    </select>
                  </label>
                  {userData?.token && (
                    <AddVersion
                      changeVersion={changeVersion}
                      libraryId={library._id}
                    />
                  )}
                </div>
                <div className='lib-controls'>
                  {userData?.token ? (
                    <LinkButton
                      to={`/testlab/${library._id}/${version?.version}`}
                      className='button-primary button-wide'
                      label='Add a Component Test'
                      icon={<BsBoxArrowUpRight />}
                    />
                  ) : (
                    <Alert type='info'>
                      <h3>Looking to contribute?</h3>
                      <p>
                        You can review components yourself and help us to
                        improve this library
                      </p>
                      <LinkButton
                        to='/contribute'
                        label='Find out how to contribute'
                      />
                    </Alert>
                  )}

                  {!version || version.components.length === 0 || (
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
        )}
        {pageLoadingState === state.loading && (
          <Alert>Library loading...</Alert>
        )}
        {pageLoadingState === state.error && (
          <Alert type='error'>Library not found.</Alert>
        )}
      </div>
    </PublicLayout>
  );
};

export default LibraryDetail;
