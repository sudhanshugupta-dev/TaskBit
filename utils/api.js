// const API_KEY = "4cd569ffb3ecc3bffe9c0587ff02109f";

// export const getWeatherData = async (lat, lon) => {
//   const currentWeather = await fetch(
//     `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//   ).then(res => res.json());

// //   const forecast = await fetch(
// //     `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,alerts&appid=${API_KEY}`
// //   ).then(res => res.json());


//    const forecast = await fetch(
//     `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
//   ).then(res => res.json());

//   return { currentWeather, forecast };
// };


const API_KEY = "4cd569ffb3ecc3bffe9c0587ff02109f";

// Get current weather
export const getCurrentWeather = async (lat, lon) => {
   
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();
  return data;
};

// Get forecast data
export const getForecast = async (lat, lon) => {
    
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}`
  );
  const data = await response.json();

  return data;
};
