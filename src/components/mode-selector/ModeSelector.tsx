import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Button,
  Radio,
  FormControlLabel,
  Box,
  Collapse,
  RadioGroup,
  Typography
} from '@mui/material'

import { screenModes } from '../../utils/contants'
import { TMode, TModeOption } from '../../types-and-interfaces/types'

interface ModeSelectorProps {
  value: string
  onChange: (id: TMode) => void
}

const ModeSelector: React.FC<ModeSelectorProps> = (props) => {
  const [expanded, setExpanded] = useState<boolean>(false)

  const handleModeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value as TMode
    
    if (newValue !== props.value) {
      props.onChange(newValue)
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        width: 300,
        backgroundColor: 'white',
        userSelect: "none"
      }}
    >
      <Typography variant="h6" sx={{ mb: 1 }}>
        Screen Modes
      </Typography>

      <Box sx={{ width: '100%' }}>
        <Button
          onClick={() => setExpanded((prev) => !prev)}
          fullWidth
          variant="contained"
          sx={{
            mb: 1,
            textAlign: 'left',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            backgroundColor: '#132666',
            color: 'white',
            '&:hover': {
              backgroundColor: '#45A049',
            },
          }}
        >
          
          {`${screenModes.filter(m => m.id === props.value)[0].name}`}
          
          {expanded ? (
            <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} />
          ) : (
            <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
          )}
        </Button>

        <Collapse in={expanded} timeout={300}>
          <Box
            sx={{
              pl: 2,
              mb: 2,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <RadioGroup
              name="screen-mode"
              value={props.value}
              onChange={handleModeChange}
            >
              {screenModes.map((obj: TModeOption, index: number) => (
                <FormControlLabel
                  key={`screen-mode-${index}`}
                  value={obj.id}
                  control={<Radio />}
                  label={obj.name}
                />
              ))}
            </RadioGroup>
          </Box>
        </Collapse>
      </Box>
    </Box>
  )
}

export default ModeSelector

