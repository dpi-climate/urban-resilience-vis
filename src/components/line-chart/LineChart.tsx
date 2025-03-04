import "./LineChart.css"
import React, { useEffect, useRef, useState } from 'react'

import { LineChart } from '@mui/x-charts/LineChart'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import Draggable from 'react-draggable'
// import Papa from 'papaparse'

import { datetimes } from '../../utils/datetimes'

interface IMyLineChart {
  data: any
  visible: boolean
  timeStamp: number
  setVisible: React.Dispatch<React.SetStateAction<boolean>>
  setSelectedFeature: React.Dispatch<React.SetStateAction<string | null>>
  
}

const MyLineChart: React.FC<IMyLineChart> = (props) => {
  const dragRef = useRef<HTMLDivElement>(null!)
  const [xData, setXData] = useState<string[]>([])
  const [yData, setYData] = useState<number[]>([])

  useEffect(() => {
    if(Object.keys(props.data).length > 0) {
      setXData(Object.keys(props.data))
      setYData(Object.values(props.data))
      
    } else {
      setXData([])
      setYData([])
      props.setVisible(false)
      props.setSelectedFeature(null)
    }

  },[props.data])

  if (!props.visible) {
    return null
  }

  return (
    <Draggable nodeRef={dragRef} defaultPosition={{ x: 20, y: 20 }}>
      <div
        ref={dragRef}
        style={{
          position: 'absolute',
          zIndex: 999,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'move',
        }}
      >
        <LineChart
          xAxis={[
            { data: xData, 
              valueFormatter: (d) => `Date: ${datetimes[d]}`
            }
          ]}
          series={[
            {
              data: yData,
              showMark: ({ index }) => index === props.timeStamp,
              valueFormatter: (value) =>
                value == null ? 'NaN' : value.toString(),
            },
          ]}
          height={200}
          width={500}
          margin={{ top: 10, bottom: 20 }}
        />

        <IconButton
          onClick={() => {props.setVisible(false); props.setSelectedFeature(null)}}
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