export const STATES = [
  'Andhra Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Gujarat', 'Haryana',
  'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh',
  'Maharashtra', 'Orissa', 'Punjab', 'Rajasthan', 'Tamil Nadu', 'Telangana',
  'Uttar Pradesh', 'Uttarakhand', 'West Bengal'
];

export const DISTRICT = {
  'Maharashtra': ['Ahmednagar', 'Akola', 'Amarawati', 'Aurangabad', 'Beed', 'Bhandara', 'Buldhana', 'Chandrapur', 'Dhule', 'Gadchiroli', 'Gondia', 'Hingoli', 'Jalgaon', 'Jalna', 'Kolhapur', 'Latur', 'Nagpur', 'Nanded', 'Nandurbar', 'Nashik', 'Osmanabad', 'Parbhani', 'Pune', 'Raigad', 'Ratnagiri', 'Sangli', 'Satara', 'Solapur', 'Thane', 'Wardha', 'Yeotmal', 'Yavatmal'],
  'Punjab': ['Amritsar', 'Bhatinda', 'Ferozpur', 'Gurdaspur', 'Hoshiarpur', 'Jalandhar', 'Kapurthala', 'Ludhiana', 'Moga', 'Patiala', 'Roopnagar / Ropar', 'Sangrur'],
  'Karnataka': ['Bagalkot', 'Bangalore', 'Belgaum', 'Bellary', 'Bidar', 'Chitradurga', 'Dakshina Kannada', 'Dharwad', 'Gulbarga / Kalaburagi', 'Hassan', 'Kolar', 'Koppal', 'Mandya', 'Mysore', 'Raichur', 'Shimoge', 'Tumkur', 'Uttara Kannada'],
  'Gujarat': ['Ahmedabad', 'Amreli', 'Anand', 'Banaskantha', 'Bharuch', 'Bhavnagar', 'Dangs', 'Kutch', 'Mehsana', 'Panchmahal', 'Rajkot', 'Sabarkantha', 'Surat', 'Surendranagar', 'Vadodara / Baroda', 'Valsad'],
  'Uttar Pradesh': ['Agra', 'Aligarh', 'Allahabad', 'Azamgarh', 'Bahraich', 'Ballia', 'Barabanki', 'Bareilly', 'Basti', 'Bijnor', 'Buland Shahar', 'Chandauli', 'Deoria', 'Etah', 'Etawah', 'Faizabad', 'Farrukhabad', 'Fatehpur', 'Ghazipur', 'Gonda', 'Gorakhpur', 'Hardoi', 'Jalaun', 'Jaunpur', 'Jhansi', 'Kanpur', 'Kheri', 'Lakhimpur', 'Lucknow', 'Mainpuri', 'Mathura', 'Meerut', 'Mirzpur', 'Moradabad', 'Muzaffarnagar', 'Pilibhit', 'Pratapgarh', 'Rae-Bareily', 'Rampur', 'Saharanpur', 'Shahjahanpur', 'Sitapur', 'Unnao', 'Varanasi'],
  'Madhya Pradesh': ['Balaghat', 'Betul', 'Bhopal', 'Burhanpur', 'Chhatarpur', 'Chhindwara', 'Damoh', 'Datia', 'Dewas', 'Dhar', 'Guna', 'Gwalior', 'Hoshangabad', 'Indore', 'Jabalpur', 'Jhabua', 'Katni', 'Khargone / West Nimar', 'Mandla', 'Mandsaur', 'Morena', 'Narsinghpur', 'Panna', 'Raisen', 'Rajgarh', 'Ratlam', 'Rewa', 'Sagar', 'Satna', 'Sehore', 'Seoni / Shivani', 'Shahdol', 'Shajapur', 'Shivpuri', 'Sidhi', 'Tikamgarh', 'Ujjain', 'Vidisha'],
  'West Bengal': ['24 Parganas', 'Bankura', 'Bardhaman', 'Birbhum', 'Burdwan', 'Cooch Behar', 'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia', 'Purnea', 'Midnapur'],
  'Tamil Nadu': ['Chengalpattu MGR / Kanchipuram', 'Coimbatore', 'Madurai', 'North Arcot / Vellore', 'Salem', 'South Arcot / Cuddalore', 'Thanjavur', 'Thirunelveli', 'Tiruchirapalli / Trichy'],
  'Bihar': ['Bhagalpur', 'Darbhanga', 'Gaya', 'Muzaffarpur', 'Patna', 'Saran', 'Sitapur'],
  'Rajasthan': ['Ajmer', 'Alwar', 'Banswara', 'Barmer', 'Bharatpur', 'Bhilwara', 'Bikaner', 'Bundi', 'Chittorgarh', 'Churu', 'Dungarpur', 'Ganganagar', 'Jaipur', 'Jaisalmer', 'Jalore', 'Jhalawar', 'Jhunjhunu', 'Jodhpur', 'Kota', 'Nagaur', 'Pali', 'Rajsamand', 'Sikar', 'Sirohi', 'Tonk', 'Udaipur'],
  'Haryana': ['Ambala', 'Bhiwani', 'Gurgaon', 'Hissar', 'Jind', 'Karnal', 'Kurukshetra', 'Mahendragarh / Narnaul', 'Rohtak'],
  'Andhra Pradesh': ['Ananthapur', 'Chittoor', 'East Godavari', 'Guntur', 'Kadapa YSR', 'Krishna', 'Kurnool', 'S.P.S. Nellore', 'Visakhapatnam', 'West Godavari'],
  'Telangana': ['Adilabad', 'Karimnagar', 'Khammam', 'Medak', 'Nizamabad', 'Warangal'],
  'Kerala': ['Alappuzha', 'Eranakulam', 'Kannur', 'Kollam', 'Kottayam', 'Kozhikode', 'Malappuram', 'Palakkad', 'Thiruvananthapuram', 'Thrissur'],
  'Orissa': ['Balangir', 'Baleswar', 'Bargarh', 'Bolangir', 'Cuttack', 'Dhenkanal', 'Ganjam', 'Kalahandi', 'Keonjhar', 'Koraput', 'Mayurbhanja', 'Puri', 'Sambalpur', 'Sundargarh'],
  'Assam': ['Cachar', 'Darrang', 'Dibrugarh', 'Goalpara', 'Kamrup', 'Nagaon', 'Sibsagar', 'Sonitpur'],
  'Chhattisgarh': ['Bilaspur', 'Bastar', 'Durg', 'Dhamtari', 'Kabirdham', 'Kanker', 'Korba', 'Mahasamund', 'Raigarh', 'Raipur', 'Rajnandgaon', 'Surguja'],
  'Jharkhand': ['Bokaro', 'Dhanbad', 'Giridih', 'Hazaribagh', 'Ranchi', 'Santhal Paragana / Dumka'],
  'Uttarakhand': ['Almora', 'Chamoli', 'Dehradun', 'Garhwal', 'Nainital', 'Pithorgarh', 'Tehri Garhwal', 'Uttar Kashi'],
  'Himachal Pradesh': ['Bilaspur', 'Chamba', 'Hamirpur', 'Kangra', 'Kinnaur', 'Kullu', 'Mandi', 'Shimla', 'Solan']
};

export const CROPS = [
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
