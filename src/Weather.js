import React from 'react';

const Weather = ({ data }) => {
  return (
    <div className="weather">
      <h2>Current Weather</h2>
      <p>Location: {data.name}, {data.sys.country}</p>
      <p>Temperature: {data.main.temp} °C</p>
      <p>Humidity: {data.main.humidity}%</p>
      <p>Wind Speed: {data.wind.speed} m/s</p>
    </div>
  );
};

export default Weather;
