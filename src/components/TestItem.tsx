import React from "react";

const TestItem = (criteria: any) => {
  //   console.log(criteria);

  return (
    <article className='test-item'>
      <p className='test-item-criteria'>{criteria.criteria.text}</p>
      <button>help</button>
      <div className='test-item-help'>{criteria.criteria.help}</div>
      <div className='button-group'>
        <button>Yes</button>
        <button>No</button>
        <button>Not decidable</button>
      </div>
      <div className='test-item-comment'>
        <label htmlFor='item-comment'>Write here</label>
        <textarea name='comment' id='item-comment'></textarea>
      </div>
    </article>
  );
};

export default TestItem;
