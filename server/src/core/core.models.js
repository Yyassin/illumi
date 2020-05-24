const database = require("../../config/database");

exports.serverModel = (data) => {
    const server = {
        id: '',
        name: data.name,
        description: data.description,
        outline: '',
        thumbnail: '',
    }
   
    return server;
}

exports.memberModel = (data) => {
    const member = {
        id: '',
        user: data.user,
        server: data.server,
        role: data.role,
    }

    return member;
}
