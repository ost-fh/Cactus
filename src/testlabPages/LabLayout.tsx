import React, { useEffect, useState } from "react";
import { Route, Routes, useParams } from "react-router-dom";
import { getLibrary } from "../api";
import { criteriaCatalogue, library, testData } from "../types";
import Instructions from "./Instructions";
import Outcome from "./Outcome";
import Start from "./Start";
import Test from "./Test";

const TestLabLayout = () => {
  const { id, version } = useParams();
  // console.log(id, version);
  const importedcriteriaCatalogue = criteriaCatalogue;

  const [library, setLibrary] = useState<library>();
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
      <header className='page-header'>
        <img className='logo' alt='logo' src='/cactus_logo.png' />
        <h1>Cactus Testlab</h1>
        {library && (
          <div>
            <p>Library: {library.title}</p>
            <p>Version: {testData.libraryVersion} </p>
          </div>
        )}
      </header>
      <main>
        <header className='testlab-libraryinfos'></header>
        <Routes>
          <Route
            index
            element={<Start testData={testData} setTestData={setTestData} />}
          />
          <Route
            path='instructions/'
            element={<Instructions linkDocs={library?.linkDocs || "error"} />}
          />
          <Route
            path='test/'
            element={
              <Test
                testData={testData}
                linkDocs={library?.linkDocs || "error"}
              />
            }
          />
          <Route path='outcome/' element={<Outcome testData={testData} />} />
        </Routes>
      </main>
    </div>
  );
};

export default TestLabLayout;
