import React, { useEffect } from "react";
import { TestData } from "../../../shared/resources/types";
import { Navigate } from "react-router-dom";
import { postTestResult } from "../../../shared/services/api";

type ExcludeProps = {
  testData: TestData;
};
const Exclude = ({ testData }: ExcludeProps) => {
  useEffect(() => {
    postTestResult({ testData: testData, criteria: [] }).catch((e) => {
      console.error(e);
    });
  });

  return <Navigate to='../confirmation?source=exclude' replace />;
};

export default Exclude;
