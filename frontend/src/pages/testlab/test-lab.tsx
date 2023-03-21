import React, { useEffect, useState } from "react";
import { getLibrary } from "../../shared/services/api";
import {
  getComponent,
  getVersion,
  library,
  testData,
} from "../../shared/resources/types";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import SpecifyTest from "./parts/specify-test";
import TestForm from "./parts/test-form";
import TestLabLayout from "./layout/lab-layout";
import Confirmation from "./parts/confirmation";
import Preparation from "./parts/preparation";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import {
  browserName,
  browserVersion,
  osName,
  osVersion,
} from "react-device-detect";
import Exclude from "./parts/exclude";

const TestLab = () => {
  const { id, version } = useParams();
  const [library, setLibrary] = useState<library>();
  const [testData, setTestData] = useState<testData>({
    libraryId: id ? id : "0",
    libraryVersion: version ? version : "0",
    alternativeComponentNames: "",
    component: "",
    testMode: "",
    userBrowser: "",
    userOs: "",
    componentLinkDocs: "",
    componentExists: true,
  });

  // save User Data
  useEffect(() => {
    if (testData.userBrowser === "") {
      const userBrowser = `${browserName} ${browserVersion}`;
      const userOs = `${osName} ${osVersion}`;
      setTestData({ ...testData, userBrowser: userBrowser, userOs: userOs });
    }
  }, [testData]);

  // load library
  useEffect(() => {
    if (id) {
      getLibrary(id).then((lib) => {
        setLibrary(lib);
      });
    }
  }, [id]);

  // set component docs link if available
  useEffect(() => {
    if (library) {
      const v = getVersion(library, testData.libraryVersion);
      if (v) {
        const c = getComponent(v, testData.component);
        if (c?.linkDocs && !testData.componentLinkDocs)
          setTestData({ ...testData, componentLinkDocs: c.linkDocs });
      }
    }
  }, [library, testData]);

  const changeLinkDocs = (linkDocs: string) => {
    setTestData({ ...testData, componentLinkDocs: linkDocs });
  };
  const changeExists = (exists: boolean) => {
    setTestData({ ...testData, componentExists: exists });
  };

  const resetTestlab = () => {
    if (id) {
      getLibrary(id).then((lib) => {
        setLibrary(lib);
      });
    }
    setTestData({
      libraryId: id ? id : "0",
      libraryVersion: version ? version : "0",
      alternativeComponentNames: "",
      component: "",
      testMode: "",
      userBrowser: "",
      userOs: "",
      componentLinkDocs: "",
      componentExists: true,
    });
  };

  return (
    <TestLabLayout
      libraryTitle={library?.title || "loading ..."}
      libraryVersion={testData.libraryVersion}
      component={testData.component}
      testmode={testData.testMode}
    >
      <Routes>
        <Route index element={<Navigate to='specify' replace />}></Route>
        <Route
          path='specify/'
          element={
            <SpecifyTest
              testData={testData}
              library={library}
              setTestData={setTestData}
            />
          }
        />
        <Route
          path='prepare/'
          element={
            <Preparation
              testData={testData}
              linkDocs={library?.linkDocs || "error"}
              library={library || undefined}
              changeLinkDocs={changeLinkDocs}
              changeExists={changeExists}
            />
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
        <Route path='exclude/' element={<Exclude testData={testData} />} />
        <Route
          path='confirmation/'
          element={
            <Confirmation testData={testData} resetTestlab={resetTestlab} />
          }
        />
        <Route
          path='*'
          element={
            <Alert type='error'>
              <Heading>Error 404: Page not Found!</Heading>
            </Alert>
          }
        />
      </Routes>
    </TestLabLayout>
  );
};

export default TestLab;
