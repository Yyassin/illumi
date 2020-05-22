const database = require("../../config/database");

exports.createServer = (data) => {
    console.log(data);
    const server = {
        name: data.name,
        description: data.description,
        outline: '',
        thumbnail: ''
    }

    database.db.collection('servers').add(server)
    .then(console.log(`Success! Saved server: ${server.name}`))
    .catch(error => console.log(error.message));
   
    return server;
}
