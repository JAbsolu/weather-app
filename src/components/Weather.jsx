import React, { useEffect, useState } from "react";
import { 
    Box, 
    Button, 
    Card, 
    CardActions, 
    CardContent, 
    Typography,
    useMediaQuery,
} from "@mui/material";
import { colorThemes, fonts } from "../theme";
import FlexBetween from "./flexBetween";

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

    // const cityName = data.name;
    // const countryName = data.sys.country;
    // const temperature = data.main.temp;
    // temperature = parseInt((temperature - 273.15) * 1.8 + 32)
    // const feelsLike = data.main.feels_like;
    // const minTemp = data.main.temp_min;
    // const maxemp = data.main.temp_max;
    // const pressure = data.main.pressure;
    // const humidity = data.main.humidity;
    // const weatherDescriiption = data.weather.description;
    // const weatherIcon = data.weather.icon;
    // const windSpeed = data.wind.speed;
    // const speedDirection = data.wind.deg;

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
                padding: isMobile ? '1rem .75rem' : '1.5rem 1rem',
                width: !isMobile ? '60vw' : '85vw',
                minHeight: '55vh',
                boxShadow: 2,
            }}
            >
                 <Typography 
                    variant="h1" 
                    sx={{fontSize: '2rem', color: 'white', textAlign: 'center', marginBottom: '1rem', color: colorThemes.simple.accentColor}}
                 >
                HT Weather
            </Typography>   
                <FlexBetween>
                    {citySelect.map((city) => (
                        <Typography 
                            sx={{ 
                                fontSize: isMobile ? '.8rem' : '1rem', 
                                cursor: 'pointer', 
                                mx: '.5rem',
                                '&:hover':{ 
                                    color: colorThemes.simple.accentColor 
                                }
                            }}
                        >
                            {city} {/* Each indvidual element in the array */}
                        </Typography>
                    ))}
                </FlexBetween>
                
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: '1rem',
                }}>
                    <input 
                        placeholder="Search city" 
                        name="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: !isMobile ? '65%' : '80%',
                            padding: !isMobile ? '.5rem' : '.4rem',
                            fontSize: !isMobile ? '1.1rem' : '.8rem',
                        }}
                    />
                </Box>
                <Box>
                    <FlexBetween>
                    <Card sx={{ minWidth: isMobile ? '98%' : '25%', my: '.25rem' }}>
                            <CardContent>
                                <Typography variant={p} sx={{ fontSize: 14, textAlign: 'left',}} color="text.secondary" gutterBottom>
                                    {data ? `Feels like ${data.main.feels_like}` : 'no data'}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{ minWidth: isMobile ? '98%' : '40%', my: '.25rem'}}>
                            <CardContent>
                                <Typography variant='h2' sx={{ fontSize: 25, }} color="text.secondary" gutterBottom>
                                    {data ? `${data.name} ${data.sys.country}` : 'No data found'}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                     <Typography variant='h2' sx={{ fontSize: 18, }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>low <span style={{color: colorThemes.simple.accentColor, fontWeight: 'bold'}}>
                                                {parseInt((data.main.temp_min - 273.15) * 1.8 + 32)}&deg;F</span>
                                            </Typography> 
                                                : 'No data'
                                        }
                                    </Typography>
                                    

                                    <Typography variant='h2' 
                                        sx={{ fontSize: 50, fontWeight: 'bold', margin: '1rem', color: transparent }}
                                        gutterBottom
                                    >
                                        {data ? parseInt((data.main.temp - 273.15) * 1.8 + 32) : '0'} 
                                        <span>&deg;F</span>
                                    </Typography>

                                    <Typography variant='h2' sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>high <span style={{color: colorThemes.simple.accentColor, fontWeight: 'bold'}}>
                                                {parseInt((data.main.temp_max - 273.15) * 1.8 + 32)}&deg;F</span>
                                            </Typography> 
                                                : 'No data'
                                        }
                                    </Typography>
                                </Box>
                                <Typography variant='h2' sx={{ fontSize: 17, mb: '1rem'}} color="text.secondary" gutterBottom>
                                    {data ? `Feels like ${parseInt((data.main.feels_like - 273.15) * 1.8 + 32)}` : 'no data'}
                                    <span>&deg;F</span>
                                </Typography>

                                {/* <Box sx={{
                                    display: 'flex',
                                    gap: '1rem',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }}>
                                    <Typography variant='h2' sx={{ fontSize: 18,}} color="text.secondary" gutterBottom>
                                        {data ? `low ${parseInt((data.main.temp_min - 273.15) * 1.8 + 32)}` : 'No data'} 
                                        <span>&deg;F</span>
                                    </Typography>
                                    <Typography variant='h2' sx={{ fontSize: 18,}} color="text.secondary" gutterBottom>
                                        {data ? `high ${parseInt((data.main.temp_max - 273.15) * 1.8 + 32)}` : 'No data'} 
                                        <span>&deg;F</span>
                                    </Typography>
                                </Box> */}
                            </CardContent>
                            </Card>

                            <Card sx={{ minWidth: isMobile ? '98%' : '25%', my: '.25rem' }}>
                            <CardContent>
                                <Typography variant={p} sx={{ fontSize: 14, textAlign: 'left',}} color="text.secondary" gutterBottom>
                                    {data ? `Feels like ${data.main.feels_like}` : 'no data'}
                                </Typography>
                            </CardContent>
                        </Card>
                    </FlexBetween>
                </Box>
            </Box>
        </Box>
    );
};

export default Weather;