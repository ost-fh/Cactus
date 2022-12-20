import React, { useContext, useEffect, useState } from "react";
import { getLibraries } from "../services/api";
import { UserContext } from "../App";
import Alert from "../components/Alert";
import CountBubble from "../components/CountBubble";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";
import PublicLayout from "../layout/PublicLayout";
import "./libraries.css";
import { library } from "../types";
import LibraryCard from "../components/LibraryCard";

const Libraries = () => {
  const userData = useContext(UserContext);
  const [libraries, setLibraries] = useState<library[]>();

  // Fetch Libraries
  useEffect(() => {
    getLibraries().then((items) => {
      setLibraries(items);
    });
  }, []);

  return (
    <PublicLayout activeLink='libraries'>
      <header className='library-header'>
        <h2>Libraries</h2>
        <Alert
          type='help'
          title='Remember:'
          message={
            "The accessibility scores do not neccessarily represent how accessible a finished product using that library is. It only shows how good the baseline is it starts from."
          }
        />
        {/* <nav>ToDo: Search and Filters and Sorting </nav> */}
        <aside className='library-add-library'>
          <h3>Do you miss a UI Library?</h3>
          {userData?.token ? (
            <LinkButton
              to='new'
              label='Add a new library'
              className='button-primary'
            />
          ) : (
            <>
              <p>
                We are always looking for help. And you might be able to improve
                this directory for yourself and for others.
              </p>
              <LinkButton to='/contribute' label='Find out how to contribute' />
            </>
          )}
        </aside>
      </header>
      <section className='library-list'>
        {libraries ? (
          libraries.length === 0 ? (
            <Alert message='Currently, there are no libraries.' />
          ) : (
            libraries.map((library: library) => (
              <LibraryCard key={library._id} library={library} />
            ))
          )
        ) : (
          <Alert message='Libraries are loading ...' />
        )}
      </section>
    </PublicLayout>
  );
};

export default Libraries;
