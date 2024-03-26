import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

const API_KEY = '5afeb731819e8eb92000bd907c4ef2e7'; // Replace 'your_api_key' with your OpenWeatherMap API key

const Weather = ({ data }) => {
  return (
    <div className="weather">
      <h2>Current Weather</h2> {/* Added heading for current weather */}
      <p>Location: {data.name}, {data.sys.country}</p>
      <p>Temperature: {data.main.temp} °C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

const LocationInput = ({ onSubmit }) => {
  const [location, setLocation] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(location);
    setLocation('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter location"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        required
      />
      <button type="submit">Get Weather</button>
    </form>
  );
};

const App = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // Define setForecastData here
  const [error, setError] = useState(null);

  const fetchWeather = async (location) => {
    try {
      const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${API_KEY}&units=metric`);
      const forecastResponse = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${API_KEY}&units=metric`);
      setWeatherData(response.data);
      setForecastData(forecastResponse.data);
      setError(null);
    } catch (error) {
      setWeatherData(null);
      setForecastData(null);
      setError('Location not found. Please try again.');
    }
  };

  const Forecast = ({ forecastData }) => {
    // Filter forecast data to include only the next 5 days
    const filteredForecast = forecastData.list.filter((forecast, index) => index % 8 === 0).slice(0, 5);
  
    return (
      <div className="forecast">
        <h2>5-Day Forecast</h2>
        {filteredForecast.map((forecast, index) => (
          <div key={index} className="forecast-item">
            <p>Date: {forecast.dt_txt}</p>
            <p>Temperature: {forecast.main.temp} °C</p>
            <p>Humidity: {forecast.main.humidity}%</p>
            {/* Add additional forecast details as needed */}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>Simple Weather App</h1>
      <LocationInput onSubmit={fetchWeather} />
      {error && <p className="error">{error}</p>}
      {weatherData && <Weather data={weatherData} />}
      {forecastData && <Forecast forecastData={forecastData} />} {/* Render the Forecast component */}
    </div>
  );
};

export default App;
