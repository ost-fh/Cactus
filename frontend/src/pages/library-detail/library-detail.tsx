import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BsChevronDoubleRight, BsChevronLeft } from "react-icons/bs";

import { getAmountOfComponents, getLibrary } from "../../shared/services/api";
import { Library, Version } from "../../shared/resources/types";
import { UserContext } from "../../App";

import PublicLayout from "../../shared/layout/public-layout";
import ScoreBubble from "../../shared/components/score-bubble";
import LinkButton from "../../shared/components/link-button";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import LoadingSpinner from "../../shared/components/loading";

import AddVersion from "./parts/add-version";
import ComponentResult from "./parts/component-result";
import ScoringSystemLibraryDetail from "./parts/scoring-system";

import "./library-detail.scss";

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
  const [amountOfComponents, setAmountOfComponents] = useState<number>();

  useEffect(() => {
    getAmountOfComponents().then((data) => setAmountOfComponents(data));
  }, []);

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
          {pageLoadingState === state.loading && <LoadingSpinner />}
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
          <section className='layout-split'>
            <div className='infos'>
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
                <>
                  <LinkButton
                    to={`/testlab/${library?._id}/${version?.version}`}
                    className={`button-primary button-wide`}
                    icon={<BsChevronDoubleRight />}
                    iconPosition='right'
                    label='Add a Component Test'
                  />
                  <p>
                    {" "}
                    <small>
                      Your first component test will take about 10 minutes.
                      Further tests will take around 5 minutes or less.
                    </small>
                  </p>
                </>
              ) : (
                <Alert type='info'>
                  <h2>Would you like to help?</h2>
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
            <div className='infos'>
              {!version || version.components.length === 0 || (
                <ScoringSystemLibraryDetail />
              )}
            </div>
          </section>

          <section className='testresults'>
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

            {
              // CTA to test if not all components are recorded
              version &&
                amountOfComponents &&
                version.components.length > 0 &&
                version.components.length < amountOfComponents && (
                  // `${version.components.length} vs ${amountOfComponents}`
                  <Alert className='more-components-alert' type='help'>
                    <h2>There are more Components to test!</h2>
                    <p>
                      Currently there are {version.components.length} out of{" "}
                      {amountOfComponents} component types recorded.
                    </p>
                    {userData?.token ? (
                      <LinkButton
                        to={`/testlab/${library?._id}/${version?.version}`}
                        className='button-primary'
                        label='Add a Component Test'
                      />
                    ) : (
                      <LinkButton
                        to='/contribute'
                        label='Find out how to contribute'
                      />
                    )}
                  </Alert>
                )
            }
          </section>
        </>
      )}
    </PublicLayout>
  );
};

export default LibraryDetail;
