import React, { useState } from 'react';

export const Search = ({ onSelectLocation }) => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  const handleSearch = async (e) => {
    const searchQuery = e.target.value;
    setQuery(searchQuery);

    if (searchQuery.length > 2) {
      try {
        const response = await fetch(`https://api.weatherapi.com/v1/search.json?key=8ac46361c5dc4847b0c183502243107&q=${searchQuery}`);
        const data = await response.json();
        setSuggestions(data);
      } catch (error) {
        console.error('Error fetching location data:', error);
      }
    } else {
      setSuggestions([]);
    }
  };

  const handleSelect = (location) => {
    onSelectLocation(location.lat, location.lon);
    setQuery(location.name);
    setSuggestions([]);
  };

  return (
    <div className="w-full p-4 bg-white rounded shadow-md">
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Search for a city..."
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      {suggestions.length > 0 && (
        <ul className="list-none p-0 m-0">
          {suggestions.map((suggestion) => (
            <li
              key={suggestion.id}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelect(suggestion)}
            >
              {suggestion.name}, {suggestion.region}, {suggestion.country}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

