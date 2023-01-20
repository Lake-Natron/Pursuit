import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';




const JobSearchList = ({handleJob,job}) => { 

    return(
            <div>
            <ListItem sx={{ mb: '5px', borderRadius: '16px', bgcolor: '#CFCFCF'}}>
            <ListItemButton onClick={(e) => handleJob(job,e)} sx ={{ mb: '5px'}}  > 
              <ListItemText>
               <Typography align="left" variant="body1">
               {job.name}
             </Typography>
             <Typography align="left" variant="body2">
               {job.User.company_name}
             </Typography>
             <Typography align="left" variant="body1" color="secondary">
               {job.location}
             </Typography>
             </ListItemText>  
            </ListItemButton>
          </ListItem>
          </div>
    )
}

export default JobSearchList;