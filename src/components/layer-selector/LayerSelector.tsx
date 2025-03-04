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

interface LayerSelectorProps {
  mode: TMode
  secondLayersIds: string[]
  mainLayersIds: string[]
  setMainLayersIds: React.Dispatch<React.SetStateAction<string[]>>
  setSecondLayersIds: React.Dispatch<React.SetStateAction<string[]>>
}

// For multi mode: which field is selected for option1 and option2 in each group
type TSelectedMulti = Record<
  TFieldGroup,
  {
    option1: string | null
    option2: string | null
  }
>

const LayerSelector: React.FC<LayerSelectorProps> = (props) => {
    
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
  const [selectedSingle, setSelectedSingle] = useState<Record<string, string | null>>({})
  // const [selectedMulti, setSelectedMulti] = useState<TSelectedMulti>({} as TSelectedMulti)
  const [selectedMulti, setSelectedMulti] = useState<Record<string, { option1: string | null, option2: string | null }>>({})


  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  /**
   * SINGLE MODE: click a radio to toggle it. If already selected, unselect it.
   */
  const handleSingleRadioClick = (radioId: string, fieldId: string) => {
    const currentValue = selectedSingle[radioId] || null;
    const newValue = currentValue === fieldId ? null : fieldId;
    const updatedSelection = {
      ...selectedSingle,
      [radioId]: newValue,
    };
  
    setSelectedSingle(updatedSelection);
  
    // Get all selected field IDs from updatedSelection.
    const allSelected = Object.values(updatedSelection).filter(Boolean) as string[];
    props.setMainLayersIds(allSelected);
  };
  
  
  /**
   * MULTI MODE: separate "option1" and "option2" radio groups, 
   * each can have exactly one selected field, but can be unselected on second click.
   */

  const handleOptionRadioClick = (
    radioId: string,
    option: 'option1' | 'option2',
    fieldId: string
  ) => {
    const currentSelection = selectedMulti[radioId] || { option1: null, option2: null }
    const newValue = currentSelection[option] === fieldId ? null : fieldId
    const updatedSelection = {
      ...selectedMulti,
      [radioId]: { ...currentSelection, [option]: newValue },
    }
  
    setSelectedMulti(updatedSelection)
  
    const setFunction = option === "option1"
      ? props.setMainLayersIds
      : props.setSecondLayersIds
  
    setFunction((prev) =>
      newValue !== null
        ? [...prev.filter((d) => d !== currentSelection[option]), fieldId]
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
        userSelect: "none"
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
                  const currentlySelected = selectedSingle[field.radioId] || null;
                  const isChecked = currentlySelected === field.id;

                  return (
                    <FormControlLabel
                      key={field.id}
                      control={
                        <Radio
                          // name={`single-${group}`}
                          name={`single-${field.radioId}`}
                          checked={isChecked}
                          onClick={() => handleSingleRadioClick(field.radioId, field.id)}
                        />
                      }
                      label={field.name}
                    />
                  )
                })
              ) : (
                // =========== TWO OPTIONS MODE ============
                fields[group as keyof typeof fields].map((field: TField) => {
                  const currentSelection = selectedMulti[field.radioId] || { option1: null, option2: null }
                  const isChecked1 = currentSelection.option1 === field.id
                  const isChecked2 = currentSelection.option2 === field.id

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
                            name={`multi-${field.radioId}-option1`}
                            checked={isChecked1}
                            onClick={() =>
                              handleOptionRadioClick(field.radioId, 'option1', field.id)
                            }
                          />
                        }
                        label=""
                      />

                      {/* Option2 radio */}
                      <FormControlLabel
                        control={
                          <Radio
                            name={`multi-${field.radioId}-option2`}
                            checked={isChecked2}
                            onClick={() =>
                              handleOptionRadioClick(field.radioId, 'option2', field.id)
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

export default LayerSelector