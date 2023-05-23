import React from "react"
import { Box } from "@mui/material"
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './ROICalculator.css'
export default function ROICalculator() {

    return (
        <Box className="roi-container">
            <Stack className="roi-stack" spacing={2} direction="row">
                <TextField label=""></TextField>
                <TextField></TextField>
                <TextField></TextField>
                <TextField></TextField>

            </Stack>
        </Box>
       



    )

}