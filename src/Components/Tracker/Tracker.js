import React from 'react'
import './Tracker.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined'
import Stack from '@mui/material/Stack';

export default function Tracker(){
    
    return(
       <Box id="tracker-container">
            <span> 
                <h2>
                    Create or Upload Tracker
                    <Tooltip title='Create new table or upload a generated file created by this website to continue where you left off.'>
                        <InfoOutlinedIcon style={{paddingLeft: "10px"}} />
                    </Tooltip>
                </h2>
                <Stack direction="row" spacing={2}>
                    <Button>CREATE</Button>
                    <Button>UPLOAD</Button>
                </Stack>
            </span>
       </Box>
    )
}