import React from "react";

const Test = () => {
  return (
    <div className='component-test'>
      <p>Component: Dialog</p>
      <p>Testmode ...</p>
      <div className='alert-info'>mode: keyboard use Hinweis</div>
      <div className='test-instructions'>
        <p>General Instructions</p>
        video Blablabla
      </div>
      <button>Links zu docs</button>
      test sections
      <section className='test-list'>
        <article className='test-item'>
          <p>criteria</p>
          help
          <button>eval/btn group</button>
          <button>eval/btn group</button>
          <button>eval/btn group</button>
          <div className='help-area'></div>
          <textarea name='comment' id='test-crit-comment'></textarea>
        </article>
      </section>
    </div>
  );
};

export default Test;
