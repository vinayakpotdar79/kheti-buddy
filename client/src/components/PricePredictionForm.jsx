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
  const [reasoning, setReasoning] = useState(null);
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
    setReasoning(null);

    const yearStr = formData.year ? formData.year.toString().trim() : '';
    const stateStr = formData.state ? formData.state.trim() : '';
    const districtStr = formData.district ? formData.district.trim() : '';
    const cropStr = formData.crop ? formData.crop.trim() : '';

    // Basic validation
    if(formData.year< new Date().getFullYear()){
      setError('Please enter a current or future year.');
      setLoading(false);
      return;
    }
  
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
        setReasoning(response.reasoning);
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
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full text-emerald-400 text-xs font-bold mb-4">
          <IndianRupee size={14} /> MARKET TRENDS
        </div>
        <h2>Price Predictor</h2>
        <p className="text-emerald-100/60">Estimate the expected price of a crop based on historical data and region.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>State Name</label>
            <div className="input-icon-wrapper">
              <MapPin size={18} className="input-icon" />
              <select name="state" value={formData.state} onChange={handleChange} className="form-control appearance-none cursor-pointer">
                <option value="" className='bg-emerald-700'>Select State</option>
                {STATES.map(state => <option key={state} value={state} className='bg-emerald-950'>{state}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>District Name</label>
            <div className="input-icon-wrapper">
              <MapPin size={18} className="input-icon" />
              <select name="district" value={formData.district} onChange={handleChange} disabled={!formData.state} className="form-control appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                <option value="" className='bg-emerald-700'>Select District</option>
                {formData.state && DISTRICT[formData.state]?.map(district => (
                  <option key={district} value={district} className='bg-emerald-950'>{district}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Current/Future Year</label>
            <div className="input-icon-wrapper">
              <Calendar size={18} className="input-icon" />
              <input type="number" name="year" value={formData.year} onChange={handleChange} className="form-control" placeholder="e.g. 2026" />
            </div>
          </div>
          <div className="form-group">
            <label>Crop Name</label>
            <div className="input-icon-wrapper">
              <Sprout size={18} className="input-icon" />
              <select name="crop" value={formData.crop} onChange={handleChange} className="form-control appearance-none cursor-pointer">
                <option value="" className='bg-emerald-700'>Select Crop</option>
                {CROPS.map(op => <option key={op.value} value={op.value} className='bg-emerald-950'>{op.label}</option>)}
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
        <>
          <div className="prediction-result-premium animate-fade-in mt-12 rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <div className="flex flex-col items-center text-center relative z-10">
              <div className="premium-badge mb-6">Market Analysis Ready</div>
              <div className="prediction-icon-wrapper mb-6 scale-110">
                <IndianRupee size={56} className="prediction-icon" />
              </div>
              <div className="prediction-text">
                <span className="prediction-label text-emerald-200">Expected Market Price</span>
                <h2 className="prediction-value text-white text-5xl md:text-6xl">₹{parseFloat(result).toFixed(2)}</h2>
              </div>
              <div className="prediction-footer mt-8 pt-6 border-t border-white/20 w-full max-w-md">
                <p className="text-emerald-50 opacity-90">
                  Estimated market value per quintal for <strong>{formData.crop}</strong> in {formData.district}, {formData.state} for the year {formData.year}.
                </p>
              </div>
            </div>
          </div>

          {reasoning && (
            <div className="reasoning-panel animate-fade-in">
              <div className="reasoning-header">
                <div className="reasoning-badge">AI Insights</div>
                <h3 className="reasoning-title">Why this price?</h3>
              </div>
              <div className="reasoning-content">
                {reasoning}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default PricePredictionForm;
