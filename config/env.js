let env = {
  'process.env': {
    NODE_ENV: JSON.stringify(process.env.NODE_ENV)
  }
}

module.exports = env