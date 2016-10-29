'use strict'

const S1 = require('./select1')

const bestOf2 = S1.bestOfN(2)
const bestOf3 = S1.bestOfN(3)

module.exports = {
  random: (c, arr) => [S1.random(c, arr), S1.random(c, arr)],
  bestOf2: (c, arr) => [bestOf2(c, arr), bestOf2(c, arr)],
  bestOf3: (c, arr) => [bestOf3(c, arr), bestOf3(c, arr)],
  bestOfN: (n) => {
    const bestOf = S1.bestOfN(n)
    return (c, arr) => [bestOf(c, arr), bestOf(c, arr)]
  },
  fittestAndRandom: (c, arr) => [arr[0], S1.random(c, arr)]
}
