
///////////////////////////////////////////////////////
// Option 1 Ex: 2024 09 03 03:00 PM UTC

// const startDate = new Date('2024-09-01T12:00:00')
// const numElements = 267
// const dateArray = []


// for (let i = 0; i < numElements; i++) {

//   const year = startDate.getFullYear()
//   const month = String(startDate.getMonth() + 1).padStart(2, '0')
//   const day = String(startDate.getDate()).padStart(2, '0')


//   let hours = startDate.getHours()
//   const minutes = String(startDate.getMinutes()).padStart(2, '0')
//   const ampm = hours >= 12 ? 'PM' : 'AM'

//   hours = hours % 12;
//   hours = hours ? hours : 12
//   const paddedHours = String(hours).padStart(2, '0')
  
//   const formattedDate = `${year} ${month} ${day} ${paddedHours}:${minutes} ${ampm} UTC`
//   dateArray.push(formattedDate)
  
//   startDate.setHours(startDate.getHours() + 1)
// }

// export const datetimes = dateArray




///////////////////////////////////////////////////////
// Option 2 Ex: 2024 09 03 03:00:00 UTC

// const startDate = new Date('2024-09-01T12:00:00')
// const numElements = 267
// const dateArray = [];


// for (let i = 0; i < numElements; i++) {

//   const year = startDate.getFullYear();
//   const month = String(startDate.getMonth() + 1).padStart(2, '0')
//   const day = String(startDate.getDate()).padStart(2, '0')
//   const hours = String(startDate.getHours()).padStart(2, '0')
//   const minutes = String(startDate.getMinutes()).padStart(2, '0')
//   const seconds = String(startDate.getSeconds()).padStart(2, '0')
  
//   const formattedDate = `${year} ${month} ${day} ${hours}:${minutes}:${seconds} UTC`
//   dateArray.push(formattedDate)
  
//   startDate.setHours(startDate.getHours() + 1)
// }

// export const datetimes = dateArray




///////////////////////////////////////////////////////

// Option 3 Ex: Sep 03 2024 03:00 PM CDT

// const startDate = new Date('2024-09-01T12:00:00')
const startDate = new Date('2024-09-01T07:00:00')
const numElements = 267
const dateArray = []

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]


for (let i = 0; i < numElements; i++) {

  const month = monthNames[startDate.getMonth()]
  const day = String(startDate.getDate()).padStart(2, '0')
  const year = startDate.getFullYear()


  let hours = startDate.getHours()
  const minutes = String(startDate.getMinutes()).padStart(2, '0')
  const ampm = hours >= 12 ? 'PM' : 'AM'

  hours = hours % 12;
  hours = hours ? hours : 12
  const paddedHours = String(hours).padStart(2, '0')
  
  const formattedDate = `${month} ${day} ${year} ${paddedHours}:${minutes} ${ampm} CDT`
  dateArray.push(formattedDate)
  
  startDate.setHours(startDate.getHours() + 1)
}

export const datetimes = dateArray
