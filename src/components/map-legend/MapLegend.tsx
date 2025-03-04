
import { Box, Typography } from '@mui/material'
import ColorBar from '../color-bar/ColorBar'
import { colors } from '../../utils/colors'
import { domains } from '../../utils/domains'
import { findFieldById } from '../../utils/support'

// const vars = ["no2", "o3"]

interface IMapLegend {
  mainLayersIds: string[]
  secondLayersIds: string[]
}

interface MergedID {
  id: string;
  inMain: boolean;
  inSecond: boolean;
}

const MapLegend = (props:IMapLegend) => {
  const mergedMap: Record<string, MergedID> = {}

  const mergeIds = () => {
    props.mainLayersIds.forEach((id: string) => {
      if (!mergedMap[id]) {
        mergedMap[id] = { id, inMain: true, inSecond: false }
      } else {
        mergedMap[id].inMain = true
      }
    })

    props.secondLayersIds.forEach(id => {
      if (!mergedMap[id]) {
        mergedMap[id] = { id, inMain: false, inSecond: true }
      
      } else {
        mergedMap[id].inSecond = true
      }
    })

    return Object.values(mergedMap)
  }

  const merdedArr = mergeIds()

  return(
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
        Layers Legend
      </Typography>
      <Box sx={{ width: '100%' }}>
        {merdedArr.map((obj: MergedID, index: number) => {
          const field = findFieldById(obj.id)

          if(field?.layerType === "windLayer") {
            return null
          
          } else {
            let label = field?.name
            
            if(props.secondLayersIds.length > 0) {
              
              const side = obj.inMain
                ? obj.inSecond
                  ? "- left/right"
                  : "- left"
                : obj.inSecond
                  ? "- right"
                  : ""
              
              label = `${field?.name} ${side}`
            }
  
            return (
              <ColorBar
                key={`color-bar-${index}`}
                colorScheme={colors[obj.id]}
                legId={`color-bar-${index}`}
                domain={domains[obj.id]}
                label={label}
              />
            )
          }
        })}
      </Box>
    </Box>
  )
}

export default MapLegend