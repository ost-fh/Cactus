import React, { useState } from "react";
import { criteriumResult } from "../../../shared/resources/types";
import "./testitem.css";

type TestItemButtonProps = {
  id: string;
  label: string;
  choice: string;
  changeChoice: Function;
  active: boolean;
};

const TestItemButton = ({
  id,
  label,
  choice,
  changeChoice,
  active,
}: TestItemButtonProps) => {
  return (
    <label
      className={`button ${active && "button-selected"}`}
      onClick={() => changeChoice(choice)}
    >
      {/* {active ? <BsCheckSquare />} */}
      <input type='radio' name={id} required id={`${id}${choice}`} />
      {label}
    </label>
  );
};

type TestItemProps = {
  criterium: criteriumResult;
  handleChange: Function;
};

const TestItem = ({ criterium, handleChange }: TestItemProps) => {
  // const [helpOpen, setHelpOpen] = useState(false);
  const [commentOpen, setCommentOpen] = useState(false);
  const [criteriumData, setCriteriumData] = useState(criterium);

  // const toggleHelp = () => {
  //   setHelpOpen(!helpOpen);
  // };

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
    <div className='test-item'>
      <p className='test-item-criteria'>{criterium.text}</p>
      {/* <button
        type='button'
        className={`button-with-icon ${helpOpen && "button-selected"}`}
        onClick={toggleHelp}
      >
        <BsQuestionCircleFill />
        {helpOpen ? "Hide Help" : "Show Help"}
      </button>
      {helpOpen && <div className='test-item-help'>{criterium.help}</div>} */}
      <p>{criterium.help}</p>
      <div className='button-group'>
        <TestItemButton
          id={criterium._id}
          label='Yes'
          choice='yes'
          changeChoice={changeChoice}
          active={criteriumData.choice === "yes"}
        />
        <TestItemButton
          id={criterium._id}
          label='No'
          choice='no'
          changeChoice={changeChoice}
          active={criteriumData.choice === "no"}
        />
        <TestItemButton
          id={criterium._id}
          label='Not Decidable'
          choice='not_decidable'
          changeChoice={changeChoice}
          active={criteriumData.choice === "not_decidable"}
        />
        {/* <button
          className={
            "button-with-icon " +
            (criteriumData.choice === "yes" ? "button-selected" : "")
          }
          onClick={() => changeChoice("yes")}
        >
          {criteriumData.choice === "yes" && <BsCheckSquare />}
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
        </button> */}
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
    </div>
  );
};

export default TestItem;
