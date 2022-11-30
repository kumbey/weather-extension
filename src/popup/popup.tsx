import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import "@fontsource/roboto";
import "./popup.css";
import WeatherCard from "./WeatherCard/WeatherCard";
import { Box, Grid, IconButton, InputBase, Paper } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { getStoredCities, setStoredCities } from "../utils/storage";

const App: React.FC = () => {
  const [cities, setCities] = useState<string[]>([]);
  const [cityInput, setCityInput] = useState<string>("");

  const handleCityBtnClick = () => {
    if (cityInput === "") {
      return;
    }
    const updatedCities = [...cities, cityInput];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
      setCityInput("");
    });
  };

  const handleCityDeleteBtnClick = (index: number) => {
    cities.splice(index, 1);
    const updatedCities = [...cities];
    setStoredCities(updatedCities).then(() => {
      setCities(updatedCities);
    });
  };

  useEffect(() => {
    getStoredCities().then((cities) => setCities(cities));
  }, []);

  return (
    <Box mx={"4px"} my={"16px"}>
      <Grid container>
        <Grid item marginLeft={"4px"}>
          <Paper>
            <Box px={"16px"} py={"5px"}>
              <InputBase
                autoFocus
                placeholder="Add a city name"
                value={cityInput}
                onChange={(e) => setCityInput(e.target.value)}
                onKeyDown={(ev) => {
                  if (ev.keyCode == 13) {
                    handleCityBtnClick();
                  }
                }}
              />
              <IconButton onClick={handleCityBtnClick}>
                <AddIcon />
              </IconButton>
            </Box>
          </Paper>
        </Grid>
      </Grid>
      {cities.map((city, index) => (
        <WeatherCard
          city={city}
          key={index}
          onDelete={() => handleCityDeleteBtnClick(index)}
        />
      ))}
      <Box height={"5px"} />
    </Box>
  );
};

const container = document.createElement("div");
document.body.appendChild(container);
const root = createRoot(container);

root.render(<App />);
