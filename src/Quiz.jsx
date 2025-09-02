import React, { useEffect, useState } from 'react';
import Questions from './Questions.jsx';
import './index.css';
import { Link } from 'react-router-dom';

function Quiz({ category }) {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=10&category=${category}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results || []);
        setLoad(false);
      })
      .catch(err => {
        console.error("Error fetching questions", err);
        setLoad(false);
      });
  }, [category]);

  if (load) return <h2>Loading Questions...</h2>;
  if (questions.length === 0) return <h2>No Questions Available</h2>;

  const isLast = currentIndex >= questions.length - 1;
  const buttonText = isLast ? "Finish" : "Next";

  // -------------------------
  // Called ONCE per question (by Questions component)
  // -------------------------
  function handleAnswer(isCorrect) {
    // use functional updater to avoid stale state
    if (isCorrect) {
      setScore(prev => prev + 1);
    }
    // do not update totalQuestions here — we increment when user presses Next/Finish
  }

  function handleNext() {
    // count this question as attempted (whether answered or not)
    setTotalQuestions(prev => prev + 1);

    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
    }
  }

  if (isFinished) {
    // show score only at the end
    return (
      <div className="score-box">
        <h2>Your Score</h2>
        <h1>{score} out of {totalQuestions}</h1>
        <div className='returntohome'>
          <Link to='/Home'>
            <button className='home-btn-in-score'>Home</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-container">
      <h1>Quiz</h1>

      <div className='question-container'>
        {/* Pass a callback; Questions will call it once per question with true/false */}
        <Questions
          questiondata={questions[currentIndex]}
          onAnswer={handleAnswer}
        />
      </div>

      <div className='button-container'>
        <button onClick={handleNext} className='next-button'>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
