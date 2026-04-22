import { useState, useEffect } from 'react';
import { predictCrop, fetchWeather } from '../services/api';
import { Sprout, Droplets, Thermometer, FlaskConical, CloudRain, ShieldCheck, MapPin } from 'lucide-react';
import { STATES, DISTRICT } from '../constants/data';

const CropRecommendationForm = () => {
  const [formData, setFormData] = useState({
    N: '', P: '', K: '', state: '', city: '', ph: '', rainfall: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [weather, setWeather] = useState(null);
  const [weatherLoading, setWeatherLoading] = useState(false);

  useEffect(() => {
    const fetchCityWeather = async () => {
      if (!formData.city) {
        setWeather(null);
        return;
      }
      setWeatherLoading(true);
      try {
        const res = await fetchWeather(formData.city);
        if (res.success) {
          setWeather({
            temperature: res.temperature,
            humidity: res.humidity,
            feelsLike: res.feelsLike,
            description: res.description,
            windSpeed: res.windSpeed,
            pressure: res.pressure,
            cloudiness: res.cloudiness,
            city: res.city
          });
        }
      } catch (err) {
        setWeather(null);
      } finally {
        setWeatherLoading(false);
      }
    };
    fetchCityWeather();
  }, [formData.city]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { city: '' }) // Reset city when state changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    // Validate and Convert fields
    if (!formData.state || !formData.city) {
      setError('Please select both state and city.');
      setLoading(false);
      return;
    }

    const numericData = {};
    const numericKeys = ['N', 'P', 'K', 'ph', 'rainfall'];
    for (const key of numericKeys) {
      const value = formData[key];
      if (value === null || value === undefined || value.toString().trim() === '') {
        setError(`Please fill in all the details for optimal prediction (${key} missing).`);
        setLoading(false);
        return;
      }

      const numValue = parseFloat(value);
      if (isNaN(numValue)) {
        setError(`Please enter a valid number for ${key}.`);
        setLoading(false);
        return;
      }

      // Constraints
      if (numValue < 0) {
        setError(`${key} cannot be a negative value.`);
        setLoading(false);
        return;
      }

      numericData[key] = numValue;
    }

    // Verify pH ranges (usually between 0 and 14)
    if (numericData.ph < 0 || numericData.ph > 14) {
      setError('pH value must be between 0 and 14.');
      setLoading(false);
      return;
    }

    try {
      const response = await predictCrop({ ...numericData, city: formData.city });
      if (response && response.success) {
        setResult(response.recommended_crop);
      } else {
        setError(response?.message || 'Received an unexpected response from the server.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-panel app-card">
      <div className="card-header">
        <h2>Smart Crop Recommendation</h2>
        <p>Enter soil nutrients and environmental factors to get the best crop suggestions.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>Nitrogen (N)</label>
            <div className="input-icon-wrapper">
              <FlaskConical size={18} className="input-icon" />
              <input type="number" name="N" value={formData.N} onChange={handleChange} className="form-control" placeholder="e.g. 90" />
            </div>
          </div>
          <div className="form-group">
            <label>Phosphorous (P)</label>
            <div className="input-icon-wrapper">
              <FlaskConical size={18} className="input-icon" />
              <input type="number" name="P" value={formData.P} onChange={handleChange} className="form-control" placeholder="e.g. 42" />
            </div>
          </div>
          <div className="form-group">
            <label>Potassium (K)</label>
            <div className="input-icon-wrapper">
              <FlaskConical size={18} className="input-icon" />
              <input type="number" name="K" value={formData.K} onChange={handleChange} className="form-control" placeholder="e.g. 43" />
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <div className="input-icon-wrapper">
              <MapPin size={18} className="input-icon" />
              <select name="state" value={formData.state} onChange={handleChange} className="form-control">
                <option value="">Select State</option>
                {STATES.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>City/District</label>
            <div className="input-icon-wrapper">
              <MapPin size={18} className="input-icon" />
              <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state} className="form-control">
                <option value="">Select City/District</option>
                {formData.state && DISTRICT[formData.state]?.map(dist => (
                  <option key={dist} value={dist}>{dist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>ph Level</label>
            <div className="input-icon-wrapper">
              <ShieldCheck size={18} className="input-icon" />
              <input type="number" step="0.1" name="ph" value={formData.ph} onChange={handleChange} className="form-control" placeholder="e.g. 6.5" />
            </div>
          </div>
          <div className="form-group">
            <label>Rainfall (mm)</label>
            <div className="input-icon-wrapper">
              <CloudRain size={18} className="input-icon" />
              <input type="number" step="0.1" name="rainfall" value={formData.rainfall} onChange={handleChange} className="form-control" placeholder="e.g. 104.2" />
            </div>
          </div>
        </div>

        {weatherLoading ? (
          <div className="weather-loading">
            <Thermometer size={24} style={{ marginRight: '0.5rem', display: 'inline' }} />
            Fetching live weather for <strong>{formData.city}</strong>...
          </div>
        ) : weather ? (
          <div className="weather-widget">
            <div className="weather-widget-content">
              <h3 className="weather-title">
                {weather.city || formData.city} • {weather.description}
              </h3>

              <div className="weather-cards">
                {/* Temperature Card */}
                <div className="weather-card weather-card-temp">
                  <div className="weather-card-header">
                    <Thermometer size={20} color="#ef4444" />
                    <span className="weather-card-label">Temperature</span>
                  </div>
                  <div className="weather-card-value">
                    {weather.temperature}°C
                  </div>
                  <div className="weather-card-sub">
                    Feels like {weather.feelsLike}°C
                  </div>
                </div>

                {/* Humidity Card */}
                <div className="weather-card weather-card-humidity">
                  <div className="weather-card-header">
                    <Droplets size={20} color="#3b82f6" />
                    <span className="weather-card-label">Humidity</span>
                  </div>
                  <div className="weather-card-value">
                    {weather.humidity}%
                  </div>
                  <div className="weather-card-sub">
                    Moisture level
                  </div>
                </div>

                {/* Wind Speed Card */}
                <div className="weather-card weather-card-wind">
                  <div className="weather-card-header">
                    <CloudRain size={20} color="#a855f7" />
                    <span className="weather-card-label">Wind</span>
                  </div>
                  <div className="weather-card-value">
                    {weather.windSpeed}
                  </div>
                  <div className="weather-card-sub">
                    m/s
                  </div>
                </div>
              </div>

              <div className="weather-footer">
                {/* Pressure */}
                <div className="weather-info">
                  <span className="weather-info-label">Pressure</span>
                  <span className="weather-info-value">{weather.pressure} hPa</span>
                </div>

                {/* Cloud Coverage */}
                <div className="weather-info">
                  <span className="weather-info-label">Cloud Cover</span>
                  <span className="weather-info-value">{weather.cloudiness}%</span>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }} disabled={loading || weatherLoading}>
          {loading ? (
            <Sprout className="spinner" size={24} />
          ) : (
            <>
              <Sprout size={24} /> Recognize Best Crop
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h3>Highly Recommended</h3>
          <div className="result-value">
            {result}
          </div>
          <p style={{ color: 'var(--text-muted)' }}>This crop fits perfectly given the environmental inputs provided.</p>
        </div>
      )}
    </div>
  );
};

export default CropRecommendationForm;
