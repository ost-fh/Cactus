import React, { useEffect, useState } from "react";
import { getLibraries } from "../api";
import Alert from "../components/Alert";
import CountBubble from "../components/CountBubble";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";
import PublicLayout from "../layout/PublicLayout";

const Libraries = ({ token }: any | undefined) => {
  const [libraries, setLibraries] = useState<any>();

  useEffect(() => {
    getLibraries().then((items) => {
      setLibraries(items);
    });
    return () => {};
  }, []);

  return (
    <PublicLayout activeLink='libraries'>
      <h2>Libraries</h2>
      <nav>Search and Filters</nav>{" "}
      {token && (
        <LinkButton path='new' label='Add Library' classname='button-primary' />
      )}
      <section className='library-list'>
        {libraries ? (
          libraries.map((library: any) => (
            <article id={library._id.toString()} className='library-card'>
              <header>{library.title} </header>
              <main>
                <ScoreBubble score={library.totalScore || 0} />
                <CountBubble count={library.componentsTested || 0} />
              </main>
              <aside>
                <LinkButton
                  path={library._id}
                  classname='button-wide'
                  label='Show More'
                />
              </aside>
            </article>
          ))
        ) : (
          <Alert message='Libraries are loading ...' />
        )}
      </section>
    </PublicLayout>
  );
};

export default Libraries;
