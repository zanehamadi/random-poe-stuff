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
    const [display, setDisplay] = React.useState('')
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
    const randomHideRoll = () => {
        let randomNumber = Math.floor(Math.random() * 2);
        randomNumber ? setDisplay('hide') : setDisplay('show')
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
            <Stack direction="row" spacing={5}>
                <Stack style={{marginTop: '2vh'}}> 
                    {
                        selectedSpot ? 
                        <>
                            <Button onClick={() => randomNumberRoll()} variant="outlined">
                                Roll Again
                            </Button>
                            <Stack direction="row" className="stack-deck-text">
                                <Typography style={{marginTop: '2vh'}} id={selectedSpot} variant="h4">
                                    {selectedSpot.toUpperCase()}
                                </Typography>
                                {counter > 0 && 
                                        <Tooltip placement='right' title={`You have hit ${selectedSpot} ${counter + 1} times`}>
                                            <InfoOutlinedIcon  style={{marginTop: '2vh'}} fontSize='1px'/>
                                        </Tooltip>
                                }

                            </Stack>
                        
                        </>
                        :

                            <Button onClick={() => randomNumberRoll()} variant="outlined">
                                Roll Spot
                            </Button>

                    }

                </Stack>
                <Stack style={{marginTop: '2vh'}}> 
                    {
                        display ? 
                        <>
                            <Button onClick={() => randomHideRoll()} variant="outlined">
                                Roll Again
                            </Button>
                            <Stack direction="row" className="stack-deck-text">
                                <Typography style={{marginTop: '2vh'}}variant="h4">
                                    {display.toUpperCase()}
                                </Typography>

                            </Stack>
                        
                        </>
                        :

                            <Button onClick={() => randomHideRoll()} variant="outlined">
                                Roll
                            </Button>

                    }

                </Stack>

            </Stack>
        </div>
    )
}