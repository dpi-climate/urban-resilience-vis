import React, { useState } from 'react'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import {
  Button,
  Radio,
  FormControlLabel,
  Box,
  Collapse,
} from '@mui/material'

import { fields } from '../../utils/fields'
import { TField, TFieldGroup } from '../../types-and-interfaces/types'

interface VerticalButtonListProps {
  mode: string
  setMainLayersIds: (ids: string[]) => void
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

const VerticalButtonList: React.FC<VerticalButtonListProps> = (props) => {
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

  // SINGLE-mode: store exactly one chosen field per group (or none).
  const [selectedSingle, setSelectedSingle] = useState<TSelectedSingle>({})

  // MULTI-mode: store which field is chosen for option1 and option2.
  const [selectedMulti, setSelectedMulti] = useState<TSelectedMulti>({})

  const toggleExpand = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index))
  }

  /**
   * SINGLE MODE: click a radio to toggle it. If already selected, unselect it.
   */
  const handleSingleRadioClick = (group: TFieldGroup, fieldId: string) => {
    const currentValue = selectedSingle[group] || null
    const newValue = currentValue === fieldId ? null : fieldId

    console.log("newValue", newValue)
    
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
  
      const allSelected: string[] = [];
      Object.values(updatedSelection).forEach((obj) => {
        if (obj.option1) allSelected.push(obj.option1)
        if (obj.option2) allSelected.push(obj.option2)
      });
    
      props.setMainLayersIds(allSelected);
  }

  const buttons: TFieldGroup[] = Object.keys(fields) as TFieldGroup[]

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
            {/* 
                Force a single-column layout for single mode, 
                and also use column layout for multi-mode but each field 
                has side-by-side options. 
            */}
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
                fields[group].map((field: TField) => {
                  const currentlySelected = selectedSingle[group] || null
                  const isChecked = currentlySelected === field.id

                  return (
                    <FormControlLabel
                      key={field.id}
                      control={
                        <Radio
                          name={`single-${group}`} // single group name
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
                fields[group].map((field: TField) => {
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
                        flexDirection: 'row', // side by side for this field
                        // gap: 2,
                        mb: 1,
                      }}
                    >
                      {/* Option1 radio */}
                      <FormControlLabel
                        // sx={{ margin: 0}}
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

export default VerticalButtonList


// import React, { useState } from 'react'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import ExpandLessIcon from '@mui/icons-material/ExpandLess'
// import {
//   Button,
//   Radio,
//   FormControlLabel,
//   Box,
//   Collapse,
// } from '@mui/material'

// import { fields } from '../../utils/fields'
// import { TField, TFieldGroup } from '../../types-and-interfaces/types'

// interface VerticalButtonListProps {
//   mode: string
//   setMainLayersIds: (ids: string[]) => void
// }

// type TSelectedSingle = Record<TFieldGroup, string | null>

// type TSelectedMulti = Record<
//   TFieldGroup,
//   {
//     option1: string | null
//     option2: string | null
//   }
// >

// const VerticalButtonList: React.FC<VerticalButtonListProps> = (props) => {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null)

//   // 1) Single-mode selection: store exactly one chosen field per group (or none).
//   const [selectedSingle, setSelectedSingle] = useState<TSelectedSingle>({})

//   // 2) Two-option mode: store which field is chosen for option1 and option2 per group.
//   const [selectedMulti, setSelectedMulti] = useState<TSelectedMulti>({})

//   const toggleExpand = (index: number) => {
//     setExpandedIndex((prev) => (prev === index ? null : index))
//   }

//   /**
//    * SINGLE MODE (mode === "single")
//    * If the user clicks the *same* radio again, we unselect it.
//    */
//   const handleSingleRadioClick = (group: TFieldGroup, fieldId: string) => {
//     setSelectedSingle((prev) => {
//       const current = prev[group] || null
//       // If the user is clicking the same radio, unselect (null).
//       const newValue = current === fieldId ? null : fieldId

//       const updated = {
//         ...prev,
//         [group]: newValue,
//       }

//       // Convert all group selections to an array (excluding null)
//       const allSelected = Object.values(updated).filter(Boolean) as string[]
//       props.setMainLayersIds(allSelected)

//       return updated
//     })
//   }

//   /**
//    * TWO-OPTION MODE (mode !== "single")
//    * Each option is its own radio group across all fields in that group.
//    */
//   const handleOptionRadioClick = (group: TFieldGroup, option: 'option1' | 'option2', fieldId: string) => {
//     setSelectedMulti((prev) => {
//       const currentGroup = prev[group] || { option1: null, option2: null }
//       const currentValue = currentGroup[option]
//       // If user clicks the same radio again, unselect
//       const newValue = currentValue === fieldId ? null : fieldId

//       const updatedGroup = {
//         ...currentGroup,
//         [option]: newValue,
//       }

//       const updated = {
//         ...prev,
//         [group]: updatedGroup,
//       }

//       // Flatten everything to an array of selected IDs
//       const allSelected: string[] = []
//       Object.values(updated).forEach((groupObj) => {
//         if (groupObj.option1) allSelected.push(groupObj.option1)
//         if (groupObj.option2) allSelected.push(groupObj.option2)
//       })

//       props.setMainLayersIds(allSelected)
//       return updated
//     })
//   }

//   const buttons: TFieldGroup[] = Object.keys(fields) as TFieldGroup[]

//   return (
//     <Box
//       sx={{
//         display: 'flex',
//         flexDirection: 'column',
//         p: 2,
//         width: 300,
//         backgroundColor: 'white',
//       }}
//     >
//       {buttons.map((group: TFieldGroup, index: number) => (
//         <Box key={index} sx={{ width: '100%' }}>
//           <Button
//             onClick={() => toggleExpand(index)}
//             fullWidth
//             variant="contained"
//             sx={{
//               mb: 1,
//               textAlign: 'left',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               backgroundColor: '#132666',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#45A049',
//               },
//             }}
//           >
//             {group}
//             {expandedIndex === index ? (
//               <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} />
//             ) : (
//               <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
//             )}
//           </Button>

//           <Collapse in={expandedIndex === index} timeout={300}>
//             <Box sx={{ pl: 2, mb: 2 }}>
//               {props.mode === 'single' ? (
//                 // ---------- SINGLE MODE: One radio per field ----------
//                 fields[group].map((field: TField) => {
//                   const currentlySelected = selectedSingle[group] || null
//                   const isChecked = currentlySelected === field.id

//                   return (
//                     <FormControlLabel
//                       key={field.id}
//                       control={
//                         <Radio
//                           name={`single-${group}`} // One group name for all fields in this group
//                           checked={isChecked}
//                           onClick={() => handleSingleRadioClick(group, field.id)}
//                         />
//                       }
//                       label={field.name}
//                     />
//                   )
//                 })
//               ) : (
//                 // ---- TWO-OPTIONS MODE: For each field, 2 side-by-side radios (option1 + option2) ----
//                 fields[group].map((field: TField) => {
//                   const groupState = selectedMulti[group] || {
//                     option1: null,
//                     option2: null,
//                   }
//                   const isChecked1 = groupState.option1 === field.id
//                   const isChecked2 = groupState.option2 === field.id

//                   return (
//                     <Box
//                       key={field.id}
//                       sx={{
//                         display: 'flex',
//                         flexDirection: 'row',
//                         // gap: 2,
//                         mb: 1,
//                       }}
//                     >
//                       {/* Option1 radio */}
//                       <FormControlLabel
//                         // sx={{ margin: 0}}
//                         control={
//                           <Radio
//                             name={`multi-${group}-option1`} // so all fields share same group for option1
//                             checked={isChecked1}
//                             onClick={() =>
//                               handleOptionRadioClick(group, 'option1', field.id)
//                             }
//                           />
//                         }
//                         label=""
//                       />

//                       {/* Option2 radio */}
//                       <FormControlLabel
//                         // sx={{ margin: 0}}
//                         control={
//                           <Radio
//                             name={`multi-${group}-option2`} // so all fields share same group for option2
//                             checked={isChecked2}
//                             onClick={() =>
//                               handleOptionRadioClick(group, 'option2', field.id)
//                             }
//                           />
//                         }
//                         label={`${field.name}`}
//                       />
//                     </Box>
//                   )
//                 })
//               )}
//             </Box>
//           </Collapse>
//         </Box>
//       ))}
//     </Box>
//   )
// }

// export default VerticalButtonList



// import React, { useState } from 'react'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import ExpandLessIcon from '@mui/icons-material/ExpandLess'
// import { Button, Radio, RadioGroup, FormControlLabel, Box, Collapse } from '@mui/material'

// import { fields } from '../../utils/fields'
// import { TField, TFieldGroup } from '../../types-and-interfaces/types'

// // Add `mode` as a prop
// interface VerticalButtonListProps {
//   mode: string
//   setMainLayersIds: (ids: (string | null)[]) => void
// }

// const VerticalButtonList: React.FC<VerticalButtonListProps> = (props) => {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
//   const [selectedValues, setSelectedValues] = useState<Record<TFieldGroup, string | null>>(
//     {} as Record<TFieldGroup, string | null>
//   )

//   const toggleExpand = (index: number) => {
//     setExpandedIndex(expandedIndex === index ? null : index)
//   }

//   const handleRadioChange = (group: TFieldGroup, value: string) => {
//     const newValue = selectedValues[group] === value ? null : value
//     const updatedValues = {
//       ...selectedValues,
//       [group]: newValue,
//     }

//     setSelectedValues(updatedValues)
//     props.setMainLayersIds(Object.values(updatedValues))
//   }

//   const buttons: TFieldGroup[] = Object.keys(fields) as TFieldGroup[]

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, width: 300, backgroundColor: 'white' }}>
//       {buttons.map((group: TFieldGroup, index: number) => (
//         <Box key={index} sx={{ width: '100%' }}>
//           <Button
//             onClick={() => toggleExpand(index)}
//             fullWidth
//             variant="contained"
//             sx={{
//               mb: 1,
//               textAlign: 'left',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               backgroundColor: '#132666',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#45A049',
//               },
//             }}
//           >
//             {group}
//             {expandedIndex === index ? (
//               <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} />
//             ) : (
//               <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
//             )}
//           </Button>

//           <Collapse in={expandedIndex === index} timeout={300}>
//             <Box sx={{ pl: 2, mb: 2 }}>
//               <RadioGroup value={selectedValues[group] ?? ''}>
//                 {fields[group].map((field: TField) => {
//                   if (props.mode === 'single') {
//                     // Render a single radio button per field
//                     return (
//                       <FormControlLabel
//                         key={field.id}
//                         value={field.id}
//                         control={<Radio onClick={() => handleRadioChange(group, field.id)} />}
//                         label={field.name}
//                       />
//                     )
//                   }

//                   // If mode !== 'single', render two side-by-side radio buttons for the same field
//                   return (
//                     <Box
//                       key={field.id}
//                       sx={{ 
//                         display: 'flex', 
//                         flexDirection: 'row', 
//                         alignItems: 'center', 
//                         // gap: 2, 
//                         mb: 1 
//                       }}
//                     >
//                       <FormControlLabel
//                         value={`${field.id}-option1`}
//                         control={<Radio onClick={() => handleRadioChange(group, `${field.id}-option1`)} />}
//                         label=""
//                         sx={{ margin: 0}}
//                       />
//                       <FormControlLabel
//                         value={`${field.id}-option2`}
//                         control={<Radio onClick={() => handleRadioChange(group, `${field.id}-option2`)} />}
//                         label={`${field.name}`}
//                       />
//                     </Box>
//                   )
//                 })}
//               </RadioGroup>
//             </Box>
//           </Collapse>
//         </Box>
//       ))}
//     </Box>
//   )
// }

// export default VerticalButtonList




// import React, { useState } from 'react'
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
// import ExpandLessIcon from '@mui/icons-material/ExpandLess'
// import { Button, Radio, RadioGroup, FormControlLabel, Box, Collapse } from '@mui/material'

// import { fields } from '../../utils/fields'
// import { TField, TFieldGroup } from '../../types-and-interfaces/types'

// const VerticalButtonList: React.FC = (props) => {
//   const [expandedIndex, setExpandedIndex] = useState<number | null>(null)
//   const [selectedValues, setSelectedValues] = useState<Record<TFieldGroup, string | null>>({} as Record<TFieldGroup, string | null>)

//   const toggleExpand = (index: number) => {
//     setExpandedIndex(expandedIndex === index ? null : index)
//   }

//   const handleRadioChange = (group: TFieldGroup, value: string) => {
//     const newValue = selectedValues[group] === value ? null : value
//     const updatedValues = {
//         ...selectedValues,
//         [group]: newValue
//     };

//     props.setMainLayersIds(Object.values(updatedValues))

//     setSelectedValues(updatedValues)

//   }

//   const buttons: TFieldGroup[] = Object.keys(fields) as TFieldGroup[]

//   return (
//     <Box sx={{ display: 'flex', flexDirection: 'column', p: 2, width: 300, backgroundColor: 'white' }}>
//       {buttons.map((group: TFieldGroup, index: number) => (
//         <Box key={index} sx={{ width: '100%' }}>
//           <Button
//             onClick={() => toggleExpand(index)}
//             fullWidth
//             variant="contained"
//             sx={{
//               mb: 1,
//               textAlign: 'left',
//               display: 'flex',
//               justifyContent: 'space-between',
//               alignItems: 'center',
//               backgroundColor: '#132666',
//               color: 'white',
//               '&:hover': {
//                 backgroundColor: '#45A049',
//               },
//             }}
//           >
            
//             {group}

//             {expandedIndex === index ? (
//               <ExpandLessIcon sx={{ transition: 'transform 0.3s ease' }} />
//             ) : (
//               <ExpandMoreIcon sx={{ transition: 'transform 0.3s ease' }} />
//             )}
//           </Button>

//           <Collapse in={expandedIndex === index} timeout={300}>
//             <Box sx={{ pl: 2, mb: 2 }}>
//               <RadioGroup value={selectedValues[group] ?? ''}>
//                 {fields[group].map((field: TField) => (
//                   <FormControlLabel
//                     key={`${group}-${field.id}`}
//                     value={field.id}
//                     control={
//                       <Radio
//                         onClick={() => handleRadioChange(group, field.id)}
//                       />
//                     }
//                     label={field.name}
//                   />
//                 ))}
//               </RadioGroup>
//             </Box>
//           </Collapse>
//         </Box>
//       ))}
//     </Box>
//   )
// }

// export default VerticalButtonList
