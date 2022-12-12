import React, { useEffect, useState } from "react";
import { getLibrary } from "../api";
import { library, testData } from "../types";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import SpecifyTest from "./SpecifyTest";
import TestForm from "./TestForm";
import TestLabLayout from "../layout/LabLayout";
import Start from "./Start";
import Confirmation from "./Confirmation";

const TestLab = () => {
  const { id, version } = useParams();
  const [library, setLibrary] = useState<library>();
  const [testData, setTestData] = useState<testData>({
    libraryId: id ? id : "0",
    libraryVersion: version ? version : "0",
    component: "",
    testMode: "",
  });

  useEffect(() => {
    if (id) {
      getLibrary(id).then((lib) => {
        setLibrary(lib);
      });
    }
    return () => {};
  }, [id]);

  return (
    <TestLabLayout
      libraryTitle={library?.title || "loading ..."}
      libraryVersion={testData.libraryVersion}
      component={testData.component}
      testmode={testData.testMode}
    >
      <Routes>
        <Route index element={<Navigate to='start' />}></Route>
        <Route path='start' element={<Start />} />
        <Route
          path='specify'
          element={
            <SpecifyTest testData={testData} setTestData={setTestData} />
          }
        />
        <Route
          path='test/'
          element={
            <TestForm
              testData={testData}
              linkDocs={library?.linkDocs || "error"}
            />
          }
        />
        <Route
          path='confirmation/'
          element={<Confirmation testData={testData} />}
        />
      </Routes>
    </TestLabLayout>
  );
};

export default TestLab;
