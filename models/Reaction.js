const { Schema } = require('mongoose');
const Thought = require('./Thought');

const ReactionSchema = new Schema({
    reactonId:{
        type: Schema.Type.ObjectId,
        default: new ObjectId
    },
    reactionBody: {
        type:String,
        required: true,
        maxLength: 280
    },
    username: {
        type:String,
        required: true,
    },
    creatdAt: {
        type: Date,
        default: Date.now,

    }

});

const Reaction = model('Reaction',ReactionSchema);

module.exports = {Reaction, Thought}; 