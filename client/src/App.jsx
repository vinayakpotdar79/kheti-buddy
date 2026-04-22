import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import CropRecommendationForm from './components/CropRecommendationForm';
import PricePredictionForm from './components/PricePredictionForm';

function App() {
  return (
    <>
      <Navbar />
      <main className="main-content container">
        <Routes>
          <Route path="/" element={<CropRecommendationForm />} />
          <Route path="/price" element={<PricePredictionForm />} />
          <Route path="*" element={<h2 className="text-center text-7xl text-red-500">Page Not Found</h2>} />
        </Routes>
      </main>
    </>
  );
}

export default App;
