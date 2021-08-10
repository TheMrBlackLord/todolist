const { Schema, model } = require('mongoose')

const schema = new Schema({
   title: {type: String, required: true},
   completed: {type: Boolean, default: false},
   date: {type: Date, default: Date.now},
   owner: {type: Schema.Types.ObjectId, ref: 'User'}
})

module.exports = model('Todo', schema)