import React, { useEffect, useState } from "react";
import { 
    Box, 
    Card, 
    CardContent, 
    Typography,
    useMediaQuery,
} from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { colorThemes } from "../theme";
import FlexBetween from "./flexBetween";
import clouds from '../assets/clouds.svg';
import cloudsSun from '../assets/cloud-sun.svg';
import cloudRain from '../assets/cloud-rain.svg';
import storm from '../assets/cloud-lightning-rain.svg';
import fog from '../assets/fog.svg';
import snow from '../assets/cloud-snow.svg';
import wind from '../assets/wind.svg';
import SearchIcon from '@mui/icons-material/Search';
import background from '../assets/background.jpg';


const Weather = () => {
    const [userLocation, setUserLocation] = useState();
    const [data, setData] = useState();
    const [search, setSearch] = useState();

    const searchInput = document.querySelector("#input"); //GET THE SEARCH INPUT FIELD
    const handleSearch = (e) => {
        let key = e.key
        if (key === "Enter") {
            let value = e.target.value;
            localStorage.setItem("city", value);
            setSearch(localStorage.getItem("city"));
            searchInput.value = "";
        }
    }

    //When the search icon is clicked
    const handleCLickSearch = () => {
        let value = searchInput.value;
        localStorage.setItem("city", value);
        setSearch(localStorage.getItem("city"));
        searchInput.value = "";
    }

    //get city on click
    const getCityData = (e) => {
        let value = e.target.textContent;
        localStorage.setItem("city", value);
        setSearch(localStorage.getItem("city"));
    }

    // GET WEATHER DATA AND LIVE LOCATION
    useEffect(() => {
        //GET WEATHER DATA API CALL
        const fetchData = async () => {
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(search)}&appid=8214c861b673b37ac8b739c9e228fb0b`)
            .then(response => {
                if (!response.ok) throw new Error('Error')
                return response.json();
            })
            .then(data => {
                setData(data)
            })
            .catch(err => {
                console.error(err)
            });
        };
        fetchData();
        
        //GET USER LOCATION API CALL
        const getLocation = async () => {
            const url = `https://ip-geo-location.p.rapidapi.com/ip/check?format=json`;
            const options = {
                method: 'GET',
                headers: {
                    'X-RapidAPI-Key': '52f9330da8msh2c6be0a096fffaap18f69ejsne7443c5751d0',
                    'X-RapidAPI-Host': 'ip-geo-location.p.rapidapi.com'
                }
            };
    
            try {
                const response = await fetch(url, options);
                const result = await response.json();
                let city = result.city.name;
                setUserLocation(result);
                if (!localStorage.getItem("city")) {
                    setSearch(city)
                    localStorage.setItem("city", city)
                } else {
                    setSearch(localStorage.getItem("city"))
                }
            } catch (error) {
                console.error(error);
            }
          }
          getLocation()
          
    }, [search])


    //Let the current city to add as first item in the array
    let currentCity = null;
    if (userLocation) {
        currentCity = userLocation.city.name;
    }
    //City selections
    const citySelect = [currentCity, "New York", "Chicago", "Los Angeles"];

    //styles from theme
    const transparent = colorThemes.simple.transparent;
    const skyBlue = colorThemes.simple.skyBlue;
    const white = colorThemes.simple.white;
    const blackText = colorThemes.simple.textColor;
    const accent = colorThemes.simple.accentColor;

    //Media query
    const isMobile = useMediaQuery('(max-width: 600px)');
    const isWideScreen = useMediaQuery('(min-width: 1490px)');

    return (
        <Box 
            sx={{
                margin: '0', 
                padding: '0', 
                display: 'flex',
                backgroundImage: `url(${background})`,
                backgroundRepeat: `no-repeat`
            }}
        >
            <Box 
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: transparent,
                    color: white,
                    padding: isMobile ? '1rem .2rem' : '1.5rem 1rem',
                    width: !isMobile ? '97.8vw' : '98vw',
                    minHeight: isMobile ? '95.8vh' : '53vh',
                    boxShadow: 2,
                }}
            >
                 <Typography 
                    variant="h1" 
                    sx={{
                        fontSize: '2rem', 
                        textAlign: 'center', 
                        marginBottom: isMobile ? '2rem' : '1rem', 
                        marginTop: isMobile ? '2rem' : '', 
                        color: accent,
                    }}
                 >
                    Daily Weather Forcast
                </Typography>   
                <Box sx={{ 
                        display: 'flex-column',
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        m: '0', 
                        gap: '1rem',
                        width: isMobile ? '90%' : '50%',
                }}>
                    <Box
                        sx={{
                            display: "fex",
                            gap: isMobile ? "1.5rem" : "1rem",
                            justifyContent: "center",
                            mb: "0.5rem",
                        }}
                    >
                        {citySelect.map((city) => (
                            <Typography 
                                sx={{ 
                                    fontSize: isMobile ? '1rem' : '1rem', 
                                    cursor: 'pointer', 
                                    m: '0 0.3rem',
                                    '&:hover':{ 
                                        color: colorThemes.simple.accentColor 
                                    }
                                }}
                                onClick={getCityData}
                            >
                                {city} {/* Each indvidual element in the array */}
                            </Typography>
                        ))}
                    </Box>
                    <Box 
                        sx={{ 
                            display: "flex", 
                            justifyContent: "center", 
                            alignItems: "center",
                            gap: "0.2rem"
                        }}
                    >
                        <input 
                            placeholder="Search city" 
                            name="search"
                            id="input"
                            // onChange={e => setSearch(e.target.value)}
                            onKeyDown={handleSearch}
                            style={{
                                width: isWideScreen ? '41.8rem' : '100%',
                                padding: !isMobile ? '.5rem' : '.4rem',
                                fontSize: '1rem',
                            }}
                        />
                        <SearchIcon 
                            onClick={handleCLickSearch}
                            sx={{ 
                                fontSize: 25,
                                fontWeight: "bold",
                                color: colorThemes.simple.textColor,
                                background: white,
                                p: "0.3rem",
                                "&:Hover": {
                                    cursor: "pointer",
                                    color: colorThemes.simple.orange
                                }
                            }} 
                        />
                    </Box>
                </Box>

                <Box sx={{maxWidth: '2000px'}}>
                    <FlexBetween>
                        <Card sx={{ 
                            minWidth: isMobile ? '98%' : '25%',
                            my: isMobile ? '0' : '.25rem', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            maxWidth: '100%',
                            minHeight: '240px',
                            backgroundColor: skyBlue,
                        }}>
                            {/* SHOW DIFFERENT ICON BASED ON DESCRIPTION */}
                            <CardContent>
                                {/* CHAIN OF TERNARY IF ELSE STATEMENTS */}
                                {
                                    data && data.weather[0].main == 'Clear' ? 
                                    <WbSunnyIcon sx={{ fontSize: isMobile ? '5rem' : '7rem', color: accent,}}/>
                                    : data && data.weather[0].description.includes('rain') ?                // NEW TERNARY IF STATEMENT
                                        <img src={cloudRain} width={isMobile ? '80' : '120' } alt='icon'/> 
                                    : data && data.weather[0].description.includes('storm') ?                // NEW TERNARY IF STATEMENT
                                        <img src={storm} width={isMobile ? '80' : '120' } alt='icon'/> 
                                    : data && data.weather[0].description.includes('cloud') ?                // NEW TERNARY IF STATEMENT
                                        <img src={clouds} width={isMobile ? '80' : '120' } alt='icon'/>
                                    : data && data.weather[0].description == 'scattered clouds' ?                // NEW TERNARY IF STATEMENT
                                        <img src={cloudsSun} width={isMobile ? '80' : '120' } alt='icon'/> 
                                    : data && data.weather[0].description == 'squalls' ?                // NEW TERNARY IF STATEMENT
                                        <img src={wind} width={isMobile ? '80' : '120' } alt='icon'/> 
                                    : data && data.weather[0].description.includes('mist') ?                // NEW TERNARY IF STATEMENT
                                        <img src={fog} width={isMobile ? '75' : '120' } alt='icon'/> 
                                    : data && data.weather[0].description.includes('fog') ?                // NEW TERNARY IF STATEMENT
                                        <img src={fog} width={isMobile ? '80' : '120' } alt='icon'/> 
                                    : data && data.weather[0].description.includes('snow') ?                // NEW TERNARY IF STATEMENT
                                        <img src={snow} width={isMobile ? '80' : '120' } alt='icon'/> 
                                    : <WbSunnyIcon sx={{ fontSize: isMobile ? '4rem' : '7rem', color: colorThemes.simple.accentColor}}/> 
                                }

                                {/* WEATHER DESCRIPTION */}
                                {
                                    data ? 
                                    <Typography sx={{ fontSize: '1.2rem', color: white,}}>
                                        {data.weather[0].description}
                                    </Typography> 
                                    : 'loading..'
                                }

                                {/* WEATHER AND WIND  INFO */}
                                {
                                    data ? 
                                    <Box 
                                        sx={{
                                            display: 'flex', 
                                            gap: isMobile ? '.3rem' : '.8rem',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mt: '1.2rem',
                                            mb: '0',
                                            flexWrap: 'wrap',
                                            color: white,
                                        }}
                                    >
                                        <Typography 
                                            sx={{
                                                fontSize: isMobile ? '.78rem' : '.8rem', 
                                                fontWeight: '500'
                                            }}
                                        >
                                            Humdity: {data.main.humidity}%
                                        </Typography>
                                        <Typography 
                                            sx={{
                                                fontSize: isMobile ? '.78rem' : '.8rem', 
                                                fontWeight: '500'
                                            }}
                                        >
                                            Wind speed: {data.wind.speed} mph
                                        </Typography>
                                        <Typography 
                                            sx={{
                                                fontSize: isMobile ? '.78rem' : '.8rem', 
                                                fontWeight: '500'
                                            }}
                                        >
                                            Wind dir: {data.wind.deg} &deg;
                                        </Typography>
                                    </Box>
                                    : null
                                } 
                            </CardContent>
                        </Card>

                        <Card 
                            sx={{ 
                                minWidth: isMobile ? '98%' : '40%', 
                                maxWidth: '100%', m: isMobile ? '' : '.25rem 0',
                            }}
                        >
                            <CardContent>
                                <Typography 
                                    variant='h2' 
                                    sx={{ fontSize: isMobile ? '2rem' : '3rem', 
                                        fontWeight: '600', 
                                        color: blackText
                                    }}
                                >
                                    { data ? `${data.name}` : 'loading..' }
                                </Typography>

                                <Box 
                                    sx={{ 
                                        display: 'flex', 
                                        justifyContent: 'center', 
                                        alignItems: 'center', 
                                        gap: '1rem'
                                    }}
                                >
                                    <Typography 
                                        sx={{ fontSize: '1rem', }} 
                                        color="text.secondary" 
                                        gutterBottom
                                    >
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? (
                                                <Typography>low: 
                                                    <span style={{color: colorThemes.simple.primaryColor, fontWeight: 'bold'}}>
                                                        { parseInt((data.main.temp_min - 273.15) * 1.8 + 32) }&deg;F {/* GET THE MIN TEMP */}
                                                    </span>
                                                </Typography> 
                                            )  : (
                                                'loading..'
                                            )
                                        }
                                    </Typography>
                                
                                    <Box>
                                        {
                                            data ? (
                                                <Typography 
                                                    sx={{
                                                        fontSize: isMobile ? '3.8rem' : '4.5rem', 
                                                        fontWeight: 'bold', mx:'1.5rem',
                                                    }}
                                                >
                                                    { parseInt((data.main.temp - 273.15) * 1.8 + 32) } {/* GET THE ACTUAL TEMP */}
                                                    <span>&deg;</span> 
                                                </Typography> 
                                            ) : (
                                                'loading..'
                                            )
                                        } 
                                    </Box>

                                    <Typography 
                                        sx={{ fontSize: '1rem', }} 
                                        color="text.secondary" 
                                        gutterBottom
                                    >
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? (
                                                <Typography>high: 
                                                    <span style={{color: colorThemes.simple.orange, fontWeight: 'bold'}}>
                                                        { parseInt((data.main.temp_max - 273.15) * 1.8 + 32) }&deg;F
                                                    </span> {/* GET THE HIGHEST TEMP*/}
                                                </Typography> 
                                             ) : (
                                                'loading..'
                                             )
                                        }
                                    </Typography>
                                </Box>
                                <Box 
                                    sx={{ fontSize: '1rem',}} 
                                    color="text.secondary" 
                                    gutterBottom
                                >
                                    {/* THIS BLOCK OF CODE BELOW DISPLAYS FEELS LIKE TEMPERATURE */}
                                    {
                                        data ? (
                                            <Typography sx={{fontSize: isMobile ? '.8rem' : '.85rem', mt: '.5rem',}}>
                                                currently feels like 
                                                <span style={{color: blackText, fontWeight: 'bold'}}>
                                                    { parseInt((data.main.feels_like - 273.15) * 1.8 + 32) }&deg;F {/* HOW IT CURRENTLY FEELS LIKE TEMP */}
                                                </span> 
                                                in {data.name}, {data.sys.country}
                                            </Typography> 
                                        )   : (
                                            'loading..'
                                        )
                                    }
                                    
                                </Box>

                            </CardContent>
                            </Card>
                    </FlexBetween>
                </Box>
            </Box>
        </Box>
    );
};

export default Weather;