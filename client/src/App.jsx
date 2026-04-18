import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CropRecommendation from './pages/CropRecommendation';
import PricePrediction from './pages/PricePrediction';
import Navbar from './components/Navbar';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <Routes>
          <Route path="/" element={<CropRecommendation />} />
          <Route path="/predict" element={<CropRecommendation />} />
          <Route path="/price" element={<PricePrediction />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
