import * as React from 'react';
import { useState, useEffect } from 'react';
import { css } from '@emotion/react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import Image from 'next/image';
import ResumeForm from './resume/resumeForm.jsx';
import Link from 'next/link';
import Notifications from './notifications.jsx';
import axios from 'axios';
import { useSession, signOut } from "next-auth/react";
import Router from 'next/router'

// Navigation Link
// let pages = [['Home', '/'], ['Job Board', '/jobSearch'], ['My Jobs', '/homeJobSeeker'], ['Calendar', '/calendar']];
// let settings = [['Job Seeker Home', '/homeJobSeeker'], ['Employer Home', '/homeEmployer'], ['Post Job', '/postJob'],  ['Calendar', '/calendar']];

// TODO: Conditionally Add Login Page
// TODO: Conditionally change pages based on whether the user is logged in.

let userImage = 'https://upload.wikimedia.org/wikipedia/commons/3/34/Elon_Musk_Royal_Society_%28crop2%29.jpg';
let companyImage = 'https://pbs.twimg.com/profile_images/1488548719062654976/u6qfBBkF_400x400.jpg';

const NavBar = ({ page }) => {
  const [notifications, setNotifications] = useState([]);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const [importingResume, updateImportingResume] = useState(false);
  const [showNotifications, updateShowNotifications] = useState(false);
  const [pages, setPages] = useState([['Job Board', '/jobSearch'], ['Log In', '/login']]);
  const [settings, setSettings] = useState([['Job Seeker Home', '/homeJobSeeker'], ['Employer Home', '/homeEmployer'], ['Post Job', '/postJob'],  ['Calendar', '/calendar']]);
  const { status, data } = useSession();
  const [avatarImage, setAvatarImage] = useState('')

  // TODO: Routinely pull down items from user for notifications:

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleSignOut = (e) => {
    e.preventDefault();
    signOut();
    // console.log('reroute')
    Router.replace("/login");
  }
  useEffect(() => {
    if(!data) {
      return;
    }

    const apiNotifications = () => {
      // console.log('this is the user id', data?.user.id)
      // console.log('this is all stored in sesshionstorage', data?.user.role)
      // console.log('making axios call');
      axios.get('http://localhost:3001/notifications', {params: {user_id: data?.user.id}})
      .then(res => setNotifications(res.data))
      .catch(err => console.log(err))
    };

    const interval = setInterval(apiNotifications, 60000);

    return () => clearInterval(interval);
  }, [])

  //need seeker_id from session info
  useEffect(() => {
    // if (status === "unauthenticated" || data?.user.role !== 'seeker') Router.replace("/login");
    if (status === 'unauthenticated' || !data?.user.role) {
      let p = [['Job Board', '/jobSearch'], ['Log In', '/login']]
      let s = [['Log In', '/login']];
      setPages(p);
      setSettings(s);
    } else if (data?.user.role === 'seeker') {
      console.log('changing seeker name');
      let p = [['Job Board', '/jobSearch'], ['My Jobs', '/homeJobSeeker'],  ['Calendar', '/calendar']];
      let s = [['Job Seeker Home', '/homeJobSeeker']];
      setPages(p);
      setSettings(s);
      setAvatarImage(data?.user.image_url)
    } else if (data?.user.role === 'employer') {
      let p = [['My Jobs', '/homeEmployer'], ['Post Job', '/postJob'], ['Calendar', '/calendar']];
      let s = [['Employer', '/homeEmployer'], ['Post Job', '/postJob']];
      setPages(p);
      setSettings(s);
      setAvatarImage(data?.user.image_url)
    }
    // return () => {}
  }, []);

  return (
    <AppBar position='static' sx={{ bgcolor: '#E44F48' }}>
      <Container maxWidth="xl" >
        <Toolbar disableGutters>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="user-account"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((apage) => (
                <Link key={apage[1]} href={apage[1]} passHref style={{ textDecoration: 'none', color: 'black' }}>
                  <MenuItem key={apage} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{apage[0]}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'flex' } }}>
            <Image src='/assets/logo.png' alt='Job-Pursuit-Logo' width='200' height='50' />
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (

              <Link key={page[1]} href={page[1]} passHref style={{ textDecoration: 'none', color: 'inherit' }}>
                <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  <Typography textAlign="center">{page[0]}</Typography>
                </Button>
              </Link>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="user" src={avatarImage} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {settings.map((setting) => (

                  <Link key={setting[1]} href={setting[1]} passHref style={{ textDecoration: 'none', color: 'black' }}>
                    <MenuItem key={setting[0]} onClick={handleCloseUserMenu} >
                      <Typography textAlign="center" underline='none'>{setting[0]}</Typography>
                    </MenuItem>
                  </Link>
              ))}
              <MenuItem key={'notifications'} onClick={event => {
                updateShowNotifications(true)}}>
                <Typography textAlign="center">Notifications {'(' + notifications.length + ')'}</Typography>
              </MenuItem>
              {data?.user.role === 'seeker' && <MenuItem key={'upload'} onClick={e => updateImportingResume(true)}>
                <Typography textAlign="center">Upload Resume</Typography>
              </MenuItem>}
              {data?.user.role && <MenuItem key={'signout'} onClick={handleSignOut}>
                <Typography textAlign="center">Sign out</Typography>
              </MenuItem>}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
      <ResumeForm visible={importingResume} updateVisible={updateImportingResume} />
      <Notifications visible={showNotifications} updateVisible={updateShowNotifications} notifications={notifications} setNotifications={setNotifications}/>
    </AppBar>
  )

};

export default NavBar;