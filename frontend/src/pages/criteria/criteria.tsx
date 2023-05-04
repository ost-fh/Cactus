import React, { useEffect, useState } from "react";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import { ComponentCriteria } from "../../shared/resources/types";
import { getComponentCriteria } from "../../shared/services/api";
import "./criteria.scss";
import Component from "./parts/components";

const Criteria = () => {
  const [criteria, setCriteria] = useState<ComponentCriteria[]>();
  useEffect(() => {
    getComponentCriteria().then((data) => setCriteria(data));
  }, []);

  return (
    <PublicLayout className='criteria-reference'>
      <Heading>Criteria Overview</Heading>
      <Alert type='help'>
        <h3>Sources</h3>
        Every criterium is based on a{" "}
        <a
          href='https://www.w3.org/WAI/WCAG21/quickref/'
          target='_blank'
          rel='noreferrer'
        >
          WCAG
        </a>{" "}
        criterion or an{" "}
        <a
          href='https://www.w3.org/WAI/ARIA/apg/patterns/'
          target='_blank'
          rel='noreferrer'
        >
          APG pattern.
        </a>
      </Alert>
      {criteria?.map((component) => (
        <Component key={component.name} component={component} />
      ))}
    </PublicLayout>
  );
};

export default Criteria;
