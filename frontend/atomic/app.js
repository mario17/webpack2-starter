/*
    Define Box type
    linear-data-flow-with-container-style-types-box
*/

const Box = x => 
({
    map: f => Box(f(x)),
    inspect: () => `Box(${x})`,
    fold: f => f(x)
})

const makeMultipleFunction = str =>
    Box(str)
    .map(s => parseInt(s))
    .fold(n => n*2)

/*const result = makeMultipleFunction('64')
console.log(result); */

/*
    Refactor imperactive code to a single composed using box
*/
/*const moneyToFloat = str =>
  parseFloat(str.replace(/\$/g, ''))
*/
/*const percentToFloat = str => {
  const replaced = str.replace(/\%/g, '')
  const number = parseFloat(replaced)
  return number * 0.01
}*/

/*const applyDiscount = (price, discount) => {
  const cost = moneyToFloat(price)
  const savings = percentToFloat(discount)
  return cost - cost * savings
}*/

//Refactoring

const moneyToFloat = str =>
    Box(str)
    .map(s => s.replace(/\$/g, ''))
    .map(r => parseFloat(r))

const percentToFloat = str => 
    Box(str.replace(/\%/g, ''))
    .map(replaced => parseFloat(replaced))
    .map(number => number * 0.01)

const applyDiscount = (price, discount) =>
    Box(moneyToFloat(price))
    .fold(cost =>
        percentToFloat(discount)
        .fold(savings => cost - (cost * savings)))


const result = applyDiscount('$5.00','20%')
console.log(result); 

//Two assigments two fold