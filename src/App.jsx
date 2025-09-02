import React from 'react'
import './index.css'
import Quiz from './Quiz'

function App() {
  const [count, setcount] = React.useState(3);
  const [countdown, setcountdown] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [category, setCategory] = React.useState('');

  function startCount(current) {
    if (current > 0) {
      setcount(current);
      setTimeout(() => {
        startCount(current - 1);
      }, 1000);
    } else {
      setShowQuiz(true);
    }
  }

  function handleStart() {
    if(!category) return alert("Please Select a category");
    setcountdown(true);
    startCount(count);
  }

  if (showQuiz) {
    return <Quiz category={category} />;
  }

  return (
    <div>
      {!countdown && count === 3 && (
        <div className='outer-box'>
          <h1>Start Quiz</h1>
          <div className='category-group'>
            <label>
              <input
                className='category-input'
                type='radio'
                name='category'
                value='18'
                onChange={(e)=>setCategory(e.target.value)}
              />
              Computer Science
            </label>
            <label>
              <input
                className='category-input'
                type='radio'
                name='category'
                value='19'
                onChange={(e)=>setCategory(e.target.value)}
              />
              Math
            </label>
            <label>
              <input
                className='category-input'
                type='radio'
                name='category'
                value='9'
                onChange={(e)=>setCategory(e.target.value)}
              />
              General Knowledge
            </label>
            <label>
              <input
                className='category-input'
                type='radio'
                name='category'
                value='17'
                onChange={(e)=>setCategory(e.target.value)}
              />
              Science
            </label>
            <label>
              <input
                className='category-input'
                type='radio'
                name='category'
                value='20'
                onChange={(e)=>setCategory(e.target.value)}
              />
              Geography
            </label>
            <label>
              <input
                className='category-input'
                type='radio'
                name='category'
                value='21'
                onChange={(e)=>setCategory(e.target.value)}
              />
              History
            </label>
          </div>
          <h2>Total Questions : 10</h2>
          <button className='start-button' onClick={handleStart}>
            Start
          </button>
        </div>
      )}
      {countdown && (
        <div className='count-down-container'>
          <div className='count-down'>
            <p className='count'>{count}</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
