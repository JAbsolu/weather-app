import React, { useEffect, useState } from "react";
import { 
    Box, 
    Card, 
    CardContent, 
    Typography,
    useMediaQuery,
} from "@mui/material";
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import { colorThemes, fonts } from "../theme";
import FlexBetween from "./flexBetween";
import CloudIcon from '@mui/icons-material/Cloud';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

const Weather = () => {
    const [data, setData] = useState();
    const [search, setSearch] = useState("New York");

    useEffect(() => {
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
    }, [search])

    //City selections
    const citySelect = ['New York', "Boston", "Washington DC", "Los Angeles"];

    //styles from theme
    const transparent = colorThemes.simple.transparent;
    const isMobile = useMediaQuery('(max-width: 500px)');

    const h1 = fonts.heading1;
    const h2 = fonts.heading2;
    const h3 = fonts.heading3;
    const p = fonts.paragraph;

    return (
        <Box sx={{margin: '0', padding: '0'}}>
            <Box 
            sx={{
                backgroundColor: transparent,
                color: colorThemes.simple.white,
                padding: isMobile ? '1rem .2rem' : '1.5rem 1rem',
                width: !isMobile ? '97.8vw' : '98vw',
                minHeight: isMobile ? '95.8vh' : '55vh',
                boxShadow: 2,
            }}
            >
                 <Typography 
                    variant="h1" 
                    sx={{
                        fontSize: '2rem', 
                        color: 'white', 
                        textAlign: 'center', 
                        marginBottom: isMobile ? '2rem' : '1rem', 
                        marginTop: isMobile ? '2rem' : '' , 
                        color: colorThemes.simple.accentColor}}
                 >
                    Daily Weather
                </Typography>   
                <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        m: '1rem 0', 
                        gap: '.8rem'
                }}>
                    {citySelect.map((city) => (
                        <Typography 
                            sx={{ 
                                fontSize: isMobile ? '.9rem' : '1rem', 
                                cursor: 'pointer', 
                                m: '0',
                                '&:hover':{ 
                                    color: colorThemes.simple.accentColor 
                                }
                            }}
                        >
                            {city} {/* Each indvidual element in the array */}
                        </Typography>
                    ))}
                </Box>
                
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: isMobile ? '0' : '1rem',
                }}>
                    <input 
                        placeholder="Search city" 
                        name="search"
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: !isMobile ? '65%' : '86%',
                            padding: !isMobile ? '.5rem' : '.4rem',
                            fontSize: !isMobile ? '1.1rem' : '.8rem',
                        }}
                    />
                </Box>
                <Box>
                    <FlexBetween>
                        <Card sx={{ minWidth: isMobile ? '98%' : '25%', my: isMobile ? '0' : '.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* SHOW DIFFERENT ICON BASED ON DESCRIPTION */}
                            <CardContent>
                                {
                                    data && data.weather[0].main == 'Clear' ? 
                                        <WbSunnyIcon sx={{ fontSize: isMobile ? '4rem' : '7rem', color: colorThemes.simple.accentColor}}/> 
                                        : data && data.weather[0].description == 'light rain' ? <ThunderstormIcon sx={{ fontSize: isMobile ? '4rem' : '7rem', color: colorThemes.simple.primaryColor}}/> 
                                        : data && data.weather[0].description == 'cloudy' ? <CloudIcon sx={{ fontSize: isMobile ? '4rem' : '7rem', color: colorThemes.simple.primaryColor}}/> 
                                        : <WbSunnyIcon sx={{ fontSize: isMobile ? '4rem' : '7rem', color: colorThemes.simple.accentColor}}/> 
                                }

                                {/* WEATHER DESCRIPTION */}
                                {
                                    data ? 
                                    <Typography sx={{ fontSize: '1.5rem',}} color="text.secondary">
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
                                            gap: isMobile ? '.5rem' : '.8rem',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            mt: '1.5rem',
                                            mb: '0',
                                            flexWrap: 'wrap',
                                        }}
                                    >
                                        <Typography sx={{fontSize: isMobile ? '.78rem' : '.9rem', fontWeight: '500'}}>Humdity: {data.main.humidity}%</Typography>
                                        <Typography sx={{fontSize: isMobile ? '.78rem' : '.9rem', fontWeight: '500'}}>Wind speed: {data.wind.speed} mph</Typography>
                                        <Typography sx={{fontSize: isMobile ? '.78rem' : '.9rem', fontWeight: '500'}}>Wind dir: {data.wind.deg} &deg;</Typography>
                                    </Box>
                                    : null
                                } 
                            </CardContent>
                        </Card>

                        <Card sx={{ minWidth: isMobile ? '98%' : '40%', m: isMobile ? '' : '.25rem 0'}}>
                            <CardContent>
                                <Typography variant='h2' sx={{ fontSize: isMobile ? '2rem' : '3.3rem', fontWeight: 'bold', color: colorThemes.simple.textColor }} color="text.secondary">
                                    {data ? `${data.name} ${data.sys.country}` : 'loading..'}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                     <Typography sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>low <span style={{color: colorThemes.simple.primaryColor, fontWeight: 'bold'}}>
                                                {parseInt((data.main.temp_min - 273.15) * 1.8 + 32)}&deg;F</span>
                                            </Typography> 
                                                : 'loading..'
                                        }
                                    </Typography>
                                
                                    <Box>
                                        {
                                            data ? 
                                            <Typography sx={{fontSize: isMobile ? '4rem' : '5rem', fontWeight: 'bold', mx:'1.5rem'}}>
                                                {parseInt((data.main.temp - 273.15) * 1.8 + 32)} 
                                                <span>&deg;</span> 
                                            </Typography>: ''
                                        } 
                                        {/* <span>&deg;F</span> */}
                                    </Box>

                                    <Typography sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>high <span style={{color: colorThemes.simple.accentColor, fontWeight: 'bold'}}>
                                                {parseInt((data.main.temp_max - 273.15) * 1.8 + 32)}&deg;F</span>
                                            </Typography> 
                                                : 'loading..'
                                        }
                                    </Typography>
                                </Box>
                                <Box sx={{ fontSize: '1rem',}} color="text.secondary" gutterBottom>
                                    {/* THIS BLOCK OF CODE BELOW DISPLAYS FEELS LIKE TEMPERATURE */}
                                    {
                                        data ? 
                                        <Typography sx={{fontSize: isMobile ? '.8rem' : '.9rem', mt: '.5rem'}}>currently feels like <span style={{color: colorThemes.simple.accentColor, fontWeight: 'bold'}}>
                                            {parseInt((data.main.feels_like - 273.15) * 1.8 + 32)}&deg;F</span> in {data.name}
                                        </Typography> 
                                            : 'loading..'
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