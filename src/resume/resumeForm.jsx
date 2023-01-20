import React from 'react';
import Button from '@mui/material/Button';
import WorkExperience from './workExperience.jsx';
import Education from './education.jsx';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import axios from 'axios';
import { useSession } from "next-auth/react";

const { useState, useEffect } = React;
const ResumeForm = ({ visible, updateVisible }) => {
  const [works, updateWorks] = useState([{}]);
  const [eds, updateEds] = useState([{}]);
  const [skills, updateSkills] = useState('');
  const { status, data } = useSession();

  useEffect(() => {
    if (!data?.user.id) {
      return;
    }
    axios.get('http://localhost:3001/education', { params: { seeker_id: data?.user.id } })
      .then(res => {
        if (res.data.length === 0) {
          updateEds([{}])
        } else {
          updateEds(res.data);
        }
      })
      .catch(err => console.log(err))
    axios.get('http://localhost:3001/workExperience', { params: { seeker_id: data?.user.id } })
      .then(res => {
        if (res.data.length === 0) {
          updateWorks([{}])
        } else {
          updateWorks(res.data);
        }
      })
      .catch(err => console.log(err))
      axios.get('http://localhost:3001/skills', { params: { seeker_id: data?.user.id } })
        .then(res => {
          let string = '';
          res.data.forEach(skill => {
            if (string.length > 0) {
              string += ', ';
            };
            string += skill.skill;
          })
          updateSkills(string);
        })
        .catch(err => console.log(err));
  }, [data])

  const addWork = () => {
    let workList = [...works];
    workList.push({});
    updateWorks(workList);
  }

  const removeWork = () => {
    if (works[works.length - 1].id) {
      axios.delete('http://localhost:3001/workExperience', { data: { work_experience_id: works[works.length - 1].id } })
        .catch(err => console.log(err))
    }
    let workList = works.slice(0, works.length - 1);
    updateWorks(workList);
  }

  const addEds = () => {
    let edsList = [...eds];
    edsList.push({});
    updateEds(edsList);
  }

  const removeEd = () => {
    if (eds[eds.length - 1].id) {
      axios.delete('http://localhost:3001/education', { data: { education_id: eds[eds.length - 1].id } })
        .catch(err => console.log(err))
    }
    let edList = eds.slice(0, eds.length - 1);
    updateEds(edList);
  }

  const submit = (e) => {
    e.preventDefault();
    eds.forEach(ed => {
      ed.seeker_id = data?.user.id;
      if (!ed.id) {
        axios.post('http://localhost:3001/education', ed)
          .catch(err => console.log(err))
      } else {
        axios.patch('http://localhost:3001/updateEducation', ed)
          .catch(err => console.log(err))
      }
    });
    works.forEach(work => {
      work.seeker_id = data?.user.id;
      if (!work.id) {
        axios.post('http://localhost:3001/workExperience', work)
          .catch(err => console.log(err))
      } else {
        axios.patch('http://localhost:3001/workExperience', work)
          .catch(err => console.log(err))
      }
    });
    axios.post('http://localhost:3001/skills', { skills, seeker_id: data?.user.id })
          .catch(err => console.log(err))
    updateVisible(false);
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
    justifyContent: 'space-evenly',
    width: '100%',
    marginTop: '20px'
  }

  const inputStyle = {
    marginTop: '20px',
    width: '80%'
  }

  return (
    <Modal sx={{ top: '10%', overflow: 'scroll' }} open={visible}>
      <Box sx={boxStyle}>
        <form onSubmit={submit} style={{ width: '100%' }}>
          <div style={{width: '100%', display: 'flex', justifyContent: 'center'}}><h1 style={{ color: '#E44F48', fontFamily: 'Montserrat' }}>Uploading Resume</h1></div>
          <h2 style={{ color: '#E44F48', fontFamily: 'Montserrat' }}>Work Experience</h2>
          {works.map((work, i) => {
            return <WorkExperience index={i} works={works} key={i} />
          })}
          <div style={buttonBox}>
            <Button variant={'contained'} onClick={addWork}>Add Work Experience</Button>
            {works.length > 0 && <Button variant={'contained'} onClick={removeWork}>Remove Work Experience</Button>}
          </div>
          <h2 style={{ color: '#E44F48', fontFamily: 'Montserrat' }}>Education</h2>
          {eds.map((ed, i) => {
            return <Education key={i} index={i} eds={eds} />
          })}
          <div style={buttonBox}>
            <Button variant={'contained'} onClick={addEds}>Add Education</Button>
            {eds.length > 0 && <Button variant={'contained'} onClick={removeEd}>Remove Education</Button>}
          </div>
          <h2 style={{ color: '#E44F48', fontFamily: 'Montserrat' }}>Skills</h2>
          <div style={buttonBox}>
            <TextField
              sx={inputStyle}
              label='Skills'
              variant="filled"
              size="small"
              value={skills}
              onChange={e => updateSkills(e.target.value)}
            />
          </div>
          <div style={buttonBox}>
            <Button variant={'contained'} type='submit'>Submit</Button>
            <Button variant={'contained'} onClick={e => {
              updateVisible(false);
            }}>Close</Button>
          </div>
        </form>
      </Box>
    </Modal>
  )
}

export default ResumeForm;