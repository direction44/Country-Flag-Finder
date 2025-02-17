import React, { useState } from "react";
import "./Flag.css";

function Flag() {
  const [countryData, setCountryData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedCountry, setSelectedCountry] = useState(null);

  async function loadCountry() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("https://restcountries.com/v2/all"); 
      if (!response.ok) {
        throw new Error("Failed to load countries. Try again later.");
      }
      const data = await response.json();
      setCountryData(data);
    } catch (err) {
      setError(
        err.message.includes("Failed to fetch")
          ? "No internet connection."
          : "Something went wrong. Please try again."
      );
      setCountryData(null);
    } finally {
      setLoading(false);
    }
  }

  function findCountry(e) {
    if (!countryData) return;
    const selected = countryData.find((country) => country.name === e.target.value);
    setSelectedCountry(selected || null);
  }

  return (
    <div className="container">
      <h1>Find Your Country Flag</h1>
      <button onClick={loadCountry} disabled={loading}>
        {loading ? "Loading..." : "Load Countries"}
      </button>

      {error && (
        <div className="error-message">
          <p>{error}</p>
        </div>
      )}

      {countryData && (
        <select onChange={findCountry} defaultValue="">
          <option value="" disabled>Select a country</option>
          {countryData.map((country, index) => (
            <option key={index} value={country.name}>
              {country.name}
            </option>
          ))}
        </select>
      )}

      {selectedCountry && (
        <div className="country-details">
          <h2>{selectedCountry.name}</h2>
          <img src={selectedCountry.flags?.png} alt={selectedCountry.name} />
          <p>
            <strong>Capital:</strong> {selectedCountry.capital || "N/A"}
          </p>
          <p>
            <strong>Currency:</strong>{" "}
            {selectedCountry.currencies?.[0]?.name
              ? `${selectedCountry.currencies[0].name} (${selectedCountry.currencies[0].symbol})`
              : "N/A"}
          </p>
        </div>
      )}
    </div>
  );
}

export default Flag;
