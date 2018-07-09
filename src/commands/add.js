const { postKong } = require('../kong')
const { logObject } = require('../helper')

function addKongApi (name, hosts, upstream, uris, options) {
  const data = {
    name,
    hosts,
    upstream_url: upstream,
    preserve_host: false,
    strip_uri: options.strip
  }

  if (uris) {
    data.uris = uris.split(',').map(x => x.trim())
  }

  return postKong('/apis', data)
    .then(api => {
      logObject(api)
    })
    .catch(err => {
      if (err.response && err.response.data) {
        const error = Object.keys(err.response.data)
          .map(key => `${key} ${err.response.data[key]}`)
          .join('\n')

        console.log(error)
      } else {
        console.log('Failed, check if Kong running first')
      }
    })
}

module.exports = {
  addKongApi,
  add: program => {
    program
      .command('add <name> <hosts> <upstream> [uris]')
      .option('-s, --strip', 'Strip uri')
      .description('Adds API')
      .action(addKongApi)
  }
}
