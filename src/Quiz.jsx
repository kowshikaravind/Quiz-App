import React, { useEffect, useState } from 'react'
import Questions from './Questions.jsx'

function Quiz({ category }) {
  const [questions, setQuestions] = useState([]);
  const [load, setLoad] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [isFinished, setIsFinished] = useState(false);


  useEffect(() => {
    fetch(`https://opentdb.com/api.php?amount=11&category=${category}&type=multiple`)
      .then(res => res.json())
      .then(data => {
        setQuestions(data.results);
        setLoad(false);
      })
      .catch(err => {
        console.error("Error fetching questions", err);
        setLoad(false);
      });
  }, [])

  if (load) return <h2>Loading Questions...</h2>;
  if (questions.length === 0) return <h2>No Questions Available</h2>;

  const finishButton = currentIndex >= questions.length - 1 ? "Finish" : "Next";
  function handleNext(){
    if(finishButton === 'Next'){
      setCurrentIndex(currentIndex + 1);
      setTotalQuestions(prev => prev + 1);
      setScore(prev => prev + (questions[currentIndex].correct_answer === questions[currentIndex].incorrect_answers[0] ? 1 : 0));
    }
    else{
      setIsFinished(true);
    }
  }
  if(isFinished){
    return (
      <div>
        <h2>Your Score</h2>
        <h1>
          {score} out of {totalQuestions}
        </h1>
      </div>
    )
  }

  return (
    <div>
      <h1>Quiz</h1>
      <div className='question-container'>
        <Questions questiondata = {questions[currentIndex]}/>
      </div>
      <div className='button-container'>
        <button onClick={handleNext} disabled={currentIndex >= questions.length} className='next-button'>
          {finishButton}
        </button>
      </div>

    </div>
  )
}

export default Quiz
