const mongoose = require('mongoose')
const mongodbConnection = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(() => console.log(`Mongodb Connected on ${mongoose.connection.host}`))
    .catch((error) => console.log(error))
}

module.exports = mongodbConnection