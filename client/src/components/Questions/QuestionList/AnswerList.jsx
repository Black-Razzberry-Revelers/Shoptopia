import React, { useEffect, useState } from 'react';
import Answer from './Answer';

function AnswerList({
  qid, v, c, answers, tog,
}) {
  let shown;
  const { showMore } = v.questions.find((q) => q.question_id === qid);
  if (!showMore || showMore === undefined) {
    shown = answers.slice(0, 2);
  } else {
    shown = answers;
  }

  const question = v.questions.find((x) => x.question_id === qid);
  return (
    <div id="answer-viewport">
      {shown.map((a) => (<Answer answer={a} key={a.id} v={v} c={c} qid={qid} aid={a.id} />))}
      {answers.length > 2
      && (
      <div onClick={tog} role="button" onKeyPress={tog} tabIndex="0" className="show-button show-more">
        {question.showMore ? 'Show Less Answers' : 'Show More Answers'}
      </div>
      )}
    </div>
  );
}

export default AnswerList;
