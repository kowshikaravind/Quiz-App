import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter ,Routes,Route ,Navigate} from 'react-router-dom'
import App from './App.jsx'
import Home from './Home.jsx'
import User from './User.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path='/' element={<Navigate to ='/User' replace />} />
      <Route path='/User' element={<User />} />
      <Route path='/Home' element={<Home />} />
      <Route path='/Quiz' element={<App />}  />
    </Routes>
  </BrowserRouter>
)
