import React, { useEffect, useState } from "react";
import { getComponents, getLibraries } from "../../shared/services/api";

import Alert from "../../shared/components/alert";
import PublicLayout from "../../shared/layout/public-layout";

import "./libraries.css";
import { componentCriteria, library } from "../../shared/resources/types";
import Heading from "../../shared/components/heading";
import LibraryList from "./parts/library-list";
import LibrariesHeader from "./parts/libraries-header";
import Bubble from "../../shared/components/bubble";
import { BsCheckSquare, BsSquare } from "react-icons/bs";

const Libraries = () => {
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
      const onlyComponentName = items.map((item) => item.name);
      setComponents(onlyComponentName);
    });
  }, []);

  useEffect(() => {
    if (componentFilters.length === 0) {
      setFocusMode(false);
    }
  }, [componentFilters.length]);

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
      <LibrariesHeader />
      <hr />
      <form id='filters'>
        <label>
          Sort by:{" "}
          <select name='sorting' id=''>
            <option value='name'>Name</option>
            <option value='name'>Score</option>
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
                checked={
                  componentFilters.find((filter) => filter === component)
                    ? true
                    : false
                }
                name='filters'
                id=''
              />
              {component}
            </label>
          ))}
        <div className='spacer-flex'></div>
        {componentFilters.length > 0 && (
          <button
            type='button'
            onClick={() => {
              setComponentFilters([]);
            }}
          >
            Reset Filters
          </button>
        )}
        <button
          type='button'
          onClick={toggleFocusMode}
          disabled={componentFilters.length === 0}
          className='button button-primary button-with-icon'
        >
          {focusMode ? <BsCheckSquare /> : <BsSquare />}
          Focus Mode
        </button>
      </form>
      {focusMode && componentFilters.length > 0 && (
        <Alert type='help'>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "baseline",
              gap: "0.5rem",
              flexWrap: "wrap",
            }}
          >
            Focus mode calculates an additional{" "}
            <Bubble value='100%' color='blue' label={"Focus Score"} /> based on
            the selected components
          </div>
        </Alert>
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
