import React from 'react';
import './index.css';
import Quiz from './Quiz';

function App() {
  const [count, setCount] = React.useState(3);
  const [countdown, setCountdown] = React.useState(false);
  const [showQuiz, setShowQuiz] = React.useState(false);
  const [category, setCategory] = React.useState('');
  const [totalQuestions, setTotalQuestions] = React.useState(10);
  if(totalQuestions > 50){
    setTotalQuestions(50);
    alert("Maximum number of questions is 50");
  }
  React.useEffect(() => {
    if (countdown && count > 0) {
      const timer = setTimeout(() => setCount(prev => prev - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown && count === 0) {
      setShowQuiz(true);
    }
  }, [countdown, count]);

  function handleStart() {
    if (!category) return alert("Please Select a category");
    setCountdown(true);
  }

  if (showQuiz) {
    return <Quiz category={category} totalQuestions={totalQuestions} />;
  }

  return (
    <div>
      {!countdown && count === 3 && (
        <div className='outer-box-app'>
          <h1>Start Quiz</h1>
          <h2>Select Category</h2>
          <div className='category-group'>
            {[
              { label: 'Computer Science', value: '18' },
              { label: 'Math', value: '19' },
              { label: 'General Knowledge', value: '9' },
              { label: 'Science', value: '17' },
              { label: 'Geography', value: '20' },
              { label: 'History', value: '21' }
            ].map(({ label, value }) => (
              <label key={value}>
                <input
                  className='category-input'
                  type='radio'
                  name='category'
                  value={value}
                  onChange={(e) => setCategory(e.target.value)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <h2>Total Questions :
            <input
              className='total-questions-input'
              type="number"
              min="1"
              value={totalQuestions}
              onChange={(e) => setTotalQuestions(e.target.value)}
            /></h2>
          <button className='start-button' onClick={handleStart}>Start</button>
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
  );
}

export default App;