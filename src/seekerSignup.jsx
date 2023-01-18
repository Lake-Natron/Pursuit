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

// Contains all Job Seeker specific questions:
// Any Refactored Code should be added here
const SeekerSignup = ({ handleChange }) => {

  return (
      <Box>
        <TextField
          variant="outlined"
          required
          fullWidth
          name="first_name"
          label="First Name"
          type="text"
          id="password"
          autoComplete="current-password"
          onChange={handleChange}
          sx={{ m: 1 }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="last_name"
          label="Last Name"
          type="text"
          id="lastname"
          autoComplete="current-password"
          onChange={handleChange}
          sx={{ m: 1 }}
        />
      </Box>
  );
};

export default SeekerSignup;