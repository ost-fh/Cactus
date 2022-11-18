import React, { useEffect, useState } from "react";
import { Link, Outlet, Route, Routes, useParams } from "react-router-dom";
import { getLibrary } from "../api";
import { criteriaCatalogue, criteriaGroup, library, testData } from "../types";
import Instructions from "./Instructions";
import Outcome from "./Outcome";
import Start from "./Start";
import Test from "./Test";

const TestLabLayout = () => {
  const { id, version } = useParams();
  // console.log(id, version);
  const importedcriteriaCatalogue = criteriaCatalogue;
  const [library, setLibrary] = useState<library>();
  //const [criteriaGroup, setCriteriaGroup] = useState<criteriaGroup>();

  const [testData, setTestData] = useState<testData>({
    libraryId: id ? id : "0",
    libraryVersion: version ? version : "0",
    component: "",
    testMode: "",
    criteriaGroup: undefined,
  });

  useEffect(() => {
    if (testData.criteriaGroup === undefined) {
      const component = importedcriteriaCatalogue.find(
        (element) => testData.component === element.component
      );
      console.log(component);
      const testCriteria = component?.criteria.find(
        (element) => testData.testMode === element.testMode
      );
      if (testCriteria) {
        setTestData({ ...testData, criteriaGroup: testCriteria });
        console.log(testCriteria);
      } else {
        console.error("Failed to find testcriteria");
      }
    }

    return () => {};
  }, [importedcriteriaCatalogue, testData]);

  useEffect(() => {
    if (id) {
      getLibrary(id).then((lib) => {
        //console.log(lib);
        setLibrary(lib);
      });
    }

    return () => {};
  }, [id]);

  return (
    <div className='container'>
      <header className='page-header page-header-testlab'>
        <img className='logo' alt='logo' src='/cactus_logo.png' />
        <h1>Cactus Testlab</h1>
      </header>
      <main>
        <header>
          {library && (
            <ul>
              <li>Library: {library.title}</li>
              <li>Version: {testData.libraryVersion} </li>
            </ul>
          )}
        </header>
        <Routes>
          <Route
            index
            element={<Start testData={testData} setTestData={setTestData} />}
          />
          <Route
            path='instructions/'
            element={<Instructions testData={testData} />}
          />
          <Route path='test/' element={<Test testData={testData} />} />
          <Route path='outcome/' element={<Outcome />} />
        </Routes>
      </main>
    </div>
  );
};

export default TestLabLayout;
