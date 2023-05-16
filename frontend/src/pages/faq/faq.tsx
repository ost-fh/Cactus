import React from "react";
import { Link } from "react-router-dom";
import Heading from "../../shared/components/heading";
import PublicLayout from "../../shared/layout/public-layout";
import "./faq.scss";

const FAQ = () => {
  return (
    <PublicLayout className='faq' activeLink='faq'>
      <Heading>FAQ: Frequently Asked Questions</Heading>

      <div id='faq'>
        <h2>About Cactus</h2>
        <div className='question'>
          <h3>What is Cactus and what does it do?</h3>
          <p>
            Project Cactus is an independent accessibility comparison platform
            for UI Libraries. UI Libraries are libraries of components and
            styles for use on websites or web applications. The goal of Cactus
            is to provide a reliable source about which libraries are
            accessible. The libraries are tested with the help of the cactus
            testlab and a library of criteria for each type of component. The
            users of Cactus test libraries and thereby contribute to the scores.
          </p>
        </div>
        <div className='question'>
          <h3>Why is Cactus collaborative?</h3>
          <p>
            This is for a variety of reasons. For one, there are many different
            UI libraries. We hope that with the help of the community we can
            cover as many libraries as possible. By making the testing open to
            everybody, the results are transparent and hopefully understandable.
            Further we hope that the testing is also an easy way to introduce
            people to accessibility.
          </p>
        </div>
        <div className='question'>
          <h3>Why does Cactus use manual tests?</h3>
          <p>
            The tests are primarily carried out by people who also consider
            accessibility an important issue. Since the time of volunteers is
            valuable and should be respected, a process was needed that allows
            tests to be carried out in a simple and quick manner. Manual tests
            provide a quick and easy way to test web components on
            accessibility.
          </p>
        </div>
        <div className='question'>
          <h3>Where do the criteria come from?</h3>
          <p>
            The criteria were developed on the basis of the{" "}
            <a href='https://www.w3.org/WAI/WCAG21/quickref/'>
              W3C WAI WCAG 2.1
            </a>{" "}
            and{" "}
            <a href='https://www.w3.org/WAI/ARIA/apg/patterns/'>W3C WAI APG</a>{" "}
            Standards. You can find all the criteria in the{" "}
            <Link to={"/criteria"}>Criteria Reference</Link>.
          </p>
        </div>
        <h2>Using Cactus</h2>
        <div className='question'>
          <h3>How can I add a component test to a library?</h3>
          <p>
            Login using a Github or Google Account. Open the library you would
            like to test in the <Link to='/libraries'>Library Overview</Link>.
            Click "Add a Component Test". Now you are in the testlab, you can
            follow the provided instructions.
          </p>
        </div>
        <div className='question'>
          <h3>What kinds of Libraries can be added to Cactus?</h3>
          <p>
            In theory, all kinds of UI libraries, from primitive component
            libraries to CSS libraries. But since most criteria focus on
            interaction, pure CSS libraries would score "not decidable" on most
            criteria.
          </p>
        </div>
        <div className='question'>
          <h3>What are the Prerequisites to contribute to Cactus?</h3>
          <p>
            It would be best if you have a basic knowledge of web development
            and also a little knowledge on accessibility. But then it should be
            an easy, comfortable and fast experience for you.
          </p>
        </div>
        <h2>Other Questions</h2>
        <div className='question'>
          <h3>Where can I go if I find issue with cactus?</h3>
          <p>
            Open an Issue on our{" "}
            <a className='nav-icon' href='https://github.com/ost-fh/Cactus'>
              GitHub Repository
            </a>{" "}
            and explain what you see as an issue and why that is the case. You
            can find more details in the readme file.
          </p>
        </div>
        <div className='question'>
          <h3>Does Cactus provide a standard for UI library accessibility?</h3>
          <p>
            There is no standard for accessibility in UI library, since only a
            subset of the W3C WCAG and APG Rules and Recommendations apply on UI
            libraries. It is neither the goal nor would it be realistic to
            design a standard within the scope of this platform that would
            actually close the gap. However, we hope it to be a solution that
            contributes to greater acceptance and adoption of accessibility.
          </p>
        </div>
        <div className='question'>
          <h3>
            If I use a high scoring library for my project, will I not have to
            worry about accessibility?
          </h3>
          <p>
            You will have to worry. Since the libraries only provide a skeleton,
            and one that often is highly customizable, we can only test that
            skeleton. This means, that our score provides an orientation about
            where the libraries start from, and you can save (potentially a lot
            of) time by not starting at zero, but not more.
          </p>
        </div>
        {/* <div className="question">
        <h3></h3>
        <p></p>
      </div> */}
      </div>
    </PublicLayout>
  );
};

export default FAQ;
