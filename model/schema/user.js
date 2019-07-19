const {Schema} = require('mongoose')
const user = {
    username: String,
    password: String,
    email: String,
    phone: Number,
    create_time: Date,
    mark: Schema.Types.Mixed
}