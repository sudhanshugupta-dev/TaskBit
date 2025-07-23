import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [weatherData, setWeatherData] = useState(null);

  const handleChange = ({ data }) => {
    setWeatherData(data);
  };
  return (
    <AppContext.Provider value={{ weatherData, handleChange }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
};
