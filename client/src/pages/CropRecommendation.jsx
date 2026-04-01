import { useState } from 'react';
import { getCropRecommendation } from '../services/api';
import './CropRecommendation.css';

function CropRecommendation() {
  const [formData, setFormData] = useState({
    N: 50,
    P: 50,
    K: 50,
    temperature: 25,
    humidity: 50,
    ph: 7,
    rainfall: 100
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: parseFloat(e.target.value) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await getCropRecommendation(formData);
      setResult(response.recommended_crop);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to get recommendation');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Crop Recommendation</h1>
        <p className="subtitle">Enter your soil and weather parameters to get the best crop suggestion</p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="form-group">
              <label>Nitrogen (N)</label>
              <input type="range" name="N" min="0" max="140" value={formData.N} onChange={handleChange} />
              <span className="value">{formData.N}</span>
            </div>
            <div className="form-group">
              <label>Phosphorus (P)</label>
              <input type="range" name="P" min="0" max="140" value={formData.P} onChange={handleChange} />
              <span className="value">{formData.P}</span>
            </div>
            <div className="form-group">
              <label>Potassium (K)</label>
              <input type="range" name="K" min="0" max="140" value={formData.K} onChange={handleChange} />
              <span className="value">{formData.K}</span>
            </div>
            <div className="form-group">
              <label>Temperature (°C)</label>
              <input type="range" name="temperature" min="0" max="50" value={formData.temperature} onChange={handleChange} />
              <span className="value">{formData.temperature}°C</span>
            </div>
            <div className="form-group">
              <label>Humidity (%)</label>
              <input type="range" name="humidity" min="0" max="100" value={formData.humidity} onChange={handleChange} />
              <span className="value">{formData.humidity}%</span>
            </div>
            <div className="form-group">
              <label>pH Level</label>
              <input type="range" name="ph" min="0" max="14" step="0.1" value={formData.ph} onChange={handleChange} />
              <span className="value">{formData.ph}</span>
            </div>
            <div className="form-group">
              <label>Rainfall (mm)</label>
              <input type="range" name="rainfall" min="0" max="300" value={formData.rainfall} onChange={handleChange} />
              <span className="value">{formData.rainfall}mm</span>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Getting Recommendation...' : 'Get Recommendation'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {result && (
          <div className="result">
            <h2>Recommended Crop</h2>
            <div className="crop-name">{result}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CropRecommendation;
