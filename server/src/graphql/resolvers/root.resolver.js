const authResolver = require('./auth.resolver')

const rootResolver = {
    ...authResolver
}

module.exports = rootResolver;