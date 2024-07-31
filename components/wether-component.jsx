import React, { useState, useEffect } from 'react';

export const WeatherSlider = ({ latitude, longitude }) => {
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchWeather = async () => {
    try {
      const apiKey = 'YOUR_API_KEY';
      const url = `https://api.weatherapi.com/v1/current.json?key=8ac46361c5dc4847b0c183502243107&q=${latitude},${longitude}`;
      const response = await fetch(url);
      const data = await response.json();
      setWeather(data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeather();
    }
  }, [latitude, longitude]);

  return (
    <div className="fixed inset-y-0 top-24 right-0 w-80 h-60 rounded-md bg-orange-200 shadow-lg transform transition-transform duration-300 ease-in-out p-4" id="weather-slider">
      {loading ? (
        <p>Loading weather data...</p>
      ) : weather ? (
        <div>
          <h2 className="text-xl font-bold mb-4">Weather Information</h2>
          <p className="mb-2"><strong>Location:</strong> {weather.location.name}, {weather.location.region}</p>
          <p className="mb-2"><strong>Temperature:</strong> {weather.current.temp_c}°C</p>
          <p className="mb-2"><strong>Condition:</strong> {weather.current.condition.text}</p>
          <p className="mb-2"><strong>Humidity:</strong> {weather.current.humidity}%</p>
          <p><strong>Wind Speed:</strong> {weather.current.wind_kph} kph</p>
        </div>
      ) : (
        <p>No weather data available.</p>
      )}
    </div>
  );
};

