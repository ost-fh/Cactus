import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLibrary } from "../api";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";
import { library } from "../types";

const mocklibrary: library = {
  _id: "1",
  title: "Semantic-UI",
  componentsTested: 3,
  totalScore: 40,
  currentVersion: "3.5.1",
  //addedByUser: "mathiaslenz",
  linkDocs: "https://getbootstrap.com/docs/5.2/getting-started/introduction/",
  linkHome: "https://getbootstrap.com/",
  testsByVersion: [],
};

const LabLibraryDetail = ({ token }: any | undefined) => {
  const [library, setLibrary] = useState<library>();
  const { id } = useParams();

  useEffect(() => {
    if (id === "1") {
      setLibrary(mocklibrary);
    } else if (id) {
      getLibrary(id).then((lib) => {
        //console.log(lib);
        setLibrary(lib);
      });
    }
    return () => {};
  }, [id]);

  return (
    <div className='lib-detail'>
      {library ? (
        <>
          <header>
            <h1>{library.title}</h1>
            <div className='lib-score'>
              <ScoreBubble
                label='total accessibility score'
                score={library.totalScore || 0}
              />
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
                {token && (
                  <LinkButton
                    path={`/testlab/${library._id}/${library.currentVersion}`}
                    classname='button-primary'
                    label='Add Component Test'
                  />
                )}
                {/* <LinkButton path='' label='New Version' /> */}
              </div>
            </section>
            <section className='lib-testresults'>
              {library.testsByVersion.length !== 0 ? (
                library.testsByVersion.map((component: any) => (
                  <article className='lib-testresult'>
                    <header>
                      <h2>Component</h2>
                      <ScoreBubble score={component.score} />
                    </header>
                    <main>
                      <ul>
                        <li>Does that</li>
                        <li>Does this</li>
                        <li>Does not this</li>
                      </ul>
                    </main>
                  </article>
                ))
              ) : (
                <div className='alert-info'>
                  <p>There are currently no tests for this library.</p>
                </div>
              )}
            </section>
          </main>
        </>
      ) : (
        " "
      )}
    </div>
  );
};

export default LabLibraryDetail;
