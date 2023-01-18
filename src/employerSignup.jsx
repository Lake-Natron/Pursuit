import Link from 'next/link';
import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import Container from '@mui/material/Container';
import { Link as MuiLink } from '@mui/material/Link';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

// Contains all employer specific questions
const EmployerSignup = ({ handleEmployerSignupClick }) => {

  useEffect(() => {
    // TODO: pull down data of all available companies
      // if the company has already been signed up for,
  }, [])

  // TODO: MAP OVER LIST OF COMPANIES AS PROVIDED BY THE CLIENT.
  return (
      <Container maxWidth='xs'>
        <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Age
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value={10}>Ten</option>
            <option value={20}>Twenty</option>
            <option value={30}>Thirty</option>
          </NativeSelect>
        </FormControl>
      </Container>
  );
};

export default EmployerSignup;