import React from 'react'
import './Tracker.css'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
export default function Tracker(){
    let table = {
        'name': '',
        values: []
    }

    let savedTrackerStable = [
        {
            name: 'Sanctum Loot Tracker',
            values: [
                {name: 'Annul', count: 0},
                {name: 'Exalts', count: 0},
                {name: 'Divines', count: 0},
                {name: 'Sacred', count: 0},
                {name: 'Mirrors', count: 0}
    
            ]
        }
    
    ]


    const [tableName, setTableName] = React.useState('') 
    const [tableNameCreated, setTableNameCreated] = React.useState(false)
    const [tableNameValidator, setTableNameValidator] = React.useState('')
    const [savedTracker, setSavedTracker] = React.useState([...savedTrackerStable])
    const createTableName = () => {
        if(tableName){
            setTableNameCreated(true)
            setTableNameValidator(false)
        }else{
            setTableNameCreated(false)
            setTableNameValidator(true)
        }
    }
    const updateValue = (name, addsub) => {
        let savedTrackerCopy = [...savedTracker]
       savedTrackerCopy[0].values.map(val => {
            if(val.name === name){
                addsub === 'add' ?
                    val.count = val.count +1
                :
                    val.count = val.count - 1
            }
        })
        setSavedTracker([...savedTrackerCopy])
    }
    return(
        // <>
        //     {tableNameValidator && <Alert onClose={() => {setTableNameValidator(false)}} severity="error">Please add a table name.</Alert>}
        //     <Box id="tracker-container">
        //         <h1> Tracker ?</h1>
        //         {
        //             tableNameCreated ?

        //             <Stack direction="row" spacing={1}>
        //                 <h2>{tableName}</h2>
        //                 <IconButton onClick={() => setTableNameCreated(false)} ><EditIcon/></IconButton>
        //             </Stack>
        //             :
        //             <Stack direction="row" spacing={2} >
        //                 <TextField label="File Name" defaultValue={tableName} onChange={e => setTableName(e.target.value)} />
        //                 <Button onClick={createTableName} variant="text" size="medium" color="success">Submit</Button>
        //             </Stack>
        //         }
        //     </Box>
        // </>
        <>
        <h1>Random Trackers</h1>
        {savedTracker.map(tracker => 
            <>
                <h2 id="tracker-container">{tracker.name}</h2>
                {tracker.values.map(value => 
                    <Stack direction="row" spacing={4}>
                        <h3>{value.name}: {value.count}</h3>
                        <IconButton onClick={() => updateValue(value.name, 'add')}>
                            <AddIcon/>
                        </IconButton>
                        <IconButton onClick={() => updateValue(value.name, 'subtract')}>
                            <RemoveIcon/>
                        </IconButton>
                        
                    </Stack>

                )}
            </>
        )}
        </>
    )
}