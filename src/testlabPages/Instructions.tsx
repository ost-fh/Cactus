import React from "react";
import LinkButton from "../components/LinkButton";

type InstructionsProps = {
  linkDocs: string;
};

const Instructions = ({ linkDocs }: InstructionsProps) => {
  return (
    <div className='test-instruction'>
      <h2>Instructions</h2>
      <p>
        At Cactus, we test components on the basis of the provider's
        documentation.
      </p>
      <p>
        To test a component, we recommmend you to open the documentation beside
        the testlab. Navigate to the component you want to test.
      </p>
      <p>Then check if the listed criteria are fulfilled or not.</p>
      <section>
        <div>
          <h3>Open the documentation</h3>
          <p>here or in the next step</p>
          <a
            href={linkDocs}
            className='button'
            target='_blank'
            rel='noreferrer'
          >
            Open documentation
          </a>
          {/* <img src='/instr1.png' alt='Open Documentation' /> */}
        </div>
        <div>
          <h3>Place the documentation beside the testlab</h3>
          <img src='/instr2.png' alt='Open Documentation' />
        </div>
      </section>
      <LinkButton
        label='Next'
        classname='button-primary'
        path='../test'
      ></LinkButton>
    </div>
  );
};

export default Instructions;
