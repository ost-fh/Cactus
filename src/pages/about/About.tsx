import React from "react";
import PublicLayout from "../../shared/layout/public-layout";

const About = () => {
  return (
    <PublicLayout activeLink='about'>
      <h2>About</h2>
      <section className='layout-split about-section'>
        <h3>Evaluation</h3>
        <div>
          The Evaluation is done with the help of our users. They can manually
          test the Libraries according to their documentation.
        </div>
      </section>
      <hr />
      <section className='layout-split about-section'>
        <h3>Criteria</h3>
        <p>
          The criteria were carefully chosen and aim to objectivly rate UI
          Libraries while not being overly specific. They were developed with
          the WCAG 2.1 Standard as well as the ARIA Authoring Practices Guide in
          mind.
        </p>
      </section>
      <hr />
      {/* <section className='about-section'>
        <h3>Frequently Asked Questions</h3>
        <p>What are the criteria?</p>
        <p>Why Project Cactus? - It is a hybrid-acronym-word. CACT stands for Crowdsourced Accessibility Component Testing. the -us is just for fun.</p>
      </section> */}
    </PublicLayout>
  );
};

export default About;
