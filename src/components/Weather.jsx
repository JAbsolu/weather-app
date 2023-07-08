import React, { useEffect, useState } from "react";
import { 
    Box, 
    TextField, 
    Typography,
    useMediaQuery,
} from "@mui/material";
import { colorThemes, fonts } from "../theme";
import FlexBetween from "./flexBetween";
import SearchIcon from '@mui/icons-material/Search';

const Weather = () => {
    //styles from theme
    const transparent = colorThemes.simple.transparent;
    const textColor = colorThemes.simple.textColor;
    const isMobile = useMediaQuery('(max-width: 500px)');
    const h1 = fonts.heading1;
    const h2 = fonts.heading2;
    const h3 = fonts.heading3;
    const p = fonts.paragraph;

    //get current time
    const [time, setTime] = useState('');
    useEffect(() => {
        const interval = setInterval(() => {
            const date = new Date();
            const hours = String(date.getHours()).padStart(2,'0');
            const minutes = String(date.getMinutes()).padStart(2,'0');
            const seconds = String(date.getSeconds()).padStart(2,'0');
            const time = `${hours}:${minutes}:${seconds}`

            setTime(time);
        }, 1000);

        return () => clearInterval(interval)
    }, []);
    

    //Get data from search
    const [apiData, setApiData] = useState();
    const [search, setSearch] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8214c861b673b37ac8b739c9e228fb0b`);
            const data = await response.json();
            console.log(data)
        }
        fetchData();
    }, [search]);



    return (
        <Box sx={{margin: '0', padding: '0'}}>
            <Typography sx={{fontSize: '1.1rem', color: 'white', textAlign: 'center', marginBottom: '1rem',}}>
                Weather Forcaster
            </Typography>   

            <Box 
            sx={{
                backgroundColor: transparent,
                color: colorThemes.simple.white,
                padding: isMobile ? '1rem .75rem' : '1.5rem',
                width: !isMobile ? '410px' : '85vw',
                minHeight: '55vh',
                boxShadow: 2,
            }}
            >
                <FlexBetween>
                    <Typography sx={{ fontSize: isMobile ? '.8rem' : '1rem', cursor: 'pointer', '&:hover':{color: colorThemes.simple.accentColor}}}>New York</Typography>
                    <Typography sx={{ fontSize: isMobile ? '.8rem' : '1rem', cursor: 'pointer', '&:hover':{color: colorThemes.simple.accentColor}}}>Boston</Typography>
                    <Typography sx={{ fontSize: isMobile ? '.8rem' : '1rem', cursor: 'pointer', '&:hover':{color: colorThemes.simple.accentColor}}}>Washington DC</Typography>
                    <Typography sx={{ fontSize: isMobile ? '.8rem' : '1rem', cursor: 'pointer', '&:hover':{color: colorThemes.simple.accentColor}}}>Los Angeles</Typography>
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
                        id="search"
                        onChange={(e) => setSearch(e.target.value)} 
                        value={search}
                        style={{
                            width: !isMobile ? '65%' : '80%',
                            padding: !isMobile ? '.5rem' : '.4rem',
                            fontSize: !isMobile ? '1.1rem' : '.8rem',
                        }}
                    />
                    <SearchIcon 
                        sx={{ 
                            marginLeft:'.5rem', 
                            backgroundColor: colorThemes.simple.secondaryColor,
                            padding: !isMobile ? '.45rem .8rem' : '.2rem .4rem',
                            fontSize: '1.6rem',
                            borderTopRightRadius: '.3rem',
                            borderBottomRightRadius: '.3rem',
                            color: textColor,
                            '&:hover': {
                                color: colorThemes.simple.accentColor,
                                cursor: 'pointer',
                            }
                        }}
                        onClick={(e) => setSearch()}
                    />
                </Box>
         
            </Box>
        </Box>
    );
};

export default Weather;