const drink = {
  color: 'brown',
  carbonated: true,
  sugar: 40
}

const pepsi: [string, boolean, number] = ['brown', true, 40]

type Drink = [string, boolean, number]
const tea: Drink = ['green', false, 0]