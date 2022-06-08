import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryDetails from './components/CountryDetails';

function App() {

  const [countries, setCountries] = useState([]);
  const [searchString, setSearchString] = useState('');
  const [showDetails, setShowDetails] = useState(false);
  const [country, setCountry] = useState({});
  const [weather, setWeather] = useState({});

  useEffect(() => {
    axios
      .get('https://restcountries.com/v3.1/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [searchString])

 

  const handleSearch = (event) => {
    setSearchString(event.target.value)
  }

  function showCountry(c) {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?lat=${c.capitalInfo.latlng[0]}&lon=${c.capitalInfo.latlng[1]}&units=metric&appid=${process.env.REACT_APP_API_KEY}`)
      .then(response => {
        setWeather(response.data)
        setShowDetails(true);
        setCountry(c);
        setSearchString('')
      })
  }


  const newCountries = countries.filter(c => c.name.common.toLowerCase().includes(searchString.toLowerCase()))

  if (newCountries.length === 1) {
    showCountry(newCountries[0])
  }

  return (
    <div className="App">

      <div>
        find countries: <input type='text' value={searchString} onChange={handleSearch} />
      </div>
      {showDetails === true ?
        <CountryDetails country={country} weather={weather} />
        : <div>
          {newCountries.length > 10 ? 'Too many matches, specify another filter' :
            newCountries.map(c =>
              <div key={c.name.common}>{c.name.common} <button onClick={() => showCountry(c)}>show</button></div>
            )
          }
        </div>}

    </div>
  );
}

export default App;
