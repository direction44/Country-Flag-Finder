import React, { useState } from "react";
import "./Flag.css"; // Import CSS

function Flag() {
  const [countryData, setCountryData] = useState(null);
  const [countryIs, setSelectedCountry] = useState(null);

  async function loadCountry() {
    try {
      let response = await fetch("https://restcountries.com/v2/all");
      let data = await response.json();
      setCountryData(data);
    } catch (err) {
      setCountryData(null);
    }
  }

  function findCountry(e) {
    if (!countryData) return;

    const selected = countryData.find((country) => country.name === e.target.value);
    if (selected) {
      setSelectedCountry(selected);
    }
  }

  return (
    <div className="container">
      <h1>Find Your Country Flag</h1>
      <button onClick={loadCountry}>Click to Load Countries</button>

      {countryData && (
        <select onChange={findCountry}>
          <option value="">Select a country</option>
          {countryData.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      )}

      {countryIs && (
        <div className="country-details">
          <h2>{countryIs.name}</h2>
          <img src={countryIs.flags.png} alt={countryIs.name} />
          <p>
            <strong>Capital:</strong> {countryIs.capital}
          </p>
          <p>
            <strong>Currency:</strong> {countryIs.currencies?.[0]?.name} ({countryIs.currencies?.[0]?.symbol})
          </p>
        </div>
      )}
    </div>
  );
}

export default Flag;
