import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

import { getLibrary } from "../../shared/services/api";
import { Library, Version } from "../../shared/resources/types";
import { UserContext } from "../../App";

import PublicLayout from "../../shared/layout/public-layout";
import ScoreBubble from "../../shared/components/score-bubble";
import LinkButton from "../../shared/components/link-button";
import Alert from "../../shared/components/alert";

import AddVersion from "./parts/add-version";
import ComponentResult from "./parts/component-result";

import "./library-detail.scss";
import CountBubble from "../../shared/components/count-bubble";
import ResultBubble from "../../shared/components/result-bubble";
import Heading from "../../shared/components/heading";
import { BsChevronLeft } from "react-icons/bs";

export const SHOW_AGREEMENT_SCORE = false;

const LibraryDetail = () => {
  const navigate = useNavigate();
  const { paramsId, paramsVersion } = useParams();
  const userData = useContext(UserContext);

  enum state {
    new,
    loading,
    success,
    error,
  }
  const [pageLoadingState, setPageLoadingState] = useState<state>(state.new);

  const [library, setLibrary] = useState<Library>();
  const [version, setVersion] = useState<Version | undefined>();

  const changeVersion = (newVersion: string) => {
    navigate(`/libraries/${library?._id}/${newVersion}`, { replace: true });
  };

  // load library
  useEffect(() => {
    if (paramsId && !library) {
      setPageLoadingState(state.loading);
      getLibrary(paramsId)
        .then((library: Library) => {
          setPageLoadingState(state.success);
          setLibrary(library);
        })
        .catch(() => {
          setPageLoadingState(state.error);
        });
    }
  }, [paramsId, library, state.error, state.loading, state.success]);

  useEffect(() => {
    if (library) {
      // if no version from param, navigate to current version
      if (paramsVersion === undefined) {
        navigate(`/libraries/${library?._id}/${library?.currentVersion}`, {
          replace: true,
        });
      }

      // a new version requires a reload of the library
      if (
        library.versions.find(
          (version) => version.version === paramsVersion
        ) === undefined
      ) {
        setLibrary(undefined);
      }
    }
  }, [library, navigate, paramsVersion]);

  // updates version when paramsVersion changes
  useEffect(() => {
    if (library) {
      setVersion(
        library.versions.find((version) => version.version === paramsVersion)
      );
    }
  }, [library, paramsVersion]);

  const handleChangeVersion = (event: React.ChangeEvent<HTMLSelectElement>) => {
    changeVersion(event.target.value);
  };

  return (
    <PublicLayout className='library-detail' activeLink='libraries'>
      {!library ? (
        <>
          {pageLoadingState === state.loading && (
            <Alert message='Library is loading ...' />
          )}
          {pageLoadingState === state.error && (
            <Alert type='error' message='Library not found.'></Alert>
          )}
        </>
      ) : (
        <>
          <div className='backnav'>
            <Link to='/libraries'>
              <BsChevronLeft /> Return to Library Overview
            </Link>{" "}
          </div>
          <header className='header'>
            <Heading>{library.title}</Heading>
            <div>
              {version?.accessibilityScore !== undefined && (
                <ScoreBubble
                  label='Library Cactus Score'
                  score={version.accessibilityScore}
                />
              )}
            </div>
          </header>
          <section className='lib-info layout-split'>
            <div className='lib-infos'>
              <a href={library.linkHome} target='_blank' rel='noreferrer'>
                Homepage (opens in new Tab)
              </a>
              <a href={library.linkDocs} target='_blank' rel='noreferrer'>
                Documentation (opens in new Tab)
              </a>
              <label>
                Version:{" "}
                <select
                  onChange={(e) => handleChangeVersion(e)}
                  disabled={library.versions.length === 1}
                  value={paramsVersion || library.currentVersion}
                >
                  {library.versions.map((version) => (
                    <option key={version.version} value={version.version}>
                      {version.version}
                    </option>
                  ))}
                </select>
              </label>
              {userData?.token && paramsId && (
                <AddVersion
                  changeVersion={changeVersion}
                  libraryId={paramsId}
                />
              )}
              {userData?.token ? (
                <LinkButton
                  to={`/testlab/${library?._id}/${version?.version}`}
                  className='button-primary button-wide'
                  label='Add a Component Test'
                />
              ) : (
                <Alert type='info'>
                  <h3>Would you like to help?</h3>
                  <p>
                    You can review components yourself and help us to improve
                    the quality of the scores
                  </p>
                  <LinkButton
                    to='/contribute'
                    label='Find out how to contribute'
                  />
                </Alert>
              )}
            </div>
            <div className='lib-infos'>
              {!version || version.components.length === 0 || (
                <Alert type='help'>
                  <h3>Scoring System</h3>
                  <div className='lib-detail-help'>
                    <ScoreBubble label='Cactus Score (example)' score={100} />
                    <p>
                      This is an average score over all the tests that were made
                      for a component, testmode or library. It gives an idea
                      about how good a library performs in terms of
                      accessibility.
                    </p>

                    <ResultBubble positive={4} negative={0} not_decided={0} />
                    <p>
                      This shows how many testers voted if a criterium was
                      fullfilled, not fulfilled or not decidable. (exemplary
                      numbers used)
                    </p>
                    {SHOW_AGREEMENT_SCORE && (
                      <>
                        <CountBubble
                          label='Agreement Score (example)'
                          count={1}
                        />
                        <p>
                          This number between 0 and 1 shows how much different
                          testers agree with each other. A number closer to 1 is
                          better.
                        </p>
                      </>
                    )}
                  </div>
                </Alert>
              )}
            </div>
          </section>

          <section className='lib-testresults'>
            {!version || version.components.length === 0 ? (
              <Alert message='There are currently no component testresults for this library.' />
            ) : (
              version.components.map((component) => (
                <ComponentResult
                  testlabComponentURL={`/testlab/${library?._id}/${version?.version}`}
                  key={component.name}
                  component={component}
                />
              ))
            )}
          </section>
        </>
      )}
    </PublicLayout>
  );
};

export default LibraryDetail;
