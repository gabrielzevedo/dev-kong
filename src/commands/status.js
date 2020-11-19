const { getKong } = require('../kong')
const { logObject } = require('../helper')

function checkStatus (options) {
  return getKong('/status')
    .then(stat => {
      if (!options.silent) {
        console.log('Server')
        logObject(stat.server)
        console.log('Database')
        logObject(stat.database)
      }

      return stat
    })
    .catch(() => {
      if (!options.silent) {
        console.log('Failed, check if Kong running first')
      }

      return null
    })
}

module.exports = {
  checkStatus,
  status: program => {
    program
      .command('status')
      .option('--silent', 'No console output')
      .description('Check Kong status')
      .action(checkStatus)
  }
}
