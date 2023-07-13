import styled from "@emotion/styled";
import { useMediaQuery } from "@mui/material";


const FlexBetween = styled('Box') ({
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: '0.5rem',
    textAlign: 'center',
    margin: '1rem',
});

export default FlexBetween;