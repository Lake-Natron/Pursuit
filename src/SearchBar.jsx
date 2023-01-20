
import React, {useState,useEffect} from 'react';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SalarySlider from './SalarySlider.jsx';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';


const SearchBar = ({setSearchParams, searchParams,handleSearch, clear, handleClear}) => {
    const [jobType, setJobType] = useState("")


    const handleNameSearch = (e) =>
    {setSearchParams({...searchParams,
    description: e.target.value}) }

    const handleLocationSearch = (e) =>
    {setSearchParams({...searchParams,
    job_site: e.target.value}) }

    const handleSalary = (e) =>
    {setSearchParams({...searchParams,
    salary: e.target.value}) }

    const handleChangeJobType = (e) => 
    {setJobType(e.target.value)
    setSearchParams({...searchParams,
    employment_type: e.target.value}) 
    //console.log(searchParams)}
    }

    return ( 


    <Box ><TextField 
        id="name"
        name = "name"
        label="Job Name"
        onInput={handleNameSearch}
        type="search"
        variant="outlined"
        color="secondary"
        sx={{ m: '18px', width: 200}}
        InputProps={{
        endAdornment: (
            <IconButton>
            <SearchIcon />
            </IconButton>
        ),
        }}
        />
        <TextField 
        id="location"
        name ="location"
        label="Location"
        onInput={handleLocationSearch}
        type="search"
        variant="outlined"
        color="secondary"
        sx={{ m: '18px', width :200}}
        InputProps={{
        endAdornment: (
            <IconButton>
            <LocationOnIcon />
            </IconButton>
        ),
        }}
        /> 
        <SalarySlider/>
        <FormControl sx={{mt : "15px", ml:'40px', width: 200}}>
    <InputLabel color ="secondary" >Job Type</InputLabel>
    <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={jobType}
        label="Job Type"
        onChange={handleChangeJobType}
        color="secondary"
    >
        <MenuItem value={"Full-Time"}>Full-Time</MenuItem>
        <MenuItem value={"Part-Time"}>Part-Time</MenuItem>
        <MenuItem value={"Internship"}>Internship</MenuItem>
        <MenuItem value={"Contract"}>Contract</MenuItem>
    </Select>
    </FormControl>
    <Button  onClick ={handleSearch} sx={{postion:"relative",top : "-30px", ml: '20px'}} variant="contained" size="large" color="secondary">Search</Button>
    {clear &&<Button  onClick ={handleClear} sx={{postion:"relative",top : "-30px", ml: '20px'}} variant="contained" size="large" color="primary">x</Button>}
        </Box>
    )}

    export default SearchBar;