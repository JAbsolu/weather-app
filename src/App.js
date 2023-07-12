import {React, useEffect, useState } from "react";
import Weather from "./components/Weather";
import { useMediaQuery } from "@mui/material";

function App() {
  const backgroundUrl = `https://images.pexels.com/photos/2387418/pexels-photo-2387418.jpeg?auto=compress&cs=tinysrgb&w=1000&h=550&dpr=2`;
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: isMobile ? 'start' : 'center',
      backgroundImage: `url(${backgroundUrl})`,
      backgroundRepeat: 'no-repeat',
      minHeight: '100vh',
    }}>
      <Weather />
    </div>
  );
}

export default App;