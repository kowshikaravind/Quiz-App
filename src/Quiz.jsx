import React, { useEffect, useState } from 'react';
import Questions from './Questions.jsx';
import { Link ,useLocation } from 'react-router-dom';
import './index.css';


function Quiz({ category , totalQuestions}) {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [answered, setAnswered] = useState(false);

  const location = useLocation();
  const isDailyChallenge = location.state?.isDailyChallenge || false;

  console.log(answered);
  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=${totalQuestions}&category=${category}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results || []);
        setLoad(false);
      })
      .catch(() => setLoad(false));
  }, [category, totalQuestions]);

  if (load) return <h2>Loading Questions...</h2>;
  if (questions.length === 0) return <h2>No Questions Available</h2>;

  const isLast = currentIndex >= questions.length - 1;
  const buttonText = isLast ? "Finish" : "Next";

  async function updateStreak(email) {
    const res = await fetch("http://localhost:5000/update-streak", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    return data.streak;
  }


  function handleAnswer(isCorrect) {
    if (isCorrect) setScore(prev => prev + 1);
    setAnswered(true);
  }

  async function handleNext() {
    if (!isLast) {
      setCurrentIndex(prev => prev + 1);
      setAnswered(false);
    } else {
      setIsFinished(true);

      if (isDailyChallenge) {
        const userDetails = JSON.parse(localStorage.getItem("userDetails"));
        if (userDetails?.email) {
          const streak = await updateStreak(userDetails.email);
          alert(`🔥 Your current streak is: ${streak}`);
        }
      }
    }
  }

  if (isFinished) {
    return (
      <div className="score-box">
        
        <h1>Your Score</h1>
        <h1>{score} out of {questions.length}</h1>
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
      <h2>Question {currentIndex + 1} of {questions.length}</h2>
      <div className='question-container'>
        <Questions questiondata={questions[currentIndex]} onAnswer={handleAnswer} />
      </div>
      <div className='button-container'>
        <button onClick={handleNext} className='next-button-quiz'>
          {buttonText}
        </button>
      </div>
    </div>
  );
}

export default Quiz;
