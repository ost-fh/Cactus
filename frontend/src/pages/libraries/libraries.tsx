import React, { useEffect, useState } from "react";
import { getComponentCriteria, getLibraries } from "../../shared/services/api";

import Alert from "../../shared/components/alert";
import PublicLayout from "../../shared/layout/public-layout";

import "./libraries.scss";
import { ComponentCriteria, Library } from "../../shared/resources/types";
import Heading from "../../shared/components/heading";
import LibraryList from "./parts/library-list";
import LibrariesHeader from "./parts/libraries-header";
import Bubble from "../../shared/components/bubble";

const Libraries = () => {
  const [libraries, setLibraries] = useState<Library[]>();
  const [components, setComponents] = useState<string[]>();
  const [componentFilters, setComponentFilters] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<string>("score");

  // Fetch Libraries
  useEffect(() => {
    getLibraries().then((items) => {
      setLibraries(items);
    });
  }, []);

  // get all component names
  useEffect(() => {
    getComponentCriteria().then((items: ComponentCriteria[]) => {
      const onlyComponentName = items.map((item) => item.name);
      setComponents(onlyComponentName);
    });
  }, []);

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

  return (
    <PublicLayout activeLink='libraries'>
      <Heading>Libraries</Heading>
      <LibrariesHeader />
      <hr />
      <form id='filters'>
        <div className='filter-group'>
          <label htmlFor='sorting'>Sort by: </label>
          <select
            name='sorting'
            id='sorting'
            onChange={(e) => {
              setSortBy(e.target.value);
            }}
            defaultValue={sortBy}
          >
            <option value='score'>Score</option>
            <option value='name'>Name</option>
          </select>
        </div>
        <div className='filter-group'>
          <label htmlFor='filters'>Evaluate by components: </label>
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
        </div>
        <button
          disabled={componentFilters.length <= 0}
          // style={{
          //   visibility: `${
          //     componentFilters.length > 0 ? "visible" : "hidden"
          //   }`,
          // }}
          type='button'
          onClick={() => {
            setComponentFilters([]);
          }}
        >
          Reset Selection
        </button>
        {/* <div className='spacer'></div> */}
      </form>
      {componentFilters.length < 0 && (
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
            A distinct{" "}
            <Bubble value='100%' color='blue' label={"Focus Score"} /> is
            calculated based on the selected components.
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
          sortBy={sortBy}
          filters={componentFilters}
        />
      )}
    </PublicLayout>
  );
};

export default Libraries;
