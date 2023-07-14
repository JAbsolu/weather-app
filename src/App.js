import {React, useEffect, useState } from "react";
import Weather from "./components/Weather";
import { useMediaQuery } from "@mui/material";

function App() {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: isMobile ? 'start' : 'center',
      background: '#011013',
      minHeight: '100vh',
    }}>
      <Weather />
    </div>
  );
}

export default App;