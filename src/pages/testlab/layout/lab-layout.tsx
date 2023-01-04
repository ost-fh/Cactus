import React from "react";
import "./lab-layout.css";

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
        <div>
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
        </div>
      </header>
      <main>{props.children}</main>
    </div>
  );
};

export default TestLabLayout;
