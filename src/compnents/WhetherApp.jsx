import React, { useState, useEffect } from 'react';
import './WeatherApp.css'
const WeatherApp = () => {
    const [city, setCity] = useState('Addis Ababa'); // Initialize with Addis Ababa
    const [weatherData, setWeatherData] = useState({});
    const [error, setError] = useState('');

    useEffect(() => {
        fetchWeatherData(city);
    }, [city]);

    const fetchWeatherData = async (city) => {
        const apiKey = 'bb5b9f733054469155446726c61c429d'; // Your API key
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        try {
            const response = await fetch(url);
            if (!response.ok) throw new Error('Bro, your city not found');
            const data = await response.json();
            setWeatherData(data);
            setError('');
        } catch (error) {
            setError(error.message);
            setWeatherData({});
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    return (
        <div className="weather-container">
            <h1 className='app'>Weather App</h1>
            <form className="search-bar" onSubmit={handleSearch}>
                <input
                    type="text"
                    placeholder="Search for a city..."
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>
            {error && <p className="error">{error}</p>}
            {weatherData.main && (
                <>
                    <img
                        src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}.png`}
                        alt="Weather Icon"
                        className="weather-image"
                    />
                    <div className="description">
                        <h2>{weatherData.name}</h2>
                        <h1>{Math.round(weatherData.main.temp)}°C</h1>
                        <p className='des'>{weatherData.weather[0].description}</p>
                    </div>
                    <div className="additional-info">
                        <div className="info-item">
                            <strong>Wind Speed:</strong> {weatherData.wind.speed}km/h
                        </div>
                        <div className="info-item">
                            <strong>Humidity:</strong> {weatherData.main.humidity}%
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default WeatherApp;