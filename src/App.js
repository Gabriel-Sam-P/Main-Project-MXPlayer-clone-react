import './App.css';
import HomePage from './Component/HomePage';
import TrailerVideoPage from './Component/Pages/TrailerVideoPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/trailer/:id" element={<TrailerVideoPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
