const { Schema, model, Types } = require('mongoose');
const moment = require('moment');


const ReactionSchema = new Schema({
    reactonId:{
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type:String,
        required: true,
        maxLength: 280,
    },
    username: {
        type:String,
        required: true,
    },
    creatdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('YYYY-MM-DD [at] hh:mm a')
    },

}, 
{
    toJSON:{
         getters: true,
    },
}
);


const ThoughtSchema = new Schema(
  {
    thoughtText: {
         type: String,
         required: true,
         minLength: 1,
         maxLength: 280

    },
    creatdAt: {
        type : Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('YYYY-MM-DD [at] hh:mm a')
        
    },
    username: { 
        type: String, 
        required: true
    },
    reactions: [ReactionSchema],

},
{
    toJSON: {
        virtuals:true,
        getters: true,
    },
    id: false,
}

);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought',ThoughtSchema);

module.exports = Thought;