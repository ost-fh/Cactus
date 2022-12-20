import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLibrary } from "../services/api";
import { UserContext } from "../App";
import ComponentResult from "../components/ComponentResult";
import LinkButton from "../components/LinkButton";
import PublicLayout from "../layout/PublicLayout";
import { component, library } from "../types";
import "./librarydetail.css";
import ScoreBubble from "../components/ScoreBubble";
import Alert from "../components/Alert";

const LibraryDetail = () => {
  const userData = useContext(UserContext);
  const [library, setLibrary] = useState<library>();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getLibrary(id).then((library) => {
        setLibrary(library);
      });
    }
    return () => {};
  }, [id]);

  return (
    <PublicLayout>
      <div className='lib-detail'>
        {library ? (
          <>
            <header>
              <h1>{library.title}</h1>
              <div className='lib-score'>
                {library.versions.length !== 0 && (
                  <ScoreBubble
                    label='total accessibility score'
                    score={library.versions[0].accessibilityScore || 0}
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
                      label='Add Component Test'
                    />
                  )}
                  {/* <LinkButton path='' label='New Version' /> */}
                </div>
              </section>
              <section className='lib-testresults'>
                {library.versions.length !== 0 ? (
                  library.versions.map((version: any) => (
                    <>
                      {/* <h3>{version.version}</h3> */}
                      {version.components.map((component: component) => (
                        <ComponentResult
                          key={component.name}
                          component={component}
                        />
                      ))}
                    </>
                  ))
                ) : (
                  <Alert message='There are currently no tests for this library.' />
                )}
              </section>
            </main>
          </>
        ) : (
          <div className='alert-info'>Library not found.</div>
        )}
      </div>
    </PublicLayout>
  );
};

export default LibraryDetail;
