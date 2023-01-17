import React from 'react';
import Button from '@mui/material/Button';
import WorkExperience from './workExperience.jsx';
import Education from './education.jsx';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const { useState, useEffect } = React;
const ResumeForm = ({ visible, updateVisible }) => {
  const [works, updateWorks] = useState([{}]);
  const [eds, updateEds] = useState([{}]);
  const [skills, updateSkills] = useState('');

  useEffect(() => {
    // Upload resume from existing data
  }, [])

  const addWork = () => {
    let workList = [...works];
    workList.push({});
    updateWorks(workList);
  }

  const removeWork = () => {
    let workList = works.slice(0, eds.length - 1);
    updateWorks(workList);
  }

  const addEds = () => {
    let edsList = [...eds];
    edsList.push({});
    updateEds(edsList);
  }

  const removeEd = () => {
    let edList = eds.slice(0, eds.length - 1);
    updateEds(edList);
  }

  const submit = (e) => {
    e.preventDefault();
    eds.forEach(ed => console.log(ed));
  }

  const boxStyle = {
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: 'auto',
    width: '60%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingRight: '20px',
    paddingLeft: '20px',
    paddingBottom: '10px'
  }

  const buttonBox = {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    marginTop: '20px'
  }

  const inputStyle={
    marginTop: '20px',
    width: '80%'
  }

  return (
    <Modal sx={{ top: '10%', overflow: 'scroll' }} open={visible}>
      <Box sx={boxStyle}>
        <form onSubmit={submit} style={{width: '100%'}}>
          <h1 style={{color: '#E44F48', fontFamily: 'Montserrat'}}>Uploading Resume</h1>
          {works.map((work, i) => {
            return <WorkExperience index={i} works={works} key={i} />
          })}
          <div style={buttonBox}>
          <Button onClick={addWork}>Add Work Experience</Button>
          {works.length > 0 && <Button onClick={removeWork}>Remove Work Experience</Button>}
          </div>
          {eds.map((ed, i) => {
            return <Education key={i} index={i} eds={eds} />
          })}
          <div style={buttonBox}>
            <Button onClick={addEds}>Add Education</Button>
            {eds.length > 0 && <Button onClick={removeEd}>Remove Education</Button>}
          </div>
          <div style={buttonBox}>
          <TextField
            sx={inputStyle}
            label='Skills'
            required
            variant="filled"
            size="small"
            onChange={e => updateSkills(e.target.value)}
          />
          </div>
          <div style={buttonBox}>
          <Button type='submit'>Submit</Button>
          <Button onClick={e => {
          updateVisible(false);
          }}>Close</Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default ResumeForm;