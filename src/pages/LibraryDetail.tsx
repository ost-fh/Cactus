import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";

const mocklibrary = {
  _id: "1",
  title: "Semantic-UI",
  componentsTested: 3,
  score: 40,
  version: "3.5.1",
  addedByUser: "mathiaslenz",
  linkDocs: "https://getbootstrap.com/docs/5.2/getting-started/introduction/",
  linkHome: "https://getbootstrap.com/",
  components: [{ score: 50 }, { score: 30 }, { score: 40 }],
};

const LabLibraryDetail = () => {
  const library = mocklibrary;
  return (
    <div className='lib-detail'>
      <header>
        <h1>{library.title}</h1>
        <div className='lib-score'>
          <ScoreBubble
            label='total accessibility score'
            score={library.score}
          />
        </div>
      </header>
      <main>
        <section className='lib-info'>
          <div className='lib-infos'>
            Version: {library.version}
            <a href={library.linkHome}>Homepage</a>
            <a href={library.linkDocs}>Documentation</a>
          </div>
          <div className='lib-controls'>
            <LinkButton
              path='/testlab/'
              classname='button-primary'
              label='Add Component Test'
            />
            {/* <LinkButton path='' label='New Version' /> */}
          </div>
        </section>
        <section className='lib-testresults'>
          {library.components.map((component) => (
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
          ))}
        </section>
      </main>
    </div>
  );
};

export default LabLibraryDetail;
