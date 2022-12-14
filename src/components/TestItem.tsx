import React, { useState } from "react";

// type TestItemType = {
//   criterium:
// }

const TestItem = ({ criterium, handleChange }: any) => {
  //   console.log(criteria);
  const [helpOpen, setHelpOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [criteriumData, setCriteriumData] = useState(criterium);

  const toggleHelp = () => {
    setHelpOpen(!helpOpen);
  };

  const changeChoice = (choice: string) => {
    const newCriteriumData = { ...criterium, choice: choice };
    setCriteriumData(newCriteriumData);
    handleChange(newCriteriumData);
    if (choice === "not_decidable") {
      setCommentOpen(true);
    } else {
      setCommentOpen(false);
    }
  };

  const changeComment = (e: any) => {
    const comment = e.target.value;
    const newCriteriumData = { ...criterium, comment: comment };
    setCriteriumData(newCriteriumData);
    handleChange(newCriteriumData);
  };

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
      {/* TODO Improve Accessibility */}
      <div className='button-group'>
        <button
          className={criteriumData.choice === "yes" ? "button-selected" : ""}
          onClick={() => changeChoice("yes")}
        >
          Yes
        </button>
        <button
          className={criteriumData.choice === "no" ? "button-selected" : ""}
          onClick={() => changeChoice("no")}
        >
          No
        </button>
        <button
          className={
            criteriumData.choice === "not_decidable" ? "button-selected" : ""
          }
          onClick={() => changeChoice("not_decidable")}
        >
          Not decidable
        </button>
      </div>
      {commentOpen && (
        <div className='test-item-comment'>
          <label htmlFor='item-comment'>Why is it not decidable?</label>
          <textarea
            required
            name='comment'
            id='item-comment'
            value={criteriumData.comment}
            onChange={changeComment}
          ></textarea>
        </div>
      )}
    </article>
  );
};

export default TestItem;
