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
import clouds from '../assets/clouds.svg';
import cloudsSun from '../assets/cloud-sun.svg';
import cloudRain from '../assets/cloud-rain.svg';
import storm from '../assets/cloud-lightning-rain.svg';
import fog from '../assets/fog.svg';
import snow from '../assets/cloud-snow.svg';
import background from '../assets/background.jpeg';

const Weather = () => {
    const [data, setData] = useState();
    const [search, setSearch] = useState('');

    // GET WEATHER DATA AND LIVE LOCATION
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
                if (!city) setSearch('New York');
                setSearch(city)
            } catch (error) {
                console.error(error);
            }
          }
          getLocation()
    }, [search])

    //get city on click
    const getCityData = (e) => {
        let value = e.target.textContent;
        setSearch(value)
    }

    //City selections
    const citySelect = ['New York', "Boston", "Chicago", "Los Angeles"];

    //styles from theme
    const transparent = colorThemes.simple.transparent;
    const skyBlue = colorThemes.simple.skyBlue;
    const white = colorThemes.simple.white;
    const blackText = colorThemes.simple.textColor;

    //Media query
    const isMobile = useMediaQuery('(max-width: 500px)');

    const h1 = fonts.heading1;
    const h2 = fonts.heading2;
    const h3 = fonts.heading3;
    const p = fonts.paragraph;

    return (
        <Box sx={{
            margin: '0', 
            padding: '0', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            backgroundImage: `url(${background})`,
        }}>
            <Box 
            sx={{
                backgroundColor: transparent,
                color: colorThemes.simple.white,
                padding: isMobile ? '1rem .2rem' : '.5rem 1rem',
                width: !isMobile ? '97.8vw' : '98vw',
                minHeight: isMobile ? '95.8vh' : '53vh',
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
                        marginTop: '2rem', 
                        color: colorThemes.simple.accentColor}}
                 >
                    Daily Weather
                </Typography>   
                <Box sx={{ 
                        display: 'flex', 
                        justifyContent: 'center', 
                        alignItems: 'center', 
                        m: '1rem 0', 
                        gap: '1rem'
                }}>
                    {citySelect.map((city) => (
                        <Typography 
                            sx={{ 
                                fontSize: isMobile ? '1rem' : '1rem', 
                                cursor: 'pointer', 
                                m: '0',
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
                
                <Box sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: isMobile ? '0' : '1rem',
                    maxWidth: '1700px',
                }}>
                    <input 
                        placeholder="Search city" 
                        name="search"
                        onChange={e => setSearch(e.target.value)}
                        style={{
                            width: !isMobile ? '63%' : '86%',
                            padding: !isMobile ? '.5rem' : '.4rem',
                            fontSize: '1rem',
                        }}
                    />
                </Box>
                <Box sx={{maxWidth: '1700px'}}>
                    <FlexBetween>
                        <Card sx={{ 
                            minWidth: isMobile ? '98%' : '25%',
                            my: isMobile ? '0' : '.25rem', 
                            display: 'flex', 
                            justifyContent: 'center', 
                            alignItems: 'center',
                            maxWidth: '358px',
                            backgroundColor: skyBlue,
                        }}>
                            {/* SHOW DIFFERENT ICON BASED ON DESCRIPTION */}
                            <CardContent>
                                {
                                    data && data.weather[0].main == 'Clear' ? 
                                        <WbSunnyIcon sx={{ fontSize: isMobile ? '5rem' : '7rem', color: colorThemes.simple.accentColor,}}/>
                                        : data && data.weather[0].description.includes('rain') ? <img src={cloudRain} width={isMobile ? '80' : '120' } alt='icon'/> 
                                        : data && data.weather[0].description.includes('storm') ? <img src={storm} width={isMobile ? '80' : '120' } alt='icon'/> 
                                        : data && data.weather[0].description.includes('cloud') ? <img src={clouds} width={isMobile ? '80' : '120' } alt='icon'/>
                                        : data && data.weather[0].description == 'scattered clouds' ? <img src={cloudsSun} width={isMobile ? '80' : '120' } alt='icon'/> 
                                        : data && data.weather[0].description.includes('mist') ? <img src={fog} width={isMobile ? '80' : '120' } alt='icon'/> 
                                        : data && data.weather[0].description.includes('fog') ? <img src={fog} width={isMobile ? '80' : '120' } alt='icon'/> 
                                        : data && data.weather[0].description.includes('snow') ? <img src={snow} width={isMobile ? '80' : '120' } alt='icon'/> 
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
                                        <Typography sx={{fontSize: isMobile ? '.78rem' : '.8rem', fontWeight: '500'}}>Humdity: {data.main.humidity}%</Typography>
                                        <Typography sx={{fontSize: isMobile ? '.78rem' : '.8rem', fontWeight: '500'}}>Wind speed: {data.wind.speed} mph</Typography>
                                        <Typography sx={{fontSize: isMobile ? '.78rem' : '.8rem', fontWeight: '500'}}>Wind dir: {data.wind.deg} &deg;</Typography>
                                    </Box>
                                    : null
                                } 
                            </CardContent>
                        </Card>

                        <Card sx={{ minWidth: isMobile ? '98%' : '40%', maxWidth: '358px', m: isMobile ? '' : '.25rem 0'}}>
                            <CardContent>
                                <Typography variant='h2' sx={{ fontSize: isMobile ? '2rem' : '3rem', fontWeight: '600', color: transparent}}>
                                    {data ? `${data.name}` : 'loading..'}
                                </Typography>

                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
                                     <Typography sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>low: <span style={{color: colorThemes.simple.primaryColor, fontWeight: 'bold'}}>
                                                {parseInt((data.main.temp_min - 273.15) * 1.8 + 32)}&deg;F</span>
                                            </Typography> 
                                                : 'loading..'
                                        }
                                    </Typography>
                                
                                    <Box>
                                        {
                                            data ? 
                                            <Typography sx={{fontSize: isMobile ? '3.8rem' : '4.5rem', fontWeight: 'bold', mx:'1.5rem'}}>
                                                {parseInt((data.main.temp - 273.15) * 1.8 + 32)} 
                                                <span>&deg;</span> 
                                            </Typography>: ''
                                        } 
                                    </Box>

                                    <Typography sx={{ fontSize: '1rem', }} color="text.secondary" gutterBottom>
                                        {/* CHECK TO SEE IF THERE IS DATA, IF YES, CREATE A P TAG, WITH A NESTED SPAN TAG , ADD DATE IN TAG*/}
                                        {
                                            data ? 
                                            <Typography>high: <span style={{color: colorThemes.simple.orange, fontWeight: 'bold'}}>
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
                                        <Typography sx={{fontSize: isMobile ? '.8rem' : '.85rem', mt: '.5rem',}}>currently feels like <span style={{color: blackText, fontWeight: 'bold'}}>
                                            {parseInt((data.main.feels_like - 273.15) * 1.8 + 32)}&deg;F</span> in {data.name}, {data.sys.country}
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