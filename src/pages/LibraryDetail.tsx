import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getLibrary } from "../api";
import ComponentResult from "../components/ComponentResult";
import LinkButton from "../components/LinkButton";
import PublicLayout from "../layout/PublicLayout";
import { library } from "../types";

const LabLibraryDetail = ({ token }: any | undefined) => {
  const [library, setLibrary] = useState<library>();
  const { id } = useParams();
  const [scores, setScores] = useState<number[]>([]);
  const [score, setScore] = useState<number>();

  useEffect(() => {
    if (id) {
      getLibrary(id).then((lib) => {
        console.log(lib);
        setLibrary(lib);
      });
    }
    return () => {};
  }, [id]);

  useEffect(() => {
    let sum = 0;
    console.log(scores);

    for (let score of scores) {
      console.log(score);

      sum += score;
    }
    const average = sum / scores.length;
    setScore(average);
  }, [scores]);

  const addScore = (number: number) => {
    setScores([...scores, number]);
  };

  return (
    <PublicLayout>
      <div className='lib-detail'>
        {library ? (
          <>
            <header>
              <h1>{library.title}</h1>
              {/* <div className='lib-score'>
              <ScoreBubble
                label='total accessibility score'
                score={score || 0}
              />
            </div> */}
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
                      to={`/testlab/${library._id}/${library.currentVersion}`}
                      className='button-primary'
                      label='Add Component Test'
                    />
                  )}
                  {/* <LinkButton path='' label='New Version' /> */}
                </div>
              </section>
              <section className='lib-testresults'>
                {library.testsByVersion.length !== 0 ? (
                  library.testsByVersion.map((version: any) => (
                    <>
                      <h3>{version.version}</h3>
                      {version.components.map((component: any) => (
                        <ComponentResult
                          addScore={addScore}
                          component={component}
                        />
                      ))}
                    </>
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
          <div className='alert-info'>Library not found.</div>
        )}
      </div>
    </PublicLayout>
  );
};

export default LabLibraryDetail;
