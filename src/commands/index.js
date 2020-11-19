const { status, checkStatus } = require('./status')
const { add, addKongApi } = require('./add')
const { list, listApis } = require('./list')
const { drop, dropApi } = require('./drop')
const { startKong, stopKong, startKongServer, stopKongServer } = require('./kong')

module.exports = {
  commands: program => {
    status(program)
    add(program)
    list(program)
    drop(program)
    startKong(program)
    stopKong(program)
  },
  checkStatus,
  addKongApi,
  listApis,
  dropApi,
  startKongServer,
  stopKongServer
}
