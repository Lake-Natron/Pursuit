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
import NativeSelect from '@mui/material/NativeSelect';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';


// Contains all employer specific questions
const EmployerSignup = ({ handleEmployerSignupClick }) => {

  useEffect(() => {
    // TODO: pull down data of all available companies
      // if the company has already been signed up for,
  }, [])

  // TODO: MAP OVER LIST OF COMPANIES AS PROVIDED BY THE CLIENT.
  return (
      <Box>
        {/* <FormControl fullWidth>
          <InputLabel variant="standard" htmlFor="uncontrolled-native">
            Company
          </InputLabel>
          <NativeSelect
            defaultValue={30}
            inputProps={{
              name: 'age',
              id: 'uncontrolled-native',
            }}
          >
            <option value={Apple}>Apple</option>
            <option value={Microsoft}>Microsoft</option>
            <option value={Meta}>Meta</option>
          </NativeSelect>
        </FormControl> */}

        <TextField
          variant="outlined"
          required
          fullWidth
          name="company"
          label="Company"
          type="text"
          id="lastname"
          autoComplete="current-password"
          onChange={() => {}}
          sx={{ m: 1 }}
        />

      </Box>
  );
};

export default EmployerSignup;