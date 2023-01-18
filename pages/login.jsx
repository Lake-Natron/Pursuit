import * as React from 'react';
import { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import Component from '../src/login-btn.jsx'
import { signIn } from 'next-auth/react'
import { useSession } from "next-auth/react";
import Router from 'next/router'



const SignIn = () => {
  const [errMsg, setErrMsg] = useState('');
  const [formFields, setFormFields] = useState({
    email: '',
    password: '',
    role: ''
  })
  const { status, data } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/login");
    if (status === "authenticated" && data.user.role === "seeker" ) {
      Router.replace('/protectedUser')
    console.log(status)
    console.log(data.user.role)
    }
    if (status === "authenticated" && data.user.role === "company" ) {
      console.log('employer authenticated')
      Router.replace('/protectedEmployer')
    }
  }, [status])

  const handleSubmit = async (e) => {
    e.preventDefault();
    //TODO:
    // Some way to determine if the sign up is
    const res = await signIn('credentials', {
      ...formFields,
      redirect: false
     });

     if (res?.error) setErrMsg(res.error)
     console.log(res)

     setFormFields({
      email: '',
      password: '',
      role: ''
    })
  }

  // Handles change for form controlled components
  const handleChange = (e) => {
    setErrMsg('')
    const val = e.target.value;
    // console.log(formFields);
    setFormFields({
      ...formFields,
      [e.target.name]: val
    })
  }

  return (
    <>
    <Container maxWidth='xs'>
       <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <>Sign In</>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              // autoComplete="email"
              value={formFields.email}
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={formFields.password}
              // autoComplete="current-password"
              onChange={handleChange}
            />
            {/* <Component></Component> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            {errMsg && <Grid>{errMsg}</Grid>}
            <Grid>
              <Grid>
                <Link href="/signup" variant="body2">
                  {`Don't have an account? Sign Up`}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
    </Container>
    </>
  );
}

export default SignIn;