export const kelvinToCelsius = (temp) => (temp - 273.15).toFixed(1);

export const unixToTime = (dt) => {
  const date = new Date(dt * 1000);
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const unixToDate = (dt) => {
  const date = new Date(dt * 1000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    day: "2-digit",
    month: "short",
  });
};
