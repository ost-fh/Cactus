import React from "react";
import Alert from "../../../shared/components/alert";
import "./lab-layout.scss";

type TestLabLayoutProps = {
  libraryTitle: string;
  libraryVersion: string;
  component: string;
  testmode: string;
  children?: React.ReactNode;
};

const TestLabLayout = (props: TestLabLayoutProps) => {
  return (
    <div className='container'>
      <header className='page-header'>
        <img className='logo' alt='logo' src='/cactus_logo.png' />
        <h1>Cactus Testlab</h1>
        <Alert type='help'>
          <ul>
            <li>Library: {props.libraryTitle}</li>
            <li>Version: {props.libraryVersion}</li>
            <li>
              Component:{" "}
              {props.component === "" ? "not yet chosen" : props.component}
            </li>
            <li>
              Testmode:{" "}
              {props.testmode === "" ? "not yet chosen" : props.testmode}
            </li>
          </ul>
        </Alert>
      </header>
      <main id='lab-main'>{props.children}</main>
    </div>
  );
};

export default TestLabLayout;
