import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";

const exampleLib = {
  title: "Semantic-UI",
  score: "85",
  path: "1",
};

const Libraries = () => {
  return (
    <div>
      Page: Overview
      <nav>Search and Filters</nav>
      <Link to='1'>Detail</Link>
      <section className='lab-library-list'>
        <article className='lab-library-card'>
          <header>Libraryname</header>
          <main>
            <ScoreBubble score='85' />
          </main>
          <aside>
            <LinkButton path='1' classname='button-wide' label='Show More' />
          </aside>
        </article>
        <article className='lab-library-card'>
          <header>Libraryname</header>
          <main>General Score</main>
          <aside>
            <button className='button-primary'>Test</button>

            <LinkButton path='1' classname='button-wide' label='Show More' />
          </aside>
        </article>
        <article className='lab-library-card'>
          <header>Libraryname</header>
          <main>General Score</main>
          <aside>
            <LinkButton path='1' label='Show More' />
          </aside>
        </article>
      </section>
    </div>
  );
};

export default Libraries;
