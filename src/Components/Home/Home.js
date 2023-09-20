import './Home.css'
import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import ROICalculator from '../ROI-Calculator/ROICalculator';
import StackedDeckSpot from '../StackedDeckSpot/StackedDeckSpot';
import Tracker from '../Tracker/Tracker'
import NotFoundPage from '../NotFoundPage/NotFoundPage';
export default function Home () {
    const [ selectedTab, setSelectedTab ] = React.useState(0);

    function a11yProps(index) {
        return {
          id: `simple-tab-${index}`,
          'aria-controls': `simple-tabpanel-${index}`,
        };
      }

    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
    };
    
    const renderSwitch = (param) => {
      switch(param){
        case 0:
          return <ROICalculator/>
        case 1:
          return <StackedDeckSpot/>
        case 2: 
          return <Tracker/>
        default:
          return <NotFoundPage/>
      }
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs  value={selectedTab} onChange={handleChange} >
                <Tab label="ROI" {...a11yProps(0)} />
                <Tab label="Stacked Deck Spot" {...a11yProps(1)} />
                <Tab label="Tracker" {...a11yProps(2)} />
                <Tab label="TBD" {...a11yProps(3)} />
            </Tabs>
            </Box>
            {renderSwitch(selectedTab)}
           
        </Box>

    )




}