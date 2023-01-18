import * as React from 'react';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Link as MuiLink } from '@mui/material/Link';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import EmployerSignup from '../src/employerSignup.jsx';
import SeekerSignup from '../src/seekerSignup.jsx';

const Signup = () => {
  const [signUpAs, setSignUpAs] = useState(null);
  const [formFields, setFormFields] = useState({
    company_name: null,
    first_name: null,
    last_name: null,
    image_url: null,
    role: null,
    email: null,
    password: null,
    address: null,
    address_2: null,
    city: null,
    state: null,
    zip_code: null,
  });

  // const form = signUpAs ==
  let form = <></>;
  switch (signUpAs) {
    case 'seeker':
      form = <SeekerSignup />;
      break;
    case 'employer':
      form = <EmployerSignup />;
      break;
    default:
      form = <div> Please select from above: </div>;
      break;
  }

  const handleOnChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value, formFields)
    setFormFields({
      ...formFields,
      [name]: value
    })
  }

  const onCheckZipChange = (e) => {

  };

  const onSubmitForm = (e) => {
    e.preventDefault();

  }

  return (
    <Container maxWidth='xs'>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        Are you looking to sign up as a Job-Seeker or a Company?
        <Box
          sx={{
            flexDirection: 'row',
            justifyContent: 'space-around'
          }}>
          <Button variant="contained" sx={{ margin: '10px' }} onClick={() => {
            setFormFields({
              ...formFields,
              role: 'seeker'
            })
            setSignUpAs('seeker')
            }}>Job Seeker</Button>
          <Button variant="contained" sx={{ margin: '10px' }} onClick={() => {
            setFormFields({
              ...formFields,
              role: 'employer'
            })
            setSignUpAs('employer')
            }}>Employer</Button>
        </Box>
      </Box>

      {signUpAs &&
      <Container>
        {form}

        <TextField
          variant="outlined"
          required
          fullWidth
          id="email"
          label="Email Address"
          name="email"
          autoComplete="email"
          onChange={handleOnChange}
          sx={{ m: 1 }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          onChange={handleOnChange}
          sx={{ m: 1 }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="address"
          label="Address"
          type="address"
          id="password"
          onChange={handleOnChange}
          sx={{ m: 1 }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="address_2"
          label="Address_2"
          type="address"
          id="address_2"
          onChange={handleOnChange}
          sx={{ m: 1 }}
        />

        <Box sx={{ display:'flex', flexDirection:'row' }}>
          <TextField
            variant="outlined"
            required
            name="city"
            label="City"
            type="city"
            id="city"
            onChange={handleOnChange}
            sx={{ m: 1 }}
          />

          <TextField
            variant="outlined"
            required
            name="state"
            label="State"
            type="state"
            id="state"
            onChange={handleOnChange}
            sx={{ m: 1 }}
          />
        </Box>

        <TextField
          variant="outlined"
          required
          fullWidth
          name="zipcode"
          label="Zipcode"
          type="Zipcode"
          id="zipcode"
          onChange={handleOnChange}
          inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          sx={{ m: 1 }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => {}}
        >
          Sign Up
        </Button>

      </Container>
      }

    </Container>
  );
};

export default Signup;