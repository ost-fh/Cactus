import React from "react";
import "./faq.scss";

const FAQ = () => {
  return (
    <div id='faq'>
      <h3>Frequently Asked Questions</h3>
      <div className='question'>
        <h4>What is Cactus and what does it do?</h4>
        <p>
          Project Cactus is an accessibility comparison platform for UI
          Libraries. UI Libraries are libraries of components and styles for use
          on websites or webapplications. The goal of Cactus is to provide a
          reliable source about which libraries are accessible. The libraries
          are tested with the help of the cactus testlab and a library of
          criteria for each type of component. Our users test libraries and
          thereby contribute to the scores.
        </p>
      </div>
      <div className='question'>
        <h4>Why is Cactus crowdsourced?</h4>
        <p>
          This is for a variety of reasons. For one, there are very very many
          different UI libraries. We hope that with the help of the community we
          can cover as many libraries as possible. By making the testing open to
          everybody, the results are transparent and hopefully understandable.
          Further we hope that the testing is also an easy way to make clear,
        </p>
      </div>
      <div className='question'>
        <h4>Why does Cactus use manual tests?</h4>
        <p>
          The tests are primarily carried out by people who also consider
          accessibility an important issue. Since the time of volunteers is
          valuable and should be respected, a process was needed that allows
          tests to be carried out in a simple and quick manner. Manual tests
          provide a quick and easy way to test web components on accessibility.
        </p>
      </div>
      <div className='question'>
        <h4>What kinds of Libraries can be added to Cactus?</h4>
        <p>
          In theory, all kinds of UI libraries, from primitive component
          libraries to CSS libraries.But since most criteria focus on
          interaction, pure CSS libraries would score "not decidable" on most
          criteria.
        </p>
      </div>
      <div className='question'>
        <h4>Where do the criteria come from?</h4>
        <p>
          The criteria were developed on the basis of the W3C WAI WCAG 2.1 and
          W3C WAI APG Standards.
        </p>
      </div>
      <div className='question'>
        <h4>Where can I go if I find issue with ?</h4>
        <p>
          Open an Issue on our GitHub Repository and explain what you see as an
          Issue and why that is the case.
        </p>
      </div>
      <div className='question'>
        <h4>Does Cactus provide a standard for UI library accessibility?</h4>
        <p>
          There is no standard for Accessibility in UI library, since only a
          subset of the W3C WCAG and APG Rules and Recommendations apply on UI
          libraries. It is neither the goal nor would it be realistic to design
          a standard within the scope of this platform that would actually close
          the gap. However, we hope it to be a solution that contributes to
          greater acceptance and adoption of accessibility.
        </p>
      </div>
      <div className='question'>
        <h4>
          If I use a high scoring library, will I not have to worry about
          accessibility?
        </h4>
        <p>
          You will have to worry. Since the libraries only provide a skeleton,
          and one that often is highly customizable, we can only test that
          skeleton. This means, that our score provides an orientation about
          where the libraries start from, and you can save (potenitally a lot
          of) time by not starting at zero, but not more.
        </p>
      </div>
      {/* <div className="question">
        <h4></h4>
        <p></p>
      </div> */}
    </div>
  );
};

export default FAQ;
