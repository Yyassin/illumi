/*
class Server {
    constructor(name, description, outline, thumbnail) {
        this.name = name;
        this.description = description;
        this.outline = outline;
        this.thumbnail = thumbnail;
    }

    toString() {
        return this.name;
    }
}

serverConverter = {
    toFirestore: function(server) {
        return {
            name: server.name,
            description: server.description,
            outline: server.outline,
            thumbnail: server.thumbnail,
        }
    },
    fromFirestore: function(snapshot, options) {
        const data = snapshot.data(options);
        return new Server(data.name, data.description, data.outline, data.thumbnail);
    }
}*/

const createServer = (name, description) => {

}

module.exports = createServer();