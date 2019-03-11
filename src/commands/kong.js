const { dump } = require('node-yaml')
const tmp = require('tmp')
const fs = require('fs')
const Promise = require('bluebird')
const spawn = require('child_process').spawn

const tmpFile = Promise.promisify(tmp.file)
const writeFile = Promise.promisify(fs.writeFile)

const createTempDockerComposeFile = () => {
  return tmpFile({ postfix: '.yml' })
    .then(path => {
      return writeFile(path, dump(dockerComposeConfig))
        .then(() => path)
    })
}

function execCommand (command, options) {
  return new Promise((resolve, reject) => {
    try {
      const cmd = spawn(command, options)
      resolve(cmd)
    } catch (e) {
      reject(e)
    }
  })
}

function dockerComposeUp (file) {
  return new Promise((resolve, reject) => {
    const arg = ['-f', file, 'up', '-d']

    execCommand('docker-compose', arg)
      .then(child => {
        child.stdout.on('data', toConsole)
        child.stderr.on('data', toConsole)
        child.on('close', code => {
          if (!code) {
            return resolve(code)
          }

          return reject(code)
        })
      })
  })
}

const toConsole = data => { console.log(data.toString()) }

function dockerComposeDown (file) {
  return new Promise((resolve, reject) => {
    const arg = ['-f', file, 'down']

    execCommand('docker-compose', arg)
      .then(child => {
        child.stdout.on('data', toConsole)
        child.stderr.on('data', toConsole)
        child.on('close', code => {
          if (!code) {
            return resolve(code)
          }

          return reject(code)
        })
      })
  })
}

const dockerComposeConfig = {
  version: '3',
  services: {
    'kong-database': {
      image: 'postgres:9.4',
      environment: [
        'POSTGRES_USER=kong',
        'POSTGRES_DB=kong'
      ]
    },
    kong: {
      image: 'kong:0.10.3',
      restart: 'always',
      links: [
        'kong-database'
      ],
      ports: [
        '80:8000',
        '8443:8443',
        '8001:8001',
        '7946:7946'
      ],
      environment: [
        'KONG_DATABASE=postgres',
        'KONG_PG_HOST=kong-database'
      ]
    }
  }
}

function startKongServer () {
  console.log('Starting Kong')

  return createTempDockerComposeFile()
    .then(path => dockerComposeUp(path))
}

function stopKongServer () {
  console.log('Stoping Kong')

  return createTempDockerComposeFile()
    .then(path => dockerComposeDown(path))
}

module.exports = {
  startKong: program => {
    program
      .command('start')
      .description('Start local Kong server')
      .action(startKongServer)
  },
  stopKong: program => {
    program
      .command('stop')
      .description('Stop local Kong server')
      .action(stopKongServer)
  }
}
