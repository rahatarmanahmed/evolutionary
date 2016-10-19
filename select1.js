'use strict'

const R = require('ramda')

const randInt = (max) => Math.floor(Math.random() * max)

const randElement = (arr) => arr[randInt(arr.length)]

const randElements = (n, arr) => R.times(randElement.bind(null, arr), n)

const optimal = (optimize, arr) => R.reduce(optimize, R.head(arr), R.tail(arr))

const optimizeFromConfig = (c) => (a, b) =>
  c.optimize(a.fitness, b.fitness) === a.fitness ? a : b

const bestOf = (n) => (c, pop) => optimal(optimizeFromConfig(c), randElements(n, pop))

module.exports = {
  random: (c, arr) => randElement(arr),
  bestOf2: bestOf(2),
  bestOf3: bestOf(2),
  bestOfN: bestOf,
  fittest: (c, arr) => arr[0]
  // tournamen
}
