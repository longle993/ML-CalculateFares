import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { formatInTimeZone } from 'date-fns-tz';
import kelvinToCelsius from '../utils/celsius';
import { FaTemperatureHigh } from "react-icons/fa6";
import { WiHumidity } from "react-icons/wi";
import { MdVisibility } from "react-icons/md";
import { BsSpeedometer,BsCloudsFill  } from "react-icons/bs";
import { FaWind } from "react-icons/fa";
import { LuSunrise,LuSunset  } from "react-icons/lu";
import Clock from '../components/clock';


const Weather = () => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const apiKey = 'a909bebdd9601c7069c0793acf5c48fc';
  const city = 'Texas'
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get(url);
        setWeatherData(response.data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchWeatherData();
  }, [url]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  const iconUrl = `http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`;
  const timeZone = 'America/New_York';
  const sunrise = formatInTimeZone(new Date(weatherData.sys.sunrise * 1000), timeZone, 'HH:mm:ss');
  const sunset = formatInTimeZone(new Date(weatherData.sys.sunset * 1000), timeZone, 'HH:mm:ss');

  return (
    <div className='col-3'>
      {weatherData && (
        <>
          <div className='row'>
            <h3>{city}</h3>
          </div>
          <div className='row'>
            <Clock/>
          </div>
          <div className='row'> 
            <img src={iconUrl} alt="Weather icon" />
            <h5>{kelvinToCelsius(weatherData.main.temp)}°C</h5>
          </div>
          <div className='row'>
            <h6>{weatherData.weather[0].description}</h6>
          </div>
          <div className='row'>
            <p className='high'>H: {kelvinToCelsius(weatherData.main.temp_max)} °C</p>
            <p className='low'>L: {kelvinToCelsius(weatherData.main.temp_min)} °C</p>
          </div>
          <div className='row'>
            <div className='sunrise'>
              <LuSunrise/>
              <p>{sunrise}</p>
            </div>
            <div className='sunrise'>
              <LuSunset/>
              <p>{sunset}</p>
            </div>
          </div>
          <div className='row'>
            <div className='border-content'>
              <div className='row'>
                <FaTemperatureHigh/>
                <p>FEELS LIKE</p>
              </div>
              <div className='row'>
                <p className='temp-border'>{kelvinToCelsius(weatherData.main.feels_like)} °C</p>
              </div>
            </div>
            <div className='border-content'>
                <div className='row'>
                  <WiHumidity/>
                  <p>HUMIDITY</p>
                </div>
                <div className='row'>
                  <p className='temp-border'>{weatherData.main.humidity} %</p>
                </div>
            </div>
          </div>
          <div className='row'>
            <div className='border-content'>
                <div className='row'>
                  <MdVisibility/>
                  <p>VISIBILITY</p>
                </div>
                <div className='row'>
                  <p className='temp-border'>{weatherData.visibility / 1000} km</p>
                </div>
            </div>
            <div className='border-content'>
                <div className='row'>
                  <BsSpeedometer/>
                  <p>PRESSURE</p>
                </div>
                <div className='row'>
                  <p className='temp-border'>{weatherData.main.pressure} hPa</p>
                </div>
            </div>
          </div>
          <div className='row'>
            <div className='border-content'>
                <div className='row'>
                  <FaWind/>
                  <p>WIND</p>
                </div>
                <div className='row'>
                  <p className='temp-border'>{weatherData.wind.speed} m/s</p>
                </div>
            </div>
            <div className='border-content'>
                <div className='row'>
                  <BsCloudsFill/>
                  <p>COVERAGE</p>
                </div>
                <div className='row'>
                  <p className='temp-border'>{weatherData.clouds.all} %</p>
                </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Weather;
