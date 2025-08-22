import React, { useEffect, useState } from 'react'

function Questions({ questiondata ,onAnswer }) {
  const { question, correct_answer, incorrect_answers } = questiondata;
  const [allAnswers, setAllAnswers] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState('');

  useEffect(() => {
    const shuffled = [...incorrect_answers, correct_answer].sort(
      () => Math.random() - 0.5
    );
    setAllAnswers(shuffled);
    setSelectedAnswer('');
  }, [questiondata]); 

  
  function handleAnswer(e) {
    const selected = e.target.value;
    setSelectedAnswer(selected);

    onAnswer(selected === correct_answer);
  }
  return (
    <div>
      <h3 dangerouslySetInnerHTML={{ __html: question }} />
      
        {allAnswers.map((answer, i) => (
          <div key={i} className='answer-option'>
            <label>
              <input
                type="radio"
                name={question}
                value={answer}
                checked={selectedAnswer === answer}
                onChange={handleAnswer}
              />
              <span dangerouslySetInnerHTML={{ __html: answer }} />
            </label>
          </div>
        ))}
    </div>
  )
}

export default Questions
