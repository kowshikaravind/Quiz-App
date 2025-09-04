import { createRoot } from 'react-dom/client';
import './index.css';
import DetailsContainer from './DetailsContainer.jsx';

const root = document.getElementById('root');
if (root) {
  createRoot(root).render(<DetailsContainer />);
}
