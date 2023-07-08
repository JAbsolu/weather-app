import {React, useEffect, useState } from "react";
import Weather from "./components/Weather";
import { Box } from "@mui/material";

function App() {
  const backgroundUrl = `https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=1000&h=550&dpr=2`;
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundImage: `url(${backgroundUrl})`,
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
      <Weather />
    </div>
  );
}

export default App;