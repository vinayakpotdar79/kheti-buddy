import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import CropRecommendationForm from './components/CropRecommendationForm';
import PricePredictionForm from './components/PricePredictionForm';
import SoilReportExtractor from './components/SoilReportExtractor';
import FertilizerForm from './components/FertilizerForm';
import ChatBot from './components/ChatBot';

function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex-1">
        <Routes>
          {/* Dedicated landing page — Hero lives here only */}
          <Route path="/" element={<LandingPage />} />

          {/* Tool pages — no Hero, straight to the form */}
          <Route
            path="/recommend"
            element={
              <main className="main-content container">
                <CropRecommendationForm />
              </main>
            }
          />
          <Route
            path="/soil-analysis"
            element={
              <main className="main-content container">
                <SoilReportExtractor />
              </main>
            }
          />
          <Route
            path="/price"
            element={
              <main className="main-content container">
                <PricePredictionForm />
              </main>
            }
          />
          <Route
            path="/fertilizer"
            element={
              <main className="main-content container">
                <FertilizerForm />
              </main>
            }
          />
          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh] text-white">
                <h2 className="text-8xl font-black mb-4 text-emerald-400">404</h2>
                <p className="text-xl opacity-60">Page Not Found</p>
              </div>
            }
          />
        </Routes>
      </div>
      <ChatBot />
    </div>
  );
}

export default App;
