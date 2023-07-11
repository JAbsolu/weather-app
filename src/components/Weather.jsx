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
import WbSunnyIcon from '@mui/icons-material/WbSunny';
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
                Daily Weather
            </Typography>   
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', m: '1rem 0', gap: '1rem'}}>
                    {citySelect.map((city) => (
                        <Typography 
                            sx={{ 
                                fontSize: isMobile ? '.8rem' : '1rem', 
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
                    mb: '1rem',
                }}>
                    <input 
                        placeholder="Search city" 
                        name="search"
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: !isMobile ? '65%' : '84%',
                            padding: !isMobile ? '.5rem' : '.4rem',
                            fontSize: !isMobile ? '1.1rem' : '.8rem',
                        }}
                    />
                </Box>
                <Box>
                    <FlexBetween>
                        <Card sx={{ minWidth: isMobile ? '98%' : '25%', my: '.25rem', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                            {/* SHOW DIFFERENT ICONS BASED ON DESCRIPTION */}
                            <CardContent>
                                {
                                    data && data.weather[0].main == 'Clear' ? <WbSunnyIcon sx={{ fontSize: '5rem', color: colorThemes.simple.accentColor}}/> : ''
                                }
                                <Typography sx={{ fontSize: '1rem', fontWeight: 'bold'}} color="text.secondary" gutterBottom>
                                    {data ? `${data.weather[0].description}` : 'no data'}
                                </Typography>
                            </CardContent>
                        </Card>

                        <Card sx={{ minWidth: isMobile ? '98%' : '40%', m: '.25rem 0'}}>
                            <CardContent>
                                <Typography variant='h2' sx={{ fontSize: 25, }} color="text.secondary" gutterBottom>
                                    {data ? `${data.name} ${data.sys.country}` : 'No data found'}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                     <Typography sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>low <span style={{color: colorThemes.simple.blue, fontWeight: 'bold'}}>
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

                                    <Typography sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
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
                                <Typography sx={{ fontSize: '1rem',}} color="text.secondary" gutterBottom>
                                    {/* THIS BLOCK OF CODE BELOW DISPLAYS FEELS LIKE TEMPERATURE */}
                                    {
                                        data ? 
                                        <Typography>currently feels like <span style={{color: colorThemes.simple.accentColor, fontWeight: 'bold'}}>
                                            {parseInt((data.main.feels_like - 273.15) * 1.8 + 32)}&deg;F</span> in {data.name}
                                        </Typography> 
                                            : 'No data'
                                    }
                                </Typography>

                            </CardContent>
                            </Card>

                            <Card sx={{ minWidth: isMobile ? '98%' : '25%', my: '.25rem' }}>
                            <CardContent>
                                <Typography sx={{ fontSize: '1rem', textAlign: 'left',}} color="text.secondary" gutterBottom>
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