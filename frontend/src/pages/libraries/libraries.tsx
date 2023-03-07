import React, { useContext, useEffect, useState } from "react";
import { getComponents, getLibraries } from "../../shared/services/api";
import { UserContext } from "../../App";

import Alert from "../../shared/components/alert";
import LinkButton from "../../shared/components/link-button";
import LibraryCard from "./parts/library-card";
import PublicLayout from "../../shared/layout/public-layout";

import "./libraries.css";
import {
  component,
  componentCriteria,
  library,
} from "../../shared/resources/types";
import Heading from "../../shared/components/heading";
import LibraryList from "./parts/library-list";

const Libraries = () => {
  const userData = useContext(UserContext);
  const [libraries, setLibraries] = useState<library[]>();
  const [components, setComponents] = useState<string[]>();
  const [focusMode, setFocusMode] = useState(false);
  const [componentFilters, setComponentFilters] = useState<string[]>([]);

  // Fetch Libraries
  useEffect(() => {
    getLibraries().then((items) => {
      setLibraries(items);
    });
  }, []);

  useEffect(() => {
    getComponents().then((items: componentCriteria[]) => {
      const onlyComponents = items.map((item) => item.name);
      setComponents(onlyComponents);
    });
  }, []);

  const toggleFocusMode = () => {
    setFocusMode(!focusMode);
  };

  // removes and adds components to filter
  const changeComponentFilter = (componentName: string) => {
    if (componentFilters.find((component) => component === componentName)) {
      const newFilters = componentFilters.filter(
        (component) => component !== componentName
      );
      setComponentFilters(newFilters);
    } else {
      setComponentFilters([...componentFilters, componentName]);
    }
  };

  // function to filter the libraries

  return (
    <PublicLayout activeLink='libraries'>
      <Heading>Libraries</Heading>
      <div className='layout-split'>
        <header className='library-header'>
          <p>
            Down below you can find all libraries that have been added to
            Project Cactus.
          </p>
          <Alert type='help'>
            <h3>Important Note</h3>
            <p>
              The accessibility scores do not neccessarily represent how
              accessible a finished webapplication using that library is. It
              only shows how good the baseline is it starts from, according to
              our criteria.
            </p>
          </Alert>
        </header>
        <section>
          <Alert type='info'>
            <h3>Do you miss a UI library?</h3>
            {userData?.token ? (
              <>
                <p>
                  Add a library, after that test its components to immediatly
                  compare it to other libraries:
                </p>
                <LinkButton
                  to='new'
                  label='Add a new library'
                  className='button-primary'
                />
              </>
            ) : (
              <>
                <p>
                  We are always looking for help. And you might be able to
                  improve this directory for yourself and for others.
                </p>
                <LinkButton
                  to='/contribute'
                  label='Find out how to contribute'
                />
              </>
            )}
          </Alert>
        </section>
      </div>
      <hr />
      <form id='filters'>
        <label>
          Sort by{" "}
          <select name='sorting' id=''>
            <option value='name'>name</option>
            <option value='name'>score</option>
          </select>
        </label>
        <div className='spacer'></div>
        <label htmlFor='filters'>Filter by components: </label>
        {components &&
          components.map((component) => (
            <label key={component}>
              <input
                type='checkbox'
                onChange={() => changeComponentFilter(component)}
                name='filters'
                id=''
              />
              {component}
            </label>
          ))}
        <div className='spacer-flex'></div>
        <label className='button button-primary'>
          <input
            type='checkbox'
            checked={focusMode}
            onChange={toggleFocusMode}
          />
          Focus Mode
        </label>
      </form>
      {focusMode && (
        <Alert
          type='help'
          message='Focus mode calculates an additional score based on the selected components.'
        />
      )}
      <hr />
      {!libraries ? (
        <Alert message='Libraries are loading ...' />
      ) : libraries.length === 0 ? (
        <Alert message='Currently, there are no libraries.' />
      ) : (
        <LibraryList
          libraries={libraries}
          sorting={""}
          filters={componentFilters}
          focusMode={focusMode}
        />
      )}

      <hr />
    </PublicLayout>
  );
};

export default Libraries;
