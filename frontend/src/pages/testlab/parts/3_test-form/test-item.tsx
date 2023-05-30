import React, { useState } from "react";
import { BsInfoLg } from "react-icons/bs";
import Alert from "../../../../shared/components/alert";
import { CriteriumResult } from "../../../../shared/resources/types";
import TestItemButton from "./test-item-button";
import "./test-item.scss";

type TestItemProps = {
  criterium: CriteriumResult;
  handleChange: Function;
};

const TestItem = ({ criterium, handleChange }: TestItemProps) => {
  const [commentOpen, setCommentOpen] = useState(false);
  const [linksOpen, setLinksOpen] = useState(false);
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
    <fieldset>
      <div className='test-item'>
        <legend>
          <h3 className='test-item-criteria'>{criterium.title}</h3>
        </legend>
        <p>{criterium.help}</p>
        <div className='button-group'>
          <TestItemButton
            id={criterium._id}
            title={criterium.title}
            label='Yes'
            choice='yes'
            changeChoice={changeChoice}
            active={criteriumData.choice === "yes"}
          />
          <TestItemButton
            id={criterium._id}
            title={criterium.title}
            label='No'
            choice='no'
            changeChoice={changeChoice}
            active={criteriumData.choice === "no"}
          />
          <TestItemButton
            id={criterium._id}
            title={criterium.title}
            label='Not Decidable'
            choice='not_decidable'
            changeChoice={changeChoice}
            active={criteriumData.choice === "not_decidable"}
          />
          <div style={{ flexGrow: "1" }}></div>
          <button
            type='button'
            className={`icon-button ${
              linksOpen ? "criterium-detail-button-active" : ""
            }`}
            onClick={() => setLinksOpen(!linksOpen)}
            aria-expanded={linksOpen}
            aria-controls={`criterium-more-info-${criterium._id}`}
          >
            {/* {showMoreInfo ? "hide" : "show"} */}
            <span className='visually-hidden'>
              show details to criteria "{criterium.title}".
            </span>
            <BsInfoLg aria-hidden='true' title='show details' />
          </button>
        </div>

        {linksOpen && (
          <div
            id={`criterium-more-info-${criterium._id}`}
            className='criterium-more-info'
          >
            <Alert type='help'>
              <p>
                <strong>Sources:</strong> Every criterium is based on a{" "}
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
                  APG pattern
                </a>
                . This criterion is based on the following:
              </p>
              <ul>
                {criterium?.sources?.map((item) => (
                  <li key={item}>
                    <a href={item} target='_blank' rel='noreferrer'>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </Alert>
          </div>
        )}
        {commentOpen && (
          <div className='test-item-comment'>
            <label htmlFor='item-comment'>
              Why is it not decidable? (please give a brief reason)
            </label>
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
    </fieldset>
  );
};

export default TestItem;
