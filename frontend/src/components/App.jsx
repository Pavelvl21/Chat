import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NotFoundPage from './NotFoundPage.jsx';
import LoginPage from './LoginPage.jsx';
import Navbar from './Navbar';

import '../assets/app.scss';

const App = () => (
  <Router>
    <div className="d-flex flex-column vh-100">
      <Navbar />
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<div>Hello, piplz</div>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  </Router>
);

export default App;
