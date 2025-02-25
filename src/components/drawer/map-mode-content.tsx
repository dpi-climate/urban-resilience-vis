import React, { useState } from 'react'
import { Box, FormControl, Typography, Select, MenuItem, SelectChangeEvent, styled } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

import { modes } from '../../utils/modes'
import { TModeOption } from '../../types-and-interfaces/types'

const StyledSelect = styled(Select)({
  width: '100%',
  backgroundColor: '#132666',
  color: 'white',
  borderRadius: 4,
  textAlign: 'left',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  '& .MuiSelect-select': {
    padding: '8px 16px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  '&:hover': {
    backgroundColor: '#45A049',
  },
  '&.Mui-focused': {
    backgroundColor: '#45A049',
  },
  '& .MuiOutlinedInput-notchedOutline': {
    border: 'none', // Removes the default border
  },
  '& .MuiSelect-icon': {
    color: 'white',
  },
})

const ModeOptions: React.FC = () => {
  const initialMode = modes.some((mode) => mode.id === 'single') 
    ? 'single' 
    : modes[0]?.id || ''

  const [activeValue, setActiveValue] = useState<string>(initialMode)

  const handleChange = (event: SelectChangeEvent<unknown>) => {
    setActiveValue(event.target.value as string)
  }

  return (
    <Box sx={{ pl: 2, mb: 2, width: 300 }}>
      <FormControl fullWidth>
        <Typography variant="h6" sx={{ mb: 2, color: '#132666', fontWeight: 'bold' }}>
          Screen
        </Typography>
        <StyledSelect
          labelId="mode-select-label"
          value={activeValue}
          onChange={handleChange}
          IconComponent={ExpandMoreIcon}
        >
          {modes.map((modeObj: TModeOption) => (
            <MenuItem key={`mode-${modeObj.id}`} value={modeObj.id}>
              {modeObj.name}
            </MenuItem>
          ))}
        </StyledSelect>
      </FormControl>
    </Box>
  )
}

export default ModeOptions



