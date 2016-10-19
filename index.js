'use strict'

const map = require('ramda/src/map')
const merge = require('ramda/src/merge')
const times = require('ramda/src/times')
const prop = require('ramda/src/prop')
const sort = require('ramda/src/sort')
const useWith = require('ramda/src/useWith')
const pipe = require('ramda/src/pipe')
const apply = require('ramda/src/apply')

const Select1 = require('./select1')
const Select2 = require('./select2')

const defaultConfig = {
  optimize: Math.max,
  select1: Select1.bestOf2,
  select2: Select2.bestOf2,
  mutate: x => x,
  crossover: (a, b) => [a, b],

  populationSize: 250,
  crossoverChance: 0.9,
  mutateChance: 0.2,
  fittestAlwaysSurvives: true
}

const chance = (fraction) => Math.random() <= fraction

const comparator = (optimize) => (a, b) =>
  optimize(a, b) === a ? -1 : 1

function Evolutionary (config) {
  const c = merge(defaultConfig, config)

  const calcFitness = (individual) => ({ individual, fitness: c.fitness(individual) })

  const mapFitness = map(calcFitness)

  const getFitness = prop('fitness')
  const getIndividual = prop('individual')

  const sortPop = sort(useWith(comparator(c.optimize), [getFitness, getFitness]))

  const initPop = pipe(() => times(c.seed, c.populationSize), mapFitness, sortPop, map(getIndividual))

  const calcAndOrderPop = pipe(mapFitness, sortPop)

  const maybeMutate = (individual) =>
    c.mutate && chance(c.mutateChance) ? c.mutate(individual) : individual

  // c, pop -> individual
  const selectMaybeMutated = pipe(c.select1, getIndividual, maybeMutate)

  // c, pop -> [individual, individual]
  const selectCrossoverChildren = pipe(c.select2, map(getIndividual), map(maybeMutate), apply(c.crossover))

  return function evolve (pop) {
    if (!pop) pop = initPop()
    pop = mapFitness(pop)

    const newPop = []

    if (c.fittestAlwaysSurvives) newPop.push(pop[0].individual)

    while (newPop.length < c.populationSize) {
      if (c.crossover && chance(c.crossoverChance) && newPop.length + 1 < c.populationSize) {
        newPop.push.apply(newPop, selectCrossoverChildren(c, pop))
      } else {
        newPop.push(selectMaybeMutated(c, pop))
      }
    }

    return map(getIndividual, calcAndOrderPop(newPop))
  }
}

module.exports = Evolutionary
