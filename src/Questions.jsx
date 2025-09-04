import React, { useEffect, useState } from 'react';

function Questions({ questiondata, onAnswer }) {
  const { question, correct_answer, incorrect_answers } = questiondata;
  const [allAnswers, setAllAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    const opts = [
      ...incorrect_answers.map(a => ({ text: a, isCorrect: false })),
      { text: correct_answer, isCorrect: true }
    ].sort(() => Math.random() - 0.5);

    setAllAnswers(opts);
    setSelectedAnswer('');
  }, [questiondata]);

  function handleChoice(opt) {
    setSelectedAnswer(opt.text);
    if (typeof onAnswer === 'function') {
      onAnswer(opt.isCorrect);
    }
  }

  return (
    <div className="question-box">
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      <div className="answers-list">
        {allAnswers.map((opt, i) => (
          <div key={i} className={`answer-option ${selectedAnswer === opt.text ? 'selected' : ''}`}>
            <label>
              <input
                type="radio"
                name={`q-${question}`}
                checked={selectedAnswer === opt.text}
                onChange={() => handleChoice(opt)}
              />
              <span dangerouslySetInnerHTML={{ __html: opt.text }} />
            </label>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Questions;
