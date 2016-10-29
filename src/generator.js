module.exports = function* (evolve, done) {
  done = done || (_ => {})
  var pop = evolve()
  yield pop
  while (!done(pop)) {
    pop = evolve(pop)
    yield pop
  }
}
