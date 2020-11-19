const { deleteKong } = require('../kong')

function dropApi (name, options) {
  return deleteKong(`/apis/${name}`)
    .then(() => {
      if (!options.silent) {
        console.log('Deleted')
      }

      return true
    })
    .catch(err => {
      if (!options.silent) {
        if (err.response && err.response.data) {
          console.log(err.response.data.message)
        } else {
          console.log('Failed, check if Kong running first')
        }
      }

      return false
    })
}

module.exports = {
  dropApi,
  drop: program => {
    program
      .command('delete <name>')
      .option('--silent', 'No console output')
      .description('Deletes API')
      .action(dropApi)
  }
}
