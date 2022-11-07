import React from "react";

const Test = () => {
  return (
    <div className='component-test'>
      <div className='test-general'>
        <p>Component: Dialog</p>
        <p>Testmode: ...</p>

        <button>Open documentation in new window</button>
      </div>
      <div className='alert-info'>mode: keyboard use Hinweis</div>
      <div className='test-instructions'>
        <h3>Instructions</h3>
        video Blablabla
      </div>
      <section className='test-list'>
        <article className='test-item'>
          <p className='test-item-criteria'>criteria</p>
          <button>help</button>
          <div className='test-item-help'>Help Section</div>
          <div className='button-group'>
            <button>eval/btn group</button>
            <button>eval/btn group</button>
            <button>eval/btn group</button>
          </div>
          <div className='test-item-comment'>
            <label htmlFor='item-comment'>Write here</label>
            <textarea name='comment' id='item-comment'></textarea>
          </div>
        </article>
      </section>
      <button>Finish Test</button>
    </div>
  );
};

export default Test;
