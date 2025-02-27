import React, { useEffect, useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Button,
  Radio,
  FormControlLabel,
  Box,
  Collapse,
  Typography
} from '@mui/material'

import { fields } from '../../utils/fields'
import { TField, TFieldGroup, TMode } from '../../types-and-interfaces/types'

interface VerticalButtonListProps {
  mode: TMode
  secondLayersIds: string[]
  mainLayersIds: string[]
  setMainLayersIds: React.Dispatch<React.SetStateAction<string[]>>
  setSecondLayersIds: React.Dispatch<React.SetStateAction<string[]>>
}

type TSelectedSingle = Record<TFieldGroup, string | null>

// For multi mode: which field is selected for option1 and option2 in each group
type TSelectedMulti = Record<
  TFieldGroup,
  {
    option1: string | null
    option2: string | null
  }
>

const LayersOptions: React.FC<VerticalButtonListProps> = (props) => {
    
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [selectedSingle, setSelectedSingle] = useState<Partial<TSelectedSingle>>({} as TSelectedSingle)
  const [selectedMulti, setSelectedMulti] = useState<TSelectedMulti>({} as TSelectedMulti)

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  /**
   * SINGLE MODE: click a radio to toggle it. If already selected, unselect it.
   */
  const handleSingleRadioClick = (group: TFieldGroup, fieldId: string) => {
    const currentValue = selectedSingle[group] || null
    const newValue = currentValue === fieldId ? null : fieldId
    
    const updatedSelection = {
      ...selectedSingle,
      [group]: newValue,
    }
  
    setSelectedSingle(updatedSelection)
  
    const allSelected = Object.values(updatedSelection).filter(Boolean) as string[]
    props.setMainLayersIds(allSelected)
  }
  

  /**
   * MULTI MODE: separate "option1" and "option2" radio groups, 
   * each can have exactly one selected field, but can be unselected on second click.
   */

  const handleOptionRadioClick = (
      group: TFieldGroup,
      option: 'option1' | 'option2',
      fieldId: string
    ) => {
      
      const currentGroup = selectedMulti[group] || { option1: null, option2: null }
      const newValue = currentGroup[option] === fieldId ? null : fieldId
    
      const updatedGroup = {
        ...currentGroup,
        [option]: newValue,
      }
    
      const updatedSelection = {
        ...selectedMulti,
        [group]: updatedGroup,
      }
      
      setSelectedMulti(updatedSelection)

      const setFunction = option === "option1"
        ? props.setMainLayersIds
        : props.setSecondLayersIds

      setFunction((prev) =>
        newValue !== null
          ? [...prev.filter((d) => d !== currentGroup[option]), fieldId]
          : prev.filter((d) => d !== fieldId)
      )
  }

  const buttons: TFieldGroup[] = Object.keys(fields) as TFieldGroup[]

  useEffect(() => {
    
    if(props.secondLayersIds.length === 0) {
      setSelectedMulti({} as TSelectedMulti)
    }

  },[props.secondLayersIds])

  useEffect(() => {
    if(props.mainLayersIds.length === 0) {
      setSelectedSingle({})
    }
    
  },[props.mainLayersIds])

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 2,
        width: 300,
        backgroundColor: 'white',
      }}
    > 
      <Typography variant="h6" sx={{ mb: 1 }}>
        Layers
      </Typography>
      {buttons.map((group: TFieldGroup, index: number) => (
        <Box key={index} sx={{ width: '100%' }}>
          <Button
            onClick={() => toggleExpand(index)}
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
            {group}
            {expandedIndex === index ? (
              <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} />
            ) : (
              <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
            )}
          </Button>

          <Collapse in={expandedIndex === index} timeout={300}>
            <Box
              sx={{
                pl: 2,
                mb: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              {props.mode === 'single' ? (
                // =========== SINGLE MODE ============
                fields[group as keyof typeof fields].map((field: TField) => {
                  const currentlySelected = selectedSingle[group] || null
                  const isChecked = currentlySelected === field.id

                  return (
                    <FormControlLabel
                      key={field.id}
                      control={
                        <Radio
                          name={`single-${group}`}
                          checked={isChecked}
                          onClick={() => handleSingleRadioClick(group, field.id)}
                        />
                      }
                      label={field.name}
                    />
                  )
                })
              ) : (
                // =========== TWO OPTIONS MODE ============
                fields[group as keyof typeof fields].map((field: TField) => {
                  const groupState = selectedMulti[group] || {
                    option1: null,
                    option2: null,
                  }
                  const isChecked1 = groupState.option1 === field.id
                  const isChecked2 = groupState.option2 === field.id

                  return (
                    <Box
                      key={field.id}
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        // gap: 2,
                        mb: 1,
                      }}
                    >
                      {/* Option1 radio */}
                      <FormControlLabel
                        control={
                          <Radio
                            name={`multi-${group}-option1`}
                            checked={isChecked1}
                            onClick={() =>
                              handleOptionRadioClick(group, 'option1', field.id)
                            }
                          />
                        }
                        label=""
                      />

                      {/* Option2 radio */}
                      <FormControlLabel
                        control={
                          <Radio
                            name={`multi-${group}-option2`}
                            checked={isChecked2}
                            onClick={() =>
                              handleOptionRadioClick(group, 'option2', field.id)
                            }
                          />
                        }
                        label={`${field.name}`}
                      />
                    </Box>
                  )
                })
              )}
            </Box>
          </Collapse>
        </Box>
      ))}
    </Box>
  )
}

export default LayersOptions