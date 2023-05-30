import React, { useEffect, useState } from "react";
import Alert from "../../shared/components/alert";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import { ComponentCriteria } from "../../shared/resources/types";
import { getComponentCriteria } from "../../shared/services/api";
import "./criteria.scss";
import Component from "./parts/components";
import { useSearchParams } from "react-router-dom";

const Criteria = () => {
  const [searchParams] = useSearchParams();

  const [criteria, setCriteria] = useState<ComponentCriteria[]>();
  useEffect(() => {
    getComponentCriteria().then((data) => setCriteria(data));
  }, []);

  // use page with ?component=Button or
  // ?component=Button&testmode=Keyboard
  // to navigate to the corresponding sections
  useEffect(() => {
    if (criteria) {
      const comp = searchParams.get("component");
      const testmode = searchParams.get("testmode");
      // console.log(comp, testmode);
      if (comp && testmode) {
        const element = document.getElementById(`${comp}-${testmode}`);
        // console.log(element);
        if (element) {
          element.className = element?.className + " focus";
          element.scrollIntoView({ behavior: "smooth" });
        }
      } else if (comp) {
        const element = document.getElementById(comp);
        // console.log(element);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    }
  }, [criteria, searchParams]);

  return (
    <PublicLayout className='criteria-reference'>
      <Heading>Criteria Overview</Heading>
      <Alert type='help'>
        <h2>Sources</h2>
        Every criterion is based on a{" "}
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
        <Component
          key={component.name}
          expand={searchParams.get("component") === component.name}
          component={component}
        />
      ))}
    </PublicLayout>
  );
};

export default Criteria;
