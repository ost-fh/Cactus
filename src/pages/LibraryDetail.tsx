import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";

const LabLibraryDetail = () => {
  const library = {};
  return (
    <div className='lib-detail'>
      <header>
        <h1>Libname</h1>
        <div className='lib-score'>
          Total Score:
          <ScoreBubble score='85' />
        </div>
      </header>
      <main>
        <section className='lib-info'>
          <div className='lib-infos'>
            Version: 5.2
            <a href='https://getbootstrap.com/'>Homepage</a>
            <a href='https://getbootstrap.com/docs/5.2/getting-started/introduction/'>
              Documentation
            </a>
          </div>
          <div className='lib-controls'>
            <LinkButton
              path='/testlab/'
              classname='button-primary'
              label='Tests ergänzen'
            />
            <LinkButton path='' label='New Version' />
          </div>
        </section>
        <section className='lib-testresults'>
          <article className='lib-testresult'>
            <header>
              <h2>Component</h2>
              <ScoreBubble score='60' />
            </header>
            <main>
              <ul>
                <li>Does that</li>
                <li>Does this</li>
                <li>Does not this</li>
              </ul>
            </main>
          </article>
          <article className='lib-testresult'>
            <header>
              <h2>Component</h2>
              <ScoreBubble score='60' />
            </header>
            <main>
              <ul>
                <li>Does that</li>
                <li>Does this</li>
                <li>Does not this</li>
              </ul>
            </main>
          </article>
          <article className='lib-testresult'>
            <header>
              <h2>Component</h2>
              <ScoreBubble score='60' />
            </header>
            <main>
              <ul>
                <li>Does that</li>
                <li>Does this</li>
                <li>Does not this</li>
              </ul>
            </main>
          </article>
        </section>
      </main>
    </div>
  );
};

export default LabLibraryDetail;
