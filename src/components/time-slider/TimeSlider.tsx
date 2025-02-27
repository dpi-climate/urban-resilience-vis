import { Box } from "@mui/material"
import Slider from '@mui/material/Slider'



const MapSlider: React.FC<{value: number, onChange: any}> = (props) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    if (typeof newValue === 'number') {
      props.onChange(newValue)
    }
  }

  return (
    <Box
      id="my-slider"
      sx={{
        userSelect: 'none',
        width: '60vw',
        maxWidth: 'calc(100vw - 40px)',
        position: 'absolute',
        bottom: 30,
        left: '50%',
        transform: 'translateX(-50%)',
        overflow: 'hidden',
        zIndex: 9999,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        borderRadius: 3,
        padding: 2,
        marginLeft: '20px',
        marginRight: '20px',
        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
      }}
    >
      <Box
        sx={{
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          display: 'block',
          textAlign: 'center',
          fontWeight: 'bold',
          marginBottom: 1,
          color: "#132666"
        }}
      >
        Date and Time
      </Box>
      <Slider
        min={0}
        max={70}
        step={1}
        value={props.value}
        aria-label="Small"
        valueLabelDisplay="auto"
        // onChangeCommitted={handleChange}
        onChange={handleChange}
        // sx={{
        //   width: '100%',
        //   boxSizing: 'border-box',
        // }}
        sx={{
          color: '#4caf50',
          '& .MuiSlider-thumb': {
            backgroundColor: '#ff9800',
            border: '2px solid #fff',
          },
          '& .MuiSlider-rail': {
            color: '#cfd8dc',
          },
          '& .MuiSlider-track': {
            color: '#4caf50',
          },
          '& .MuiSlider-valueLabel': {
            backgroundColor: '#4caf50',
            color: '#fff',
          },
        }}
      />
    </Box>
  )
}

export default MapSlider
