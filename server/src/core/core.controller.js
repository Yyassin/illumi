const database = require("../../config/database")
const models = require("./core.models")

exports.createServer = (req, res) => {
    const serverData = models.serverModel(req.body)
    addObject(res,'servers', serverData)
}

exports.getServers = (req, res) => {
    getObjects(res, 'servers')
}

// Firebase database functions

function addObject(res, collection, obj) {
    // saves obj to corresponding firestore collection
    // ex. addObject('servers', serverObj)
    const newObjRef = database.db.collection(collection).doc();

    obj.id = newObjRef.id;

    const setObj = newObjRef.set(obj)
        .then(() => {
            console.log(`Saved ${collection} entry: ${obj.id}`)
            res.status(200).json({'message': `Saved ${collection} entry.`, 'obj': obj});
        })
        .catch(error => console.log(error.message));
}

function getObjects(res, collection) {
    // returns list of all entries from collection
    // ex. getObjects(res, 'servers')

    const results = [];
    database.db.collection(collection).get()
        .then(data => {
            data.forEach(entry => {
                results.push(entry.data());
            })

            res.status(200).json(results);
        })
        .catch(error => {
            console.log(error.message)
            res.status(500).json({msg: "Internal Server Error"})
        })
}