import React from "react";
import { Link } from "react-router-dom";
import LinkButton from "../components/LinkButton";

const LabOverview = () => {
  return (
    <div>
      Page: LabOverview
      <nav>Search and Filters</nav>
      <Link to='1'>Detail</Link>
      <section className='lab-library-list'>
        <article className='lab-library-card'>
          <header>Libraryname</header>
          <main>General Score</main>
          <aside>
            <LinkButton path='1' label='Show More' />
          </aside>
        </article>
        <article className='lab-library-card'>
          <header>Libraryname</header>
          <main>General Score</main>
          <aside>
            <LinkButton path='1' label='Show More' />
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

export default LabOverview;
