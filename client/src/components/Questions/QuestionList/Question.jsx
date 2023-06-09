import React, { useState, useEffect } from 'react';
import { intlFormat } from 'date-fns';
import AnswerList from './AnswerList';

function Question({
  question, qid, v, c,
}) {
  const { showAnswers, changeMode, markQHelpful } = c;

  function onHelpful() {
    markQHelpful(qid);
  }

  function onToggle() {
    showAnswers(qid);
  }
  function onAddAnswer() {
    console.log('add answer clicked');
    changeMode('Add Answer', { question, qid });
  }
  // eslint-disable-next-line no-param-reassign
  let answers = Object.keys(question.answers).map((key) => question.answers[key]);

  answers = answers.sort((a, b) => {
    if (a.answerer_name === 'seller' || a.answerer_name === 'Seller') {
      return -1;
    }
    if (a.helpfulness < b.helpfulness) {
      return 1;
    }
    if (a.helpfulness > b.helpfulness) {
      return -1;
    }
    return 0;
  });
  const toggle = { onToggle };
  return (
    <div className="single-question">
      <div className="question-body big-Q">
        <h1 className="big-letter">Q:</h1>
        <h4 className="sub-head question-text">
          {question.question_body}
        </h4>
        <p className="label question-info">
          by:
          {' '}
          {question.asker_name}
          {' '}
          on:
          {' '}
          {intlFormat(new Date(question.question_date), {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
          })}
        </p>
        <div className="add=answer-helpful">
          <p className="label question-helpful">
            {' '}
            Helpful?
            {' '}
            {question.markedHelpful ? <strong className="helpful-button">Marked Helpful!</strong> : <strong onClick={onHelpful} className="helpful-button" role="button" onKeyPress={onHelpful} tabIndex="0"> Yes! </strong>}
            {' '}
            (
            {question.question_helpfulness}
            )
          </p>
          <div className="add-answer">
            <strong onClick={onAddAnswer} className="helpful-button" role="button" onKeyPress={onAddAnswer} tabIndex="0">Add Answer</strong>
            {' '}
          </div>
        </div>

      </div>
      <AnswerList c={c} v={v} qid={qid} answers={answers} tog={toggle.onToggle} />
    </div>
  );
}

export default Question;
