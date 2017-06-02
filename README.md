# evolutionary [![Build Status](https://travis-ci.org/rahatarmanahmed/evolutionary.svg?branch=master)](https://travis-ci.org/rahatarmanahmed/evolutionary)

[![Greenkeeper badge](https://badges.greenkeeper.io/rahatarmanahmed/evolutionary.svg)](https://greenkeeper.io/)

A (more) functional genetic algorithm library. Designed to make as few assumptions as possible about how you want your genetic algorithm library to run.

**Warning**: I wrote this in a day without tests in a kinda functional style. So it's probably buggy and not as performant as it could be. Use at your own risk.

## Installing
`npm install evolutionary`

## Usage
```js
var Evolutionary = require('evolutionary')
var Select1 = require('evolutionary/select1')
var Select2 = require('evolutionary/select2')

// Initialize it the way you want
var evolve = Evolutionary({
  optimize: Math.max,
  select1: Select1.bestOf2,
  select2: Select2.bestOf2,
  mutate: x => x,
  crossover: (a, b) => [a, b],
  seed: Math.random,
  fitness: (a) => a * 2

  populationSize: 250,
  crossoverChance: 0.9,
  mutateChance: 0.2,
  fittestAlwaysSurvives: true
})

var population = evolve()
var nextPopulation = evolve(population)

// Population is sorted by fitness
var fittest = population[0]

// keep evolving to your heart's content
```

The only required option is `seed` and `fitness`. But this probably isn't going to be useful if you don't define at least `mutate` and `crossover`.

## Options

### `seed` (required)

A function that returns a random individual when called.

### `fitness` (required)

A function that accepts an individual and returns that individual's fitness score.

### `optimize`

A function that accepts two fitness scores, and returns whichever one is the better one. Defaults to `Math.max`.

### `mutate`

A function that accepts an individual, and returns a mutated version of that individual. Defaults to `x => x`, so you should probably change it.

### `crossover`

A function that accepts two parent individuals, and returns an array containing two children individuals created from those parents. Defaults to `(a, b) => [a, b]`, so you should probably change it.

### `select1`

A function that selects a single individual out of a population. See the Selection section below. Defaults to `Select1.bestOf2`.

### `select2`

A function that selects a two individuals out of a population. See the Selection section below. Defaults to `Select2.bestOf2`.

### `populationSize`

How many individuals there should be in the population. Defaults to `250`.

### `crossoverChance`

The chance for a crossover to happen. Defaults to `0.9`.

### `mutationChance`

The chance for a mutation to happen. Defaults to `0.2`.

### `fittestAlwaysSurvives`

Whether or not the fittest individual should always move on to the next generation. Defaults to `true`.

## Selection

There are a number of selection behaviors pre-written if the default isn't what you want.

```js
const Select1 = reqiure('evolutionary/select1')
const Select2 = reqiure('evolutionary/select2')
```

### `Select1.random`

Selects a random individual from the population.

### `Select1.bestOf2`

Picks two random individuals from the population, and selects the fitter one.

### `Select1.bestOf3`

Picks three random individuals from the population, and selects the fittest one.

### `Select1.bestOfN(n)`

Picks `n` random individuals from the population, and selects the fittest one.

### `Select1.fittest`

Selects the fittest individual from the population.

### `Select2.random`

Selects two random individuals from the population.

### `Select2.bestOf2`

Selects two individuals using the `Select1.bestOf2` selection behavior.

### `Select2.bestOf3`

Selects two individuals using the `Select1.bestOf3` selection behavior.

### `Select2.bestOfN(n)`

Selects two individuals using the `Select1.bestOfN(n)` selection behavior.

### `Select2.fittestAndRandom`

Selects the fittest individual and a random individual from the population.

## Generator

This package also includes a convenience function to wrap your genetic algorithm as a generator:

```
const Evolutionary = require('evolutionary')
const makeGenerator = require('evolutionary/generator')

const evolve = Evolutionary({ ... })
const done = (pop) => pop[0] == desiredSolution
const generator = makeGenerator(evolve, done)

generator.next()
generator.next()
generator.next()
generator.next()

// ...

```
