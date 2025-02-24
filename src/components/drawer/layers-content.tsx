import React, { useState } from 'react';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { Button, Radio, RadioGroup, FormControlLabel, Box, Collapse } from '@mui/material';

const VerticalButtonList: React.FC = () => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  const buttons: {group:string, options: string[]}[] = [
    { group: "Forecast",
      options: [ "NO2", "CO", "PM2.5", "PM10", "Temperature" ]
    },
    { group: "Satellites",
      options: [ "MODIS", "ECOSTRESS" ]
    },
    { group: "Observations",
      options: [ "NCEI - Air Temperature" ]
    },
  ]

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, width: 300, backgroundColor: 'white' }}>
      {buttons.map((obj, index) => (
        <Box key={index} sx={{ width: '100%' }}>
          <Button
            onClick={() => toggleExpand(index)}
            fullWidth
            variant="contained"
            // color="primary"
            sx={{ mb: 1, textAlign: 'left', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#132666', color: 'white', '&:hover': {
                backgroundColor: '#45A049',
              }, }}
          >
            {obj.group}
            {expandedIndex === index ? (
              <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} />
            ) : (
              <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
            )}
          </Button>

          <Collapse in={expandedIndex === index} timeout={300}>
            <Box sx={{ pl: 2, mb: 2 }}>
              <RadioGroup defaultValue="option1">
                {obj.options.map((option) => {
                  return <FormControlLabel key={`${obj.group}-${option}`} value={option} control={<Radio />} label={option} />

                })}
              </RadioGroup>
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  );
};

export default VerticalButtonList;
