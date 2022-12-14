import React, { useContext, useEffect, useState } from "react";
import { getLibraries } from "../services/api";
import { UserContext } from "../App";
import Alert from "../components/Alert";
import CountBubble from "../components/CountBubble";
import LinkButton from "../components/LinkButton";
import ScoreBubble from "../components/ScoreBubble";
import PublicLayout from "../layout/PublicLayout";
import "./libraries.css";

const Libraries = () => {
  const userData = useContext(UserContext);
  const [libraries, setLibraries] = useState<any>();

  // Fetch Libraries
  useEffect(() => {
    getLibraries().then((items) => {
      setLibraries(items);
    });
    return () => {};
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
        <nav>ToDo: Search and Filters and Sorting </nav>{" "}
        {userData?.token && (
          <LinkButton to='new' label='Add Library' className='button-primary' />
        )}
      </header>
      <section className='library-list'>
        {libraries ? (
          libraries.map((library: any) => (
            <article key={library._id.toString()} className='library-card'>
              <header>{library.title} </header>
              <div className='library-card-main'>
                <ScoreBubble
                  score={library.versions[0].accessibilityScore || 0}
                />
                <CountBubble
                  count={library.versions[0].amountOfComponentsTested || 0}
                />
              </div>
              <div className='library-card-aside'>
                <LinkButton
                  to={library._id}
                  className='button-wide'
                  label='Show More'
                />
              </div>
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
