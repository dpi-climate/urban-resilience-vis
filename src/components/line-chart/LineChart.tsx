import React, { useRef } from 'react'
import { LineChart } from '@mui/x-charts/LineChart'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Draggable from 'react-draggable'

interface IMyLineChart {
  visible: boolean
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
}


 const MyLineChart:React.FC<IMyLineChart> = (props) => {
  // const [visible, setVisible] = useState(true)
  const dragRef = useRef<HTMLDivElement>(null!)

  if (!props.visible) {
    return null
  }

  return (
    <Draggable
      nodeRef={dragRef}
      defaultPosition={{ x: 20, y: 20 }}
    >
      <div
        ref={dragRef}
        style={{
          position: 'absolute',
          zIndex: 999,
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'move',
        }}
      >
        <LineChart
          xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
          series={[
            {
              data: [2, 5.5, 2, 8.5, 1.5, 5],
              valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
            },
            {
              data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
            },
            {
              data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
              valueFormatter: (value) => (value == null ? '?' : value.toString()),
            },
          ]}
          height={200}
          width={500}
          margin={{ top: 10, bottom: 20 }}
        />

        <IconButton
          onClick={() => props.setVisible(false)}
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'grey.700',
          }}
          aria-label="Close chart"
        >
          <CloseIcon />
        </IconButton>
      </div>
    </Draggable>
  )
}

export default MyLineChart
