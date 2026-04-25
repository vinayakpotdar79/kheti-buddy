import { useState } from 'react';
import { extractSoilReport, predictCrop } from '../services/api';
import { FileImage, Upload, FlaskConical, CloudRain, Thermometer, Droplets, MapPin, Loader2, FileText, Sprout } from 'lucide-react';
import { STATES, DISTRICT } from '../constants/data';
import * as pdfjsLib from 'pdfjs-dist';
import pdfjsWorker from 'pdfjs-dist/build/pdf.worker.min.mjs?url';

// Configure PDF.js worker
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorker;

const SoilReportExtractor = () => {
  const [formData, setFormData] = useState({
    city: '',
    state: '',
    imageFile: null,
    imageUrl: ''
  });
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isPdf, setIsPdf] = useState(false);
  const [recResult, setRecResult] = useState(null);
  const [recLoading, setRecLoading] = useState(false);

  const convertPdfToImage = async (file) => {
    try {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
      const page = await pdf.getPage(1); // Get first page

      const scale = 2; // Higher scale for better quality
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context,
        viewport: viewport
      };

      await page.render(renderContext).promise;
      return canvas.toDataURL('image/png');
    } catch (error) {
      throw new Error('Failed to process PDF file. Please ensure it\'s a valid PDF.');
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const isPdfFile = file.type === 'application/pdf';
      setIsPdf(isPdfFile);

      try {
        let imageDataUrl;

        if (isPdfFile) {
          setLoading(true);
          imageDataUrl = await convertPdfToImage(file);
        } else {
          // Handle image files
          const reader = new FileReader();
          imageDataUrl = await new Promise((resolve) => {
            reader.onload = (e) => resolve(e.target.result);
            reader.readAsDataURL(file);
          });
        }

        setFormData((prev) => ({ ...prev, imageFile: file }));
        setImagePreview(imageDataUrl);
        setError(null);
      } catch (err) {
        setError(err.message);
        setFormData((prev) => ({ ...prev, imageFile: null }));
        setImagePreview(null);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'state' && { city: '' })
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setResult(null);
    setRecResult(null);

    if (!formData.city || !formData.state) {
      setError('Please select both state and city.');
      setLoading(false);
      return;
    }

    if (!formData.imageFile && !formData.imageUrl) {
      setError('Please upload an image or provide an image URL.');
      setLoading(false);
      return;
    }

    try {
      const submitData = {
        city: formData.city,
        ...(formData.imageFile && { imageBase64: imagePreview.split(',')[1] }),
        ...(formData.imageUrl && { imageUrl: formData.imageUrl })
      };

      const response = await extractSoilReport(submitData);
      if (response && response.success) {
        setResult(response);
      } else {
        setError(response?.message || 'Received an unexpected response from the server.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRecommendCrop = async () => {
    if (!result) return;
    setRecLoading(true);
    setError(null);
    try {
      const data = {
        N: parseFloat(result.N),
        P: parseFloat(result.P),
        K: parseFloat(result.K),
        ph: parseFloat(result.ph),
        temperature: result.temperature,
        humidity: result.humidity,
        rainfall: result.rainfall,
        city: formData.city
      };
      const response = await predictCrop(data);
      if (response && response.success) {
        setRecResult(response.recommended_crop);
      } else {
        setError(response?.message || 'Failed to get recommendation.');
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setRecLoading(false);
    }
  };

  const isDataComplete = result && 
    result.N !== undefined && result.N !== null && result.N !== 'Not found' &&
    result.P !== undefined && result.P !== null && result.P !== 'Not found' &&
    result.K !== undefined && result.K !== null && result.K !== 'Not found' &&
    result.ph !== undefined && result.ph !== null && result.ph !== 'Not found';

  const clearImage = () => {
    setFormData((prev) => ({ ...prev, imageFile: null, imageUrl: '' }));
    setImagePreview(null);
    setIsPdf(false);
  };

  return (
    <div className="glass-panel app-card">
      <div className="card-header">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-400/10 border border-emerald-400/20 rounded-full text-emerald-400 text-xs font-bold mb-4">
          <FileText size={14} /> SCANNER
        </div>
        <h2>Soil Analysis</h2>
        <p className="text-emerald-100/60">Upload your soil report image or PDF to extract NPK & pH values automatically.</p>
      </div>

      <form onSubmit={handleSubmit}>
        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <div className="form-row">
          <div className="form-group">
            <label>State</label>
            <div className="input-icon-wrapper">
              <MapPin size={18} className="input-icon" />
              <select name="state" value={formData.state} onChange={handleChange} className="form-control">
                <option value="" className='bg-emerald-700'>Select State</option>
                {STATES.map(st => <option key={st} value={st} className='bg-emerald-950'>{st}</option>)}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>City/District</label>
            <div className="input-icon-wrapper">
              <MapPin size={18} className="input-icon" />
              <select name="city" value={formData.city} onChange={handleChange} disabled={!formData.state} className="form-control">
                <option value="" className='bg-emerald-700'>Select City/District</option>
                {formData.state && DISTRICT[formData.state]?.map(dist => (
                  <option key={dist} value={dist} className='bg-emerald-950'>{dist}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-group">
          <label>Soil Test Report (Image or PDF)</label>
          <div className="file-upload-area">
            {!imagePreview ? (
              <div className="file-upload-content">
                {isPdf ? (
                  <FileText size={48} className="file-upload-icon" />
                ) : (
                  <FileImage size={48} className="file-upload-icon" />
                )}
                <p>Drag & drop your soil test report image or PDF here, or click to browse</p>
                <input
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  onChange={handleFileChange}
                  className="file-input"
                  id="soil-file"
                  disabled={loading}
                />
                <label htmlFor="soil-file" className="file-upload-btn">
                  <Upload size={16} /> Choose File
                </label>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
                  Supports: JPG, PNG, PDF files
                </p>
              </div>
            ) : (
              <div className="image-preview">
                <img src={imagePreview} alt="Soil test report" className="preview-image" />
                <div className="file-type-indicator">
                  {isPdf ? <FileText size={20} /> : <FileImage size={20} />}
                  <span>{isPdf ? 'PDF' : 'Image'}</span>
                </div>
                <button type="button" onClick={clearImage} className="clear-image-btn">
                  ✕ Remove
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="form-group">
          <label>Or provide Image URL (optional)</label>
          <input
            type="url"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="form-control"
            placeholder="https://example.com/soil-report.jpg"
            disabled={!!formData.imageFile}
          />
        </div>

        <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem', padding: '1rem', fontSize: '1.1rem' }} disabled={loading}>
          {loading ? (
            <Loader2 className="spinner" size={24} />
          ) : (
            <>
              <FlaskConical size={24} /> Analyze Soil Report
            </>
          )}
        </button>
      </form>

      {result && (
        <div className="analysis-results animate-slide-up">
          <div className="section-divider">
            <span>Soil Analysis Results</span>
          </div>

          <div className="soil-values-grid">
            <div className="soil-value-card glass-card">
              <div className="card-icon n-icon">
                <FlaskConical size={24} />
              </div>
              <div className="value-content">
                <span className="value-label">Nitrogen (N)</span>
                <span className="value-number">{result.N ?? 'Not found'}</span>
              </div>
              <div className="extracted-badge">Extracted</div>
            </div>
            <div className="soil-value-card glass-card">
              <div className="card-icon p-icon">
                <FlaskConical size={24} />
              </div>
              <div className="value-content">
                <span className="value-label">Phosphorus (P)</span>
                <span className="value-number">{result.P ?? 'Not found'}</span>
              </div>
              <div className="extracted-badge">Extracted</div>
            </div>
            <div className="soil-value-card glass-card">
              <div className="card-icon k-icon">
                <FlaskConical size={24} />
              </div>
              <div className="value-content">
                <span className="value-label">Potassium (K)</span>
                <span className="value-number">{result.K ?? 'Not found'}</span>
              </div>
              <div className="extracted-badge">Extracted</div>
            </div>
            <div className="soil-value-card glass-card">
              <div className="card-icon ph-icon">
                <FlaskConical size={24} />
              </div>
              <div className="value-content">
                <span className="value-label">pH Level</span>
                <span className="value-number">{result.ph ?? 'Not found'}</span>
              </div>
              <div className="extracted-badge">Extracted</div>
            </div>
          </div>

          <div className="weather-info-section">
            <div className="section-header">
              <CloudRain size={20} />
              <h4>Environmental Conditions</h4>
            </div>
            <div className="weather-cards">
              <div className="weather-card weather-card-temp">
                <div className="weather-card-header">
                  <Thermometer size={18} />
                  <span className="weather-card-label">Temperature</span>
                </div>
                <div className="weather-card-value">
                  {result.temperature}°C
                </div>
              </div>
              <div className="weather-card weather-card-humidity">
                <div className="weather-card-header">
                  <Droplets size={18} />
                  <span className="weather-card-label">Humidity</span>
                </div>
                <div className="weather-card-value">
                  {result.humidity}%
                </div>
              </div>
              <div className="weather-card weather-card-rain">
                <div className="weather-card-header">
                  <CloudRain size={18} />
                  <span className="weather-card-label">Rainfall</span>
                </div>
                <div className="weather-card-value">
                  {result.rainfall} mm
                </div>
              </div>
            </div>
          </div>

          <div className="recommendation-cta-section mt-10">
            {!recResult ? (
              <div className={`cta-container glass-panel ${!isDataComplete ? 'border-red-500/30' : 'border-emerald-500/30'}`}>
                <div className="cta-text">
                  <h4 className="text-white font-bold">
                    {isDataComplete ? 'Extract Complete' : 'Extraction Incomplete'}
                  </h4>
                  <p className={isDataComplete ? 'text-emerald-100/70' : 'text-red-300/80'}>
                    {isDataComplete 
                      ? 'Ready to see which crop fits these soil conditions best?' 
                      : 'Crop recommendation not possible: Some soil nutrients were not found in the report.'}
                  </p>
                </div>
                <button
                  className={`btn ${isDataComplete ? 'btn-primary pulse-animation' : 'bg-white/5 text-white/40 cursor-not-allowed border-white/10'}`}
                  onClick={isDataComplete ? handleRecommendCrop : undefined}
                  disabled={recLoading || !isDataComplete}
                  style={{ opacity: isDataComplete ? 1 : 0.6 }}
                >
                  {recLoading ? (
                    <Loader2 className="spinner" size={24} />
                  ) : (
                    <>
                      <Sprout size={20} /> Recommend Crop
                    </>
                  )}
                </button>
              </div>
            ) : (
              <div className="prediction-result-premium animate-fade-in mt-6 rounded-3xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-24 h-24 bg-white/5 rounded-full -mr-12 -mt-12 blur-xl"></div>
                <div className="flex flex-col items-center text-center relative z-10">
                  <div className="premium-badge mb-4">Precision Suggestion</div>
                  <div className="prediction-icon-wrapper mb-4 scale-90">
                    <Sprout size={48} className="prediction-icon" />
                  </div>
                  <div className="prediction-text">
                    <span className="prediction-label text-emerald-100/80">Best Match Found</span>
                    <h2 className="prediction-value text-white text-4xl md:text-5xl">{recResult}</h2>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default SoilReportExtractor;