import React, { useContext } from "react";
import { TestDataContext } from "../../../test-lab";

type ComponentLinkSectionProps = {
  setComponentLinkDocs: Function;
  changeExists: Function;
  componentName: string;
  componentLinkDocs: string;
  libraryTitle: string | undefined;
};

const ComponentLinkSection = ({
  setComponentLinkDocs,
  componentLinkDocs,
  changeExists,
  componentName,
  libraryTitle,
}: ComponentLinkSectionProps) => {
  const testData = useContext(TestDataContext);

  return (
    <section>
      {!testData.componentLinkDocs ? (
        <>
          <h2>Step 4: Add the Link pointing to the Documentation</h2>
          <p>
            <label htmlFor='linkDocs'>
              To make testing for other people easier, please copy the link to
              the component documentation and paste it here:
            </label>
          </p>
        </>
      ) : (
        <>
          <h3>Incorrect Link to Documentation?</h3>
          <p>
            <label htmlFor='linkDocs'>
              If the link to <strong>{`${componentName}`}</strong> is incorrect,
              please paste the correct link here:
            </label>
          </p>
        </>
      )}

      <input
        disabled={!testData.componentExists}
        id='linkDocs'
        placeholder='https://...'
        pattern='http(s)?:\/\/(www\.)?[-a-zA-Z0-9]{2,256}\.[a-z]{2,6}([-a-zA-Z0-9@:%_\+.~#?&//=]*)'
        required
        onChange={(e) => {
          setComponentLinkDocs(e.target.value);
        }}
        value={componentLinkDocs}
        type='text'
      />
      <div>
        <p>Is the component not available? </p>
        <label>
          <input
            checked={!testData.componentExists}
            onChange={() => changeExists(!testData.componentExists)}
            type='checkbox'
          />
          Exclude the {testData.component} component from {libraryTitle}
        </label>
      </div>
    </section>
  );
};

export default ComponentLinkSection;
