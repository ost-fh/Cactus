import React, { useState } from "react";

const TestItem = ({ criterium }: any) => {
  //   console.log(criteria);
  const [helpOpen, setHelpOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [choice, setChoice] = useState<string | undefined>(undefined);

  const toggleHelp = () => {
    setHelpOpen(!helpOpen);
  };

  const handleChoice = (choice: string) => {
    setChoice(choice);
    if (choice === "not_decidable") {
      setCommentOpen(true);
    } else {
      setCommentOpen(false);
    }
  };

  const toggleComment = () => {};

  return (
    <article className='test-item'>
      <p className='test-item-criteria'>{criterium.text}</p>
      <button
        className={helpOpen ? "button-selected" : ""}
        onClick={toggleHelp}
      >
        help
      </button>
      {helpOpen && <div className='test-item-help'>{criterium.help}</div>}
      {/* <div className='radio-group'>
        <input checked type='radio' id='radioYes' name='' value='yes' checked />
        <label htmlFor='radioYes'>Yes</label>

        <input type='radio' id='radioNo' name='' value='banana' />
        <label htmlFor='radioNo'>No</label>

        <input type='radio' id='radioNotDecidable' name='' value='orange' />
        <label htmlFor='radioNotDecidable'>Not decidable</label>
      </div> */}
      {/* not really accessible */}
      <div className='button-group'>
        <button
          className={choice === "yes" ? "button-selected" : ""}
          onClick={() => handleChoice("yes")}
        >
          Yes
        </button>
        <button
          className={choice === "no" ? "button-selected" : ""}
          onClick={() => handleChoice("no")}
        >
          No
        </button>
        <button
          className={choice === "not_decidable" ? "button-selected" : ""}
          onClick={() => handleChoice("not_decidable")}
        >
          Not decidable
        </button>
      </div>
      {commentOpen && (
        <div className='test-item-comment'>
          <label htmlFor='item-comment'>Why is it not decidable?</label>
          <textarea required name='comment' id='item-comment'></textarea>
        </div>
      )}
    </article>
  );
};

export default TestItem;
