import { useState } from 'react';
import { Sprout, Loader2, RotateCcw, Printer, AlertCircle } from 'lucide-react';
import { getFertilizerRecommendation } from '../services/api';

const FertilizerForm = () => {
  const [formData, setFormData] = useState({
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    crop: '',
  });
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setRecommendation(null);

    try {
      const result = await getFertilizerRecommendation({
        nitrogen: parseFloat(formData.nitrogen),
        phosphorus: parseFloat(formData.phosphorus),
        potassium: parseFloat(formData.potassium),
        crop: formData.crop.toLowerCase(),
      });
      setRecommendation(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setRecommendation(null);
    setFormData({ nitrogen: '', phosphorus: '', potassium: '', crop: '' });
    setError(null);
  };

  // 🔥 Format response into separate lines
  const rawText = recommendation?.recommendation || '';

  const formattedText = rawText.includes('1.')
    ? rawText.split(/\d+\.\s/).filter(Boolean)
    : [rawText];

  return (
    <div className="glass-panel app-card">

      {/* Header */}
      <div className="card-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full text-emerald-400 text-xs font-bold mb-4">
          <Sprout size={14} /> NUTRIENT OPTIMIZER
        </div>
        <h2>Fertilizer Guidance</h2>
        <p className="text-emerald-100/60">Analyze soil nutrients and get optimal fertilizer guidance for your crops.</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        {error && (
          <div className="error-message">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Crop */}
        <div className="form-group">
          <label>Crop Name</label>
          <div className="input-icon-wrapper">
            <Sprout size={18} className="input-icon" />
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className="form-control"
              placeholder="e.g. wheat, rice, cotton"
              required
              disabled={loading}
            />
          </div>
        </div>

        {/* NPK */}
        <div className="form-row">
          <div className="form-group">
            <label>Nitrogen (N)</label>
            <input
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              className="form-control w-full"
              placeholder="e.g. 25"
              min="0"
              step="0.1"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Phosphorus (P)</label>
            <input
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              className="form-control w-full"
              placeholder="e.g. 15"
              min="0"
              step="0.1"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Potassium (K)</label>
            <input
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              className="form-control w-full"
              placeholder="e.g. 200"
              min="0"
              step="0.1"
              required
              disabled={loading}
            />
          </div>
        </div>

        <p className="text-emerald-100/40 text-xs mt-2 uppercase tracking-wider">Note: All values should be entered in ppm (parts per million).</p>

        <button
          type="submit"
          className="btn btn-primary w-full mt-2 py-4 text-lg flex items-center justify-center gap-2"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="animate-spin" size={20} />
              Analyzing...
            </>
          ) : (
            <>
              <Sprout size={20} />
              Get Recommendation
            </>
          )}
        </button>
      </form>

      {/* RESULT */}
      {recommendation && (
        <div className="prediction-result-premium animate-fade-in mt-12 rounded-3xl p-8 relative overflow-hidden text-left">
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16 blur-2xl"></div>
          
          <div className="relative z-10">
            <div className="flex justify-between items-center mb-6">
              <div className="premium-badge">Optimized Guidance</div>
              <div className="text-emerald-200 text-xs font-bold uppercase">Ready to Implement</div>
            </div>
            
            <div className="space-y-4 mb-8">
              {formattedText.map((item, index) => (
                <div key={index} className="flex gap-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <div className="w-8 h-8 rounded-full bg-emerald-400 text-emerald-950 flex items-center justify-center font-bold flex-shrink-0">
                    {index + 1}
                  </div>
                  <p className="text-emerald-50 leading-relaxed pt-1">
                    {item.trim()}
                  </p>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={handleReset}
                className="btn bg-white/10 hover:bg-white/20 text-white border border-white/20 flex-1 py-3"
              >
                <RotateCcw size={18} /> New Analysis
              </button>
              <button
                onClick={() => window.print()}
                className="btn bg-emerald-400 hover:bg-white text-emerald-950 flex-1 py-3"
              >
                <Printer size={18} /> Export PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerForm;