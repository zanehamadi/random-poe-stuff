import React from "react"
import { Box } from "@mui/material"
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import './ROICalculator.css'
import Tooltip from "@mui/material/Tooltip";
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import EggIcon from '@mui/icons-material/Egg';
import EggAltIcon from '@mui/icons-material/EggAlt';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import PropTypes from 'prop-types';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import RestartAltIcon from '@mui/icons-material/RestartAlt';

function ResultsModal(props) {
    const { onClose, open, attempts, avgHitRate, avgHitRateSelected} = props;
  
    const handleClose = () => {
      onClose();
    };
  
  
    return (
      <Dialog onClose={handleClose} open={open}>
        <DialogTitle>Results:</DialogTitle>
        <DialogContent>
            <DialogContentText>
                You have <strong>{attempts}</strong> attempts without hitting the desired outcome before you lose money(if you hit the desired outcome.)
            </DialogContentText>
            {avgHitRateSelected && 
        
                <DialogContentText>
                    On average, you will hit your desired return <strong>{avgHitRate}</strong> times before then.
                </DialogContentText>
                
            }
        </DialogContent>
        
      </Dialog>
    );
  }
ResultsModal.propTypes = {
    onClose: PropTypes.func.isRequired,
    open: PropTypes.bool.isRequired,
    selectedValue: PropTypes.string.isRequired,
};

export default function ROICalculator() {
    // Arguments: 
    const [attemptCost, setAttemptCost] = React.useState('');
    const [hitVal, setHitVal] = React.useState('');
    const [avgReturn, setAvgReturn] = React.useState('');
    const [avgHit, setAvgHit] = React.useState('');

    // Returns: 
    const [attempts, setAttempts] = React.useState(0);
    const [avgHitRate, setAvgHitRate] = React.useState(0);
    const [avgHitRateSelected, setAvgHitRateSelected] = React.useState(false)
    const [submit, setSubmit] = React.useState(false);
    const [showRestart, setShowRestart] = React.useState(false)
    // Validations:
    const [errorValidation, setErrorValidation ] = React.useState(false)
    const [warningValidation, setWarningValidation] = React.useState(false)
    // Modal stuff:
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = (value) => {
        setOpen(false);
        setSubmit(false)
    };


    const resetVariables = () => {
        setAttemptCost('');
        setHitVal('');
        setAvgReturn('');
        setAttempts(0);
        setAvgHitRate(0);
        setAvgHitRateSelected(false)
        setSubmit(false)
        setShowRestart(false)
        setErrorValidation(false)
        setWarningValidation(false)
    }
    
    const poeRoiCalc = () => {
        let validChecker = false;
        if(isNaN(avgReturn)) setAvgReturn(0)
        if(isNaN(hitVal)) setHitVal(0)

        if((!attemptCost || attemptCost === 0) || (!hitVal || hitVal === 0)){
            validChecker = true;
            setErrorValidation(true)
        }
        if((hitVal < attemptCost)|| (avgReturn > attemptCost ) || (avgReturn > hitVal) ){
            validChecker = true;
            setWarningValidation(true)
        }
        if(!validChecker){
            let attempts = 0;
            let totalCost = 0;
            
            while(totalCost < hitVal){
                totalCost += attemptCost;
                totalCost -= avgReturn
                attempts += 1
            }
            if(avgHit){
                let avgHitMath = 1 / avgHit
                setAvgHitRateSelected(true)
                setAvgHitRate(Math.floor(attempts * avgHitMath))
                setAttempts(attempts)
            }else{
                setAvgHitRateSelected(false)
                setAttempts(attempts)
            }
            setSubmit(true)
            setShowRestart(true)
            setErrorValidation(false)
            setWarningValidation(false)
            handleClickOpen()
            
        }
        if(validChecker) setSubmit(false)
    }

    return (
        <>
        {errorValidation && <Alert onClose={() => {setErrorValidation(false)}} severity="error">Please make sure you have entered an attempt cost and a desired return.</Alert>}
        {warningValidation && <Alert onClose={() => {setWarningValidation(false)}} severity="warning"><strong>Note:</strong> The calculator will not let you submit if: 
            <ul>
                <li> Average return is higher than attempt cost</li>
                <li> Desired return is lower than attempt cost</li>
                <li> Average return is higher than desired return</li>
            </ul>
        
         </Alert>}
        <div className="roi-container" >
            <p>
                Quick Tutorial:
                <ul>
                    <li>"Attempt Cost" & "Desired Return" are the <strong>only</strong> required fields. </li>
                    <li> If you are not using "Average Return" and/or "Hit Chance", leave them blank.</li>
                    <li>For "Return on Hit", please enter the total amount of average attempts to hit the outcome. Example: Type 4 instead of .25 or 1/4 </li>
                    <li><strong>NOTE:</strong> Use only one type of currency.(i.e chaos or divine)</li>
                </ul>
            </p>

        </div>
        <Box className="roi-container">
            
            <Stack className="roi-stack" spacing={2} direction="row">
                <Tooltip title="Enter the amount required for each attempt">
                    <TextField value={attemptCost} type="number" className="roi-text-field"  onChange={e => setAttemptCost(parseFloat(e.target.value))} label="Attempt Cost"></TextField>
                </Tooltip>
                <Tooltip title="Enter how much the item will be sold if you hit the desired outcome">
                    <TextField value={hitVal} type="number" className="roi-text-field"  onChange={e => setHitVal(parseFloat(e.target.value))} label="Desired Return"></TextField>
                </Tooltip>
                <Tooltip title="Enter the average return of item sold if you do not hit the desired outcome">
                    <TextField value={avgReturn} type="number" className="roi-text-field"  onChange={e => setAvgReturn(parseFloat(e.target.value))} label="Average Return"></TextField>
                </Tooltip>
                <Tooltip title="Enter the hit chance of desired out come.">
                    <TextField value={avgHit} type="number" className="roi-text-field"  onChange={e => setAvgHit(parseFloat(e.target.value))} label="Hit Chance"></TextField>
                </Tooltip>
                {!submit ?
                    <Tooltip title="Submit">
                        <IconButton onClick={() => poeRoiCalc()} disableRipple id="save-button" variant='contained' size="small">
                            <EggIcon/>
                        </IconButton>
                    </Tooltip>
                :
                    <Tooltip title="Restart">
                        <IconButton onClick={() => resetVariables()} disableRipple id="save-button" variant='contained' size="small">
                            <EggAltIcon/>
                        </IconButton>
                    </Tooltip>
                }
                {showRestart && 
                    <Tooltip title="Restart">
                        <IconButton onClick={() => resetVariables()} disableRipple id="save-button" variant='contained' size="small">
                            <RestartAltIcon/>
                        </IconButton>
                    </Tooltip>
                
                }
                
            </Stack>
        </Box>
            <ResultsModal
                open={open}
                onClose={handleClose}
                attempts={attempts}
                avgHitRate={avgHitRate}
                avgHitRateSelected={avgHitRateSelected}
            />
        </>
       
        


    )

}