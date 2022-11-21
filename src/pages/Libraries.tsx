import React, { useEffect, useState } from "react";
import { getLibraries } from "../api";
import CountBubble from "../components/CountBubble";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";

const mocklibs = [
  {
    _id: "1",
    title: "Semantic-UI",
    componentsTested: 3,
    totalScore: 40,
  },
  {
    _id: "2",
    title: "Example-UI",
    componentsTested: 5,
    totalScore: 85,
  },
  {
    _id: "3",
    title: "Material-UI",
    componentsTested: 9,
    totalScore: 100,
  },
];

const Libraries = ({ token }: any | undefined) => {
  const [libraries, setLibraries] = useState<any>();

  useEffect(() => {
    getLibraries().then((items) => {
      //console.log(items);
      setLibraries(items);
    });
    return () => {};
  }, []);

  return (
    <div>
      <h2>Libraries</h2>
      <nav>Search and Filters</nav>{" "}
      {token && (
        <LinkButton path='new' label='Add Library' classname='button-primary' />
      )}
      <section className='library-list'>
        {libraries &&
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
          ))}
      </section>
    </div>
  );
};

export default Libraries;
