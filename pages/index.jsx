import React from "react";
import Link from 'next/link';
import { ThemeProvider, createTheme } from '@mui/material/styles'; 
import Button from '@mui/material/Button';

const theme = createTheme({
  typography: {
    fontFamily: [
      'Montserrat', 
      'sans-serif',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  },
  palette: {
    primary: {
      // Purple and green play nicely together.
      main:'#CFCFCF',
    },
    secondary: {
      // This is green.A700 as hex.
      main: '#E44F48',
    },
  },
});
const App = () => {
  return (
    
      <ThemeProvider theme={theme}>
        <Link href="/calendar">Calendar</Link>
        <Link href="/homeJobSeeker"> Home Job Seeker </Link>
        <Link href="/jobSearch">Job Search</Link>
        <Button variant="contained" size="large" color='secondary'>Apply</Button>
      </ThemeProvider>
  )
}

export default App;
