import Link from 'next/link';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link as MuiLink } from '@mui/material/Link';
import Radio from '@mui/material/Radio';


const SeekerSignup = () => {

  return (
    <Container maxWidth='xs'>
      {!signUpAs && <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        Seeker Signup Component

      </Box>}
    </Container>
  );
};

export default SeekerSignup;