const API_KEY = "4cd569ffb3ecc3bffe9c0587ff02109f";

export const getWeather = async (lat, lon, status) => {
  console.log(lat, "lat", lon, "lon", status);
  const uri = `https://api.openweathermap.org/data/2.5/${status}?lat=${lat}&lon=${lon}&appid=${API_KEY}`;
  try {
    const response = await fetch(uri);
    if (!response.ok) throw new Error("Failed to fetch weather");
    return await response.json();
  } catch (error) {
    console.error("getWeather error:", error);
    return null;
  }
};
