
const startDate = new Date('2024-02-01T00:00:00')
const numElements = 267
const dateArray = [];


for (let i = 0; i < numElements; i++) {

  const year = startDate.getFullYear();
  const month = String(startDate.getMonth() + 1).padStart(2, '0')
  const day = String(startDate.getDate()).padStart(2, '0')
  const hours = String(startDate.getHours()).padStart(2, '0')
  const minutes = String(startDate.getMinutes()).padStart(2, '0')
  const seconds = String(startDate.getSeconds()).padStart(2, '0')
  
  const formattedDate = `${year} ${month} ${day} ${hours}:${minutes}:${seconds}`
  dateArray.push(formattedDate)
  
  startDate.setHours(startDate.getHours() + 1)
}

export const datetimes = dateArray
// export const datetimes = Array.from({ length: 267 }, (_, i) => i)
