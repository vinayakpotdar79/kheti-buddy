import { useState } from 'react';
import { getPricePrediction } from '../services/api';
import './PricePrediction.css';

const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Orissa', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

const DISTRICT = {
  'Maharashtra': ['Ahmednagar', 'Akola', 'Amarawati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Solapur', 'Thane', 'Wardha', 'Yeotmal', 'Yavatmal'],
  'Punjab': ['Amritsar', 'Bhatinda', 'Ferozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Moga', 'Patiala', 'Roopnagar / Ropar', 'Sangrur'],
  'Karnataka': ['Bagalkot', 'Bangalore', 'Belgaum', 'Bellary', 'Bidar', 'Chitradurga', 'Dakshina Kannada', 'Dharwad', 'Gulbarga / Kalaburagi', 'Hassan', 'Kolar', 'Koppal', 'Mandya', 'Mysore', 'Raichur', 'Shimoge', 'Tumkur', 'Uttara Kannada'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Dangs', 'Kutch', 'Mehsana', 'Panchmahal', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Vadodara / Baroda', 'Valsad'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Azamgarh', 'Bahraich', 'Ballia', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Buland Shahar', 'Chandauli', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hardoi', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kanpur', 'Kheri', 'Lakhimpur', 'Lucknow', 'Mainpuri', 'Mathura', 'Meerut', 'Mirzpur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae-Bareily', 'Rampur', 'Saharanpur', 'Shahjahanpur', 'Sitapur', 'Unnao', 'Varanasi'],
  'Madhya Pradesh': ['Balaghat', 'Betul', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Guna', 'Gwalior', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khargone / West Nimar', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni / Shivani', 'Shahdol', 'Shajapur', 'Shivpuri', 'Sidhi', 'Tikamgarh', 'Ujjain', 'Vidisha'],
  'West Bengal': ['24 Parganas', 'Bankura', 'Bardhaman', 'Birbhum', 'Burdwan', 'Cooch Behar', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'Purnea', 'Midnapur'],
  'Tamil Nadu': ['Chengalpattu MGR / Kanchipuram', 'Coimbatore', 'Madurai', 'North Arcot / Vellore', 'Salem', 'South Arcot / Cuddalore', 'Thanjavur', 'Thirunelveli', 'Tiruchirapalli / Trichy'],
  'Bihar': ['Bhagalpur', 'Darbhanga', 'Gaya', 'Gopalganj', 'Mungair', 'Muzaffarpur', 'Patna', 'Saran', 'Sitapur'],
  'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dungarpur', 'Ganganagar', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Rajsamand', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
  'Haryana': ['Ambala', 'Bhiwani', 'Gurgaon', 'Hissar', 'Jind', 'Karnal', 'Kurukshetra', 'Mahendragarh / Narnaul', 'Rohtak'],
  'Andhra Pradesh': ['Ananthapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa YSR', 'Krishna', 'Kurnool', 'S.P.S. Nellore', 'Visakhapatnam', 'West Godavari'],
  'Telangana': ['Adilabad', 'Karimnagar', 'Khammam', 'Medak', 'Nizamabad', 'Warangal'],
  'Kerala': ['Alappuzha', 'Eranakulam', 'Kannur', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thiruvananthapuram', 'Thrissur'],
  'Orissa': ['Balangir', 'Baleswar', 'Bargarh', 'Bolangir', 'Cuttack', 'Dhenkanal', 'Ganjam', 'Kalahandi', 'Keonjhar', 'Koraput', 'Mayurbhanja', 'Puri', 'Sambalpur', 'Sundargarh'],
  'Assam': ['Cachar', 'Darrang', 'Dibrugarh', 'Goalpara', 'Kamrup', 'Nagaon', ' Sibsagar', 'Sonitpur'],
  'Chhattisgarh': ['Bilaspur', 'Bastar', 'Durg', 'Dhamtari', 'Kabirdham', 'Kanker', 'Korba', 'Mahasamund', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Surguja'],
  'Jharkhand': ['Bokaro', 'Dhanbad', 'Giridih', 'Hazaribagh', 'Ranchi', 'Santal Paragana / Dumka'],
  'Uttarakhand': ['Almora', 'Chamoli', 'Dehradun', 'Garhwal', 'Nainital', 'Pithorgarh', 'Tehri Garhwal', 'Uttar Kashi'],
  'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Mandi', 'Shimla', 'Solan']
};

const CROPS = [
  { label: 'Rice', value: 'RICE HARVEST PRICE (Rs per Quintal)' },
  { label: 'Paddy', value: 'PADDY HARVEST PRICE (Rs per Quintal)' },
  { label: 'Wheat', value: 'WHEAT HARVEST PRICE (Rs per Quintal)' },
  { label: 'Sorghum', value: 'SORGHUM HARVEST PRICE (Rs per Quintal)' },
  { label: 'Pearl Millet', value: 'PEARL MILLET HARVEST PRICE (Rs per Quintal)' },
  { label: 'Finger Millet', value: 'FINGER MILLET HARVEST PRICE (Rs per Quintal)' },
  { label: 'Barley', value: 'BARLEY HARVEST PRICE (Rs per Quintal)' },
  { label: 'Chickpea', value: 'CHICKPEA HARVEST PRICE (Rs per Quintal)' },
  { label: 'Pigeonpea', value: 'PIGEONPEA HARVEST PRICE (Rs per Quintal)' },
  { label: 'Groundnut', value: 'GROUNDNUT HARVEST PRICE (Rs per Quintal)' },
  { label: 'Sesamum', value: 'SEASMUM HARVEST PRICE (Rs per Quintal)' },
  { label: 'Rapeseed & Mustard', value: 'RAPE AND MUSTARD HARVEST PRICE (Rs per Quintal)' },
  { label: 'Castor', value: 'CASTOR HARVEST PRICE (Rs per Quintal)' },
  { label: 'Linseed', value: 'LINSEED HARVEST PRICE (Rs per Quintal)' },
  { label: 'Sugarcane', value: 'SUGARCANE GUR HARVEST PRICE (Rs per Quintal)' },
  { label: 'Cotton', value: 'COTTON KAPAS HARVEST PRICE (Rs per Quintal)' },
  { label: 'Maize', value: 'MAIZE HARVEST PRICE (Rs per Quintal)' }
];

function PricePrediction() {
  const [formData, setFormData] = useState({
    state: 'Maharashtra',
    district: 'Pune',
    year: 2024,
    crop: CROPS[0].value
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'state') {
      setFormData({ ...formData, state: value, district: DISTRICT[value]?.[0] || '' });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setResult(null);

    try {
      const response = await getPricePrediction({
        ...formData,
        year: parseInt(formData.year)
      });
      setResult(response.predicted_price);
    } catch (err) {
      setError(err.response?.data?.detail || err.message || 'Failed to get price prediction');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <div className="form-card">
        <h1>Price Prediction</h1>
        <p className="subtitle">Predict crop prices based on location and year</p>

        <form onSubmit={handleSubmit}>
          <div className="form-stack">
            <div className="form-group">
              <label>State</label>
              <select name="state" value={formData.state} onChange={handleChange}>
                {STATES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>District</label>
              <select name="district" value={formData.district} onChange={handleChange}>
                {(DISTRICT[formData.state] || []).map(d => <option key={d} value={d}>{d}</option>)}
              </select>
            </div>

            <div className="form-group">
              <label>Year</label>
              <input type="number" name="year" min="2000" max="2030" value={formData.year} onChange={handleChange} />
            </div>

            <div className="form-group">
              <label>Crop</label>
              <select name="crop" value={formData.crop} onChange={handleChange}>
                {CROPS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
              </select>
            </div>
          </div>

          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? 'Predicting...' : 'Predict Price'}
          </button>
        </form>

        {error && <div className="error">{error}</div>}

        {result !== null && (
          <div className="result">
            <h2>Predicted Price</h2>
            <div className="price">₹{result.toFixed(2)}</div>
            <p className="price-unit">per quintal</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default PricePrediction;
