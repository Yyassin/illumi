const authResolver = require('./auth.resolver')
const msgResolver = require('./messages.resolver')

const rootResolver = {
    ...authResolver,
    ...msgResolver
}

module.exports = rootResolver;