const { status } = require('./status')
const { add } = require('./add')
const { list } = require('./list')
const { drop } = require('./drop')
const { startKong, stopKong } = require('./kong')

module.exports = program => {
  status(program)
  add(program)
  list(program)
  drop(program)
  startKong(program)
  stopKong(program)
}
