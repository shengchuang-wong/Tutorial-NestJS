class Vehicle {
  constructor(public color: string) {}

  public drive(): void {
    console.log('chugga chugga')
  }
}

const vehicle = new Vehicle('red')
vehicle.drive()

class Lorry extends Vehicle {

  constructor(color: string) {
    super(color)
  }

  drive(): void {
    console.log('vroom vroom')
  }

  private speedDrive(): void {
    console.log('vroom vroom vroom')
  }

  startDriving(): void {
    this.speedDrive()
  }
}

const lorry = new Lorry('yellow')
lorry.drive()
lorry.startDriving()
console.log(lorry.color)