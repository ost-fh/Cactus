import React, { useState } from "react";
import { CriteriumResult } from "../../../shared/resources/types";
import TestItemButton from "./test-item-button";
import "./test-item.scss";

type TestItemProps = {
  criterium: CriteriumResult;
  handleChange: Function;
};

const TestItem = ({ criterium, handleChange }: TestItemProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [criteriumData, setCriteriumData] = useState(criterium);

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
      <h3 className='test-item-criteria'>{criterium.title}</h3>
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
