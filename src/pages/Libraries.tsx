import React from "react";
import { Link } from "react-router-dom";
import CountBubble from "../components/CountBubble";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";

const mocklibs = [
  {
    _id: "1",
    title: "Semantic-UI",
    componentsTested: 3,
    score: 40,
  },
  {
    _id: "2",
    title: "Example-UI",
    componentsTested: 5,
    score: 85,
  },
  {
    _id: "3",
    title: "Material-UI",
    componentsTested: 9,
    score: 100,
  },
];

const Libraries = () => {
  return (
    <div>
      Page: Overview
      <nav>Search and Filters</nav>{" "}
      <LinkButton path='new' label='Add Library' classname='button-primary' />
      <section className='library-list'>
        {mocklibs.map((library) => (
          <article id={library._id.toString()} className='library-card'>
            <header>{library.title} </header>
            <main>
              <ScoreBubble score={library.score} />
              <CountBubble count={library.componentsTested} />
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
