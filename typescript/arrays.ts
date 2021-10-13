const carMakers: string[] = ['ford', 'toyota', 'chevy']
const dates = [new Date()]

const carsByMake = [
  ['f150'],
  ['corolla'],
  ['camaro']
]

// flexible type
const importantDates: (Date | string)[] = [new Date(), '2030-10-10']
importantDates.push(new Date())