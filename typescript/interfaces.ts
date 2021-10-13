interface Vehicle {
  name: string
  year: number
  broken: boolean
  summary(): string
}

const oldCivic = {
  name: 'civic',
  year: 2000,
  broken: true,
  summary(): string {
    return `Name is ${this.name}`
  },
}


const printVehicle = (vehicle: Vehicle): void => {
  console.log(`Name: ${vehicle.summary()}`)
}

printVehicle(oldCivic)