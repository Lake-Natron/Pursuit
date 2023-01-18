import React, {useState} from 'react';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Typography } from '@mui/material';




const JobSearchList = ({job}) => { 

    return(
            <div>
            <ListItem sx={{ mb: '5px', borderRadius: '16px', bgcolor: '#CFCFCF'}}>
            <ListItemButton sx ={{ mb: '5px'}}  > 
              <ListItemText>
               <Typography align="left">
               {job.name}
             </Typography>
             </ListItemText>  
            </ListItemButton>
          </ListItem>
          </div>
    )
}

export default JobSearchList;