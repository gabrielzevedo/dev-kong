const { deleteKong } = require('../kong')

function dropApi (name) {
  return deleteKong(`/apis/${name}`)
    .then(() => {
      console.log('Deleted')
    })
    .catch(err => {
      if (err.response && err.response.data) {
        console.log(err.response.data.message)
      } else {
        console.log('Failed, check if Kong running first')
      }
    })
}

module.exports = {
  dropApi,
  drop: program => {
    program
      .command('delete <name>')
      .description('Deletes API')
      .action(dropApi)
  }
}
