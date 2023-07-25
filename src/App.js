import { useEffect, useState } from 'react';
import Axios from 'axios';
import './App.css';

function App() {
  const [ipDetails, setIpDetails] = useState({});
  const [lat, setLat] = useState(22.5726);
  const [lon, setLon] = useState(88.3832);
  const [searchIp, setSearchIp] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchIpDetails();
  }, []);

  const fetchIpDetails = (ip = '') => {
    setError('');
    Axios.get(`https://ipapi.co/${ip}/json/`)
      .then((res) => {
        if (res.data.error) {
          setError('IP Not Found -- Please try again');
          setIpDetails({});
          setLat(null);
          setLon(null);
        } else {
          setIpDetails(res.data);
          setLat(res.data.latitude);
          setLon(res.data.longitude);
        }
      })
      .catch((err) => {
        setError('Ip wrong');
        setIpDetails({}); 
        setLat(null);
        setLon(null);
      });
  };

  const handleSearch = () => {
    fetchIpDetails(searchIp);
  };

  return (
    <>
    <main>
      <h1 className="heading">IP Address Finder</h1>
      <div className='search'>
        <h4>Search IP Address:</h4>
        <input
          type="text"
          value={searchIp}
          onChange={(e) => setSearchIp(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="App">
        {error && <div className="error">{error}</div>}
        {!error && !ipDetails.error && Object.keys(ipDetails).length > 0 && (
          <div className="left">
            <h4>What is my IPv6 address?</h4>
            <h1 id="ip">{ipDetails.ip}</h1>
            <h4>Approximate location:</h4>
            <p>
              {ipDetails.city}, {ipDetails.region}, {ipDetails.country_name}.
            </p>
            <h4>Internet Service Provider (ISP):</h4>
            <p>{ipDetails.org}</p>
            <h4>Time Zone:</h4>
            <p>UTC {ipDetails.utc_offset}</p>
          </div>
        )}
        {!error && !ipDetails.error && Object.keys(ipDetails).length === 0 && (
          <div className="info">No data available</div>
        )}
        <div className='right'>
          {!error && !ipDetails.error && Object.keys(ipDetails).length > 0 && (
            <a href={`https://www.google.com/maps?q=${lat},${lon}`}>
              View Geo-Location on Google Maps
            </a>
          )}
        </div>
      </div>
      </main>
    </>
  );
}

export default App;
