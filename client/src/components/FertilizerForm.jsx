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
        <h2>Fertilizer Recommendation</h2>
        <p>Analyze soil nutrients and get optimal fertilizer guidance.</p>
      </div>

      {/* FORM */}
      <form onSubmit={handleSubmit}>

        {error && (
          <div className="bg-red-50 border border-red-500 p-4 text-red-500 mb-6 rounded-lg flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {/* Crop */}
        <div className="form-group">
          <label>Crop Name</label>
          <div className="relative">
            <Sprout size={18} className="absolute top-3 left-3 text-gray-400" />
            <input
              type="text"
              name="crop"
              value={formData.crop}
              onChange={handleChange}
              className="form-control pl-10 w-full"
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

        <p className="text-gray-500 text-sm mb-4">All values are in ppm.</p>

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
        <div className="result-card mt-6">
          <h3>Fertilizer Recommendation</h3>

          <div className="text-sm text-gray-600 leading-relaxed space-y-2">
            {formattedText.map((item, index) => (
              <p key={index}>
                <strong>{index + 1}. </strong>
                {item.trim()}
              </p>
            ))}
          </div>

          <div className="flex gap-3 mt-4">
            <button
              onClick={handleReset}
              className="btn btn-primary w-full py-3 flex items-center justify-center gap-2"
            >
              <RotateCcw size={16} />
              Try another
            </button>

            <button
              onClick={() => window.print()}
              className="btn w-full py-3 border border-gray-300 flex items-center justify-center gap-2"
            >
              <Printer size={16} />
              Print
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FertilizerForm;