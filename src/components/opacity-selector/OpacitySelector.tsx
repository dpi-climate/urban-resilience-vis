import { Box, Typography } from '@mui/material'
import Slider from '@mui/material/Slider'

  interface IOpacitySelector {
    fillOpacity: number
    strokeOpacity: number

    setFillOpacity: React.Dispatch<React.SetStateAction<number>>
    setStrokeOpacity: React.Dispatch<React.SetStateAction<number>>
  }


  const OpacitySelector = (props: IOpacitySelector) => {
    // const [fillOpacity, setFillOpacity] = useState<number>(1)
    // const [strokeOpacity, setStrokeOpacity] = useState<number>(1)
    
    const handleFillChange = (_event: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        props.setFillOpacity(newValue)
      }
    };

    const handleStrokeChange = (_event: Event, newValue: number | number[]) => {
      if (typeof newValue === 'number') {
        props.setStrokeOpacity(newValue)
      }
    };

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
        <Typography variant="h6" sx={{ mb: 1, userSelect: "none" }}>
          Opacity
        </Typography>
        <Box
          sx={{
            pl: 2,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        <Typography sx={{ mb: 1, userSelect: "none" }}>
          Fill Opacity
        </Typography>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={props.fillOpacity}
          onChange={handleFillChange}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        </Box>

        <Box
          sx={{
            pl: 2,
            mb: 2,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
        <Typography sx={{ mb: 1, userSelect: "none" }}>
          Boundary Opacity
        </Typography>
        <Slider
          min={0}
          max={1}
          step={0.1}
          value={props.strokeOpacity}
          onChange={handleStrokeChange}
          aria-label="Small"
          valueLabelDisplay="auto"
        />
        </Box>
      </Box>
    )
  }

export default OpacitySelector