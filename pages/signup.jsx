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
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import OutlinedInput from '@mui/material/OutlinedInput';
import FormHelperText from '@mui/material/FormHelperText';
import Avatar from '@mui/material/Avatar';
import axios from 'axios';
import NavBar from '../src/navBar';

import Router from 'next/router'

import EmployerSignup from '../src/employerSignup.jsx';
import SeekerSignup from '../src/seekerSignup.jsx';

const Signup = () => {
  const [successMsg, setSuccessMsg]= useState('')
  const [errMsg, setErrMsg] = useState('');
  const [signUpAs, setSignUpAs] = useState(null);
  const [showPassword, setShowPassword] = useState(false)
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [err, setErr] = useState({
    company_name: '',
    first_name: '',
    last_name: '',
    image_url: '',
    role: '',
    email: '',
    password: '',
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: 'please enter valid zipcode',
  })
  const [formFields, setFormFields] = useState({
    company_name: null,
    first_name: null,
    last_name: null,
    image_url: null,
    role: null,
    email: null,
    password: null,
    address: '',
    address_2: '',
    city: '',
    state: '',
    zip_code: '',
  });

  const handleOnChange = (e) => {
    setSuccessMsg('')
    setErrMsg('')
    const name = e.target.name;
    const value = e.target.value;

    setFormFields({
      ...formFields,
      [name]: value
    })
  }



  let form = <></>;
  switch (signUpAs) {
    case 'seeker':
      form = <SeekerSignup handleChange={handleOnChange}/>;
      break;
    case 'employer':
      form = <EmployerSignup handleChange={handleOnChange} />;
      break;
    default:
      form = <div> Please select from above: </div>;
      break;
  }

  const onCheckZipChange = (e) => {
    const zipMatch = `^\d{5}$`;
    if (name === 'zip_code') {
      if(!formFields['zip_code'].match(zipMatch)) {
        setErr(
          { ...err,
            zip_code: 'Please enter a valid 5 number zipcode'
          });
      } else {
        setErr(
          { ...err,
            zip_code: ''
          });
      }
    }
  };

  const handleClickShowPassword = (e) => {
    setShowPassword((show) => !show);
  }

  const handleMouseDownPassword = (e) => {
    e.preventDefault();
  }

  // Profile Photo Upload
  const handleFile = async (event) => {
    let files = Array.from(event.target.files)
    // handle case of no file being clicked after upload.
    if (files.length === 0) {
      return;
    }
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("upload_preset", 'wjuxohsi');

    const result = await axios.post(`https://api.cloudinary.com/v1_1/dq6rqplja/image/upload`, formData)
    console.log(result);
    console.log(result.data.url);
    setProfilePhoto(() => result.data.url);
    setFormFields({
      ...formFields,
      image_url: result.data.url
    })
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    //TODO: Submit form for Auth and Add to Server
    // Needs to handle response if company name or email has ready been taken
    // Forward to homepage after completion
    console.log('submitting', formFields)
    try {
      const response = await axios.post('http://localhost:3001/user', formFields)

      setSuccessMsg(response.data.success)
      setFormFields({
        company_name: null,
        first_name: null,
        last_name: null,
        image_url: null,
        role: null,
        email: null,
        password: null,
        address: '',
        address_2: '',
        city: '',
        state: '',
        zip_code: '',
      });

    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response. Try again!")
      } else {
        setErrMsg(err.response.data.message)
        console.log(err.response.data.message)
      }
    }
  }

  if (successMsg) {
    return (
      <Container maxWidth='xs'>
        <Box sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          {successMsg}
          <Button sx={{color: "#E44F48"}} onClick={()=> Router.replace("/login")}>Go to Login</Button>
        </Box>
      </Container>
    )
  }





  return (
    <>
    <NavBar />
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
          {successMsg && <Grid>{successMsg}</Grid>}
          {errMsg && <Grid sx={{backgroundColor: "#E44F48", color: "white", borderRadius: "10px", padding: "5px", textAlign: "center", margin: "5px", fontFamily: "Lora"}}>{errMsg}</Grid>}
          <Button variant="contained" sx={{ margin: '10px' }} onClick={() => {
            setFormFields({
              ...formFields,
              company_name: null,
              role: 'seeker'
            })
            setSignUpAs('seeker')
            }}>Job Seeker</Button>
          <Button variant="contained" sx={{ margin: '10px' }} onClick={() => {
            setFormFields({
              ...formFields,
              first_name: null,
              last_name: null,
              role: 'employer'
            })
            setSignUpAs('employer')
            }}>Employer</Button>
        </Box>
      </Box>

      <Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'center' }}>
          {profilePhoto &&
          <Avatar src={profilePhoto} sx={{ width: 155, height: 155, boxShadow: 5, m: 3}}/>}
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

        <FormControl sx={{ m: 1, width: '100%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            name='password'
            onChange={handleOnChange}
          />
        </FormControl>

        <TextField
          variant="outlined"
          required
          fullWidth
          name="address"
          label="Address"
          type="text"
          id="address_1"
          onChange={handleOnChange}
          sx={{ m: 1 }}
        />

        <TextField
          variant="outlined"
          required
          fullWidth
          name="address_2"
          label="Street"
          type="text"
          id="address_2"
          onChange={handleOnChange}
          sx={{ m: 1 }}
        />

        <Box sx={{ display:'flex', flexDirection:'row', justifyContent:'space-between', width:'100%', m: 1 }}>
          <TextField
            variant="outlined"
            required
            name="city"
            label="City"
            type="city"
            id="city"
            onChange={handleOnChange}
          />

          <TextField
            variant="outlined"
            required
            name="state"
            label="State"
            type="state"
            id="state"
            onChange={handleOnChange}
          />
        </Box>

        <Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
          <Button
            variant="contained"
            component="label"
            onChange={handleFile}
          >
            Upload Profile Photo
            <input
              type="file"
              hidden
            />
          </Button>
        </Box>

        <FormControl sx={{ m: 2, width: '100%' }}>
          <TextField
            variant="outlined"
            required
            fullWidth
            name="zip_code"
            label="Zipcode"
            type="Zipcode"
            id="zipcode"
            value={formFields['zip_code']}
            onChange={handleOnChange}
            // error={ formFields['zip_code'].match(`^\d{5}$`) === null}
            // helperText={err['zip_code']}
            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
          />
        </FormControl>

        <Box sx={{ display:'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 2 }}>
          <Button
            type="submit"
            variant="contained"
            fullWidth
            color="primary"
            onClick={onSubmitForm}
          >
               Sign Up
          </Button>
        </Box>

      </Container>
      }

    </Container>
    </>
  );
};

export default Signup;