import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import React from "react"
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import './StackedDeckSpot.css'
import Tooltip from '@mui/material/Tooltip';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

export default function StackedDeckSpot(){
    const spots = ['Izaro','Mine', 'Tane', 'Beast' ]
    const [selectedSpot, setSelectedSpot] = React.useState('')
    const [counter, setCounter] = React.useState(0)

    const randomNumberRoll = () => {
        let randomNumber = Math.floor(Math.random() * 4);
        if(selectedSpot === spots[randomNumber]){
            setCounter(counter + 1)
        }else {
            setCounter(0)
            setSelectedSpot(spots[randomNumber]) 
        }
        
        
    }
    return (
        <div className='stacked-deck-drop-container'>
            <Box className="stacked-deck-text-container stack-deck-text" >
                <Typography variant="body1">
                    This is to pick where you are going to drop stacked decks 
                </Typography>
                <Typography variant="caption" style={{color: 'grey'}}>
                    This is extremely useless, I just can't make decisions. 
                </Typography>
            </Box>
            <Stack style={{marginTop: '2vh'}}> 
                {
                    selectedSpot ? 
                    <>
                        <Stack direction="row" className="stack-deck-text">
                            <Typography id={selectedSpot} variant="h4">
                                {selectedSpot.toUpperCase()}
                            </Typography>
                            {counter > 0 && 
                                    <Tooltip placement='right' title={`You have hit "${selectedSpot}" ${counter} time${counter > 1 ? 's' : ''}`}>
                                        <InfoOutlinedIcon fontSize='1px'/>
                                    </Tooltip>
                            }

                        </Stack>
                        <Button onClick={() => randomNumberRoll()} variant="outlined">
                            Roll Again
                        </Button>
                    
                    </>
                    :

                        <Button onClick={() => randomNumberRoll()} variant="outlined">
                            Roll
                        </Button>

                }

            </Stack>
        </div>
    )
}