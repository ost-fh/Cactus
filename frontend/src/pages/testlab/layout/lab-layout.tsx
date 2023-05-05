import React, { useContext } from "react";
import Alert from "../../../shared/components/alert";
import { TestDataContext } from "../test-lab";
import "./lab-layout.scss";

type TestLabLayoutProps = {
  libraryTitle: string;
  children?: React.ReactNode;
};

const TestLabLayout = (props: TestLabLayoutProps) => {
  const testData = useContext(TestDataContext);

  return (
    <div className='lab-header container'>
      <header className='page-header'>
        <img className='logo' alt='logo' src='/cactus_logo.svg' />
        <div className='title'>
          <h1>Cactus Testlab</h1>
        </div>
        <Alert className='test-data' type='help'>
          <ul>
            <li>Library: {props.libraryTitle}</li>
            <li>Version: {testData.libraryVersion}</li>
            <li>
              Component:{" "}
              {testData.component === ""
                ? "not yet chosen"
                : testData.component}
            </li>
            <li>
              Testmode:{" "}
              {testData.testMode === "" ? "not yet chosen" : testData.testMode}
            </li>
          </ul>
        </Alert>
      </header>
      <main id='lab-main'>{props.children}</main>
    </div>
  );
};

export default TestLabLayout;
