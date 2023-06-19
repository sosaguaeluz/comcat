import React from 'react';
import { createTheme, ThemeProvider } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import styled from 'styled-components';

interface IProps {
    img: any,
    title?: any,
    placement?: any
}

const Button = styled.button`
  border: none;
  background: none;
`;


const CustomTolltip: React.FC <IProps> = (props) => {
  const theme = createTheme({
    components: {
      MuiTooltip: {
        styleOverrides: {
          tooltipArrow: {
            backgroundColor: '#2C3941',
          },
          tooltip: {
            backgroundColor: '#2C3941',
            fontSize: '12px',
            fontWeight: '400',
            lineHeight: '18px',
          }          
        }
      }
    }
  })

    return (
      <ThemeProvider theme={theme}>
        <Tooltip 
          arrow 
          title={props.title} 
          placement={props.placement}
        >
          <Button type="button">
            {props.img}
          </Button>
        </Tooltip>
      </ThemeProvider>
    );
};

export default CustomTolltip;