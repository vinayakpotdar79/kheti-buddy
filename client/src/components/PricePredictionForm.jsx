import { useState } from 'react';
import { predictPrice } from '../services/api';
import { IndianRupee, MapPin, Calendar, Sprout } from 'lucide-react';
import { STATES, DISTRICT, CROPS } from '../constants/data';

const PricePredictionForm = () => {
  const [formData, setFormData] = useState({
    state: '', district: '', year: '', crop: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { district: '' }) // Reset district when state changes
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);

    const yearStr = formData.year ? formData.year.toString().trim() : '';
    const stateStr = formData.state ? formData.state.trim() : '';
    const districtStr = formData.district ? formData.district.trim() : '';
    const cropStr = formData.crop ? formData.crop.trim() : '';

    // Basic validation
    if (!stateStr || !districtStr || !yearStr || !cropStr) {
      setError('Please fill in all the details correctly.');
      setLoading(false);
      return;
    }

    const yearInt = parseInt(yearStr, 10);
    if (isNaN(yearInt) || yearInt < 1900 || yearInt > 2100) {
      setError('Please enter a valid year (e.g., 2026).');
      setLoading(false);
      return;
    }

    try {
      const response = await predictPrice({
        state: stateStr,
        district: districtStr,
        year: yearInt,
        crop: cropStr
      });

      if (response && response.success) {
        setResult(response.predicted_price);
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
        <h2>Market Price Prediction</h2>
        <p>Estimate the expected price of a crop based on historical data and region.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="bg-red-50 border border-red-500 p-4 text-red-500 mb-6 rounded-lg">
            {error}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>State Name</label>
            <div className="relative">
              <MapPin size={18} className="absolute top-3 left-3 text-gray-400" />
              <select name="state" value={formData.state} onChange={handleChange} className="form-control pl-10 w-full appearance-none cursor-pointer">
                <option value="">Select State</option>
                {STATES.map(state => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>District Name</label>
            <div className="relative">
              <MapPin size={18} className="absolute top-3 left-3 text-gray-400" />
              <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.state} className="form-control pl-10 w-full appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" style={{ backgroundColor: formData.state ? 'var(--surface-solid)' : 'var(--background)' }}>
                <option value="">Select District</option>
                {formData.state && DISTRICT[formData.state]?.map(district => (
                  <option key={district} value={district}>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current/Future Year</label>
            <div className="relative">
              <Calendar size={18} className="absolute top-3 left-3 text-gray-400" />
              <input type="number" name="year" value={formData.year} onChange={handleChange} className="form-control pl-10 w-full" placeholder="e.g. 2026" />
            </div>
          </div>
          <div className="form-group">
            <label>Crop Name</label>
            <div className="relative">
              <Sprout size={18} className="absolute top-3 left-3 text-gray-400" />
              <select name="crop" value={formData.crop} onChange={handleChange} className="form-control pl-10 w-full appearance-none cursor-pointer">
                <option value="">Select Crop</option>
                {CROPS.map(op => <option key={op.value} value={op.value}>{op.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-4 py-4 text-lg" disabled={loading}>
          {loading ? (
            <IndianRupee className="spinner" size={24} />
          ) : (
            <>
              <IndianRupee size={24} /> Predict Price
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="result-card">
          <h3>Expected Price</h3>
          <div className="result-value">
            ₹{parseFloat(result).toFixed(2)}
          </div>
          <p className="text-gray-500">Estimated market value per quintal.</p>
        </div>
      )}
    </div>
  );
};

export default PricePredictionForm;
