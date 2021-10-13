// annotations eg
let apples: number = 5;
// type inference is preferred
let apple = 5; // detected as number
let speed: string = 'fast';
let hasName: boolean = true;

let nothingMuch: null = null;
let nothing: undefined = undefined;

// built in objects
let now: Date = new Date();

// Array
let colors: string[] = ['red', 'green', 'blue']
let myNumbers: number[] = [1,2,3]
let truths: boolean[] = [true, true, false]

// Classses
class Car {
  wheel: number
}
let car: Car = new Car()
car.wheel = 4

// Object literal
let point: { x: number; y: number } = {
  x: 10,
  y: 20
}

// Function
// (i: number) - input param
// void - return type
const logNumber: (i: number) => void = (i: number) => {
  console.log(i)
}

// When to use annotations
// 1) Function that return the 'any' type
const json = '{"x":10, "y":20}'
const coordinates: {x: number; y: number} = JSON.parse(json)
console.log(coordinates)

// 2)When we declar a variale on one ine and initializate it later
let words = ['red', 'green', 'blue']
let foundWord: boolean; // of course we can foundWord = false in the first place
for (let i = 0; i < words.length; i++) {
  if (words[i] === 'green')
    foundWord = true
}

// 3) Variable whose type cannot be inferred correctly
let numbers = [-10, -1, 12]
let numberAboveZero: boolean | number = false

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] > 0) {
    numberAboveZero = numbers[i]
  }
}