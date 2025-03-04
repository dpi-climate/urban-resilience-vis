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
    }

  },[props.data])
  
  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await fetch(`./src/assets/pt_t2.csv`)
  //       if (response.ok) {
  //         const csvText = await response.text()
  //         const { data } = Papa.parse(csvText, {
  //           header: true,
  //           skipEmptyLines: true,
  //         })

  //         if (data.length > 0) {
  //           // Cast firstRow to a known object type.
  //           const firstRow = data[0] as Record<string, any>

  //           // Filter out keys that are "latitude" or "longitude" (case-insensitive)
  //           const keys = Object.keys(firstRow).filter((key) => {
  //             const lowerKey = key.toLowerCase()
  //             return lowerKey !== 'latitude' && lowerKey !== 'longitude'
  //           })

  //           // xData will be the column names (or you could use indices)
  //           const extractedXData = keys
  //           // yData will be the corresponding numeric values
  //           const extractedYData = keys.map((key) => Number(firstRow[key]))

  //           setXData(extractedXData)
  //           setYData(extractedYData)
  //         }
  //       } else {
  //         console.error('Failed to fetch file:', response.statusText)
  //       }
  //     } catch (error) {
  //       console.error(`Error fetching file:`, error)
  //     }
  //   }

  //   fetchData()
  // }, [props.visible])

  if (!props.visible) {
    return null
  }

  return (
    <Draggable nodeRef={dragRef} defaultPosition={{ x: 20, y: 20 }}>
      <div
        ref={dragRef}
        style={{
          position: 'absolute',
          zIndex: 9999,
          backgroundColor: 'white',
          padding: '16px',
          borderRadius: '8px',
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
          cursor: 'move',
        }}
      >
        <LineChart
          xAxis={[{ data: xData }]}
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





// import React, { useRef } from 'react'
// import { LineChart } from '@mui/x-charts/LineChart'
// import IconButton from '@mui/material/IconButton'
// import CloseIcon from '@mui/icons-material/Close'
// import Draggable from 'react-draggable'

// interface IMyLineChart {
//   visible: boolean
//   setVisible: React.Dispatch<React.SetStateAction<boolean>>
// }


//  const MyLineChart:React.FC<IMyLineChart> = (props) => {
//   // const [visible, setVisible] = useState(true)
//   const dragRef = useRef<HTMLDivElement>(null!)

//   if (!props.visible) {
//     return null
//   }

//   return (
//     <Draggable
//       nodeRef={dragRef}
//       defaultPosition={{ x: 20, y: 20 }}
//     >
//       <div
//         ref={dragRef}
//         style={{
//           position: 'absolute',
//           zIndex: 999,
//           backgroundColor: 'white',
//           padding: '16px',
//           borderRadius: '8px',
//           boxShadow: '0 2px 10px rgba(0, 0, 0, 0.2)',
//           cursor: 'move',
//         }}
//       >
//         <LineChart
//           xAxis={[{ data: [1, 2, 3, 5, 8, 10, 12, 15, 16] }]}
//           series={[
//             {
//               data: [2, 5.5, 2, 8.5, 1.5, 5],
//               valueFormatter: (value) => (value == null ? 'NaN' : value.toString()),
//             },
//             {
//               data: [null, null, null, null, 5.5, 2, 8.5, 1.5, 5],
//             },
//             {
//               data: [7, 8, 5, 4, null, null, 2, 5.5, 1],
//               valueFormatter: (value) => (value == null ? '?' : value.toString()),
//             },
//           ]}
//           height={200}
//           width={500}
//           margin={{ top: 10, bottom: 20 }}
//         />

//         <IconButton
//           onClick={() => props.setVisible(false)}
//           size="small"
//           sx={{
//             position: 'absolute',
//             top: 8,
//             right: 8,
//             color: 'grey.700',
//           }}
//           aria-label="Close chart"
//         >
//           <CloseIcon />
//         </IconButton>
//       </div>
//     </Draggable>
//   )
// }

// export default MyLineChart
