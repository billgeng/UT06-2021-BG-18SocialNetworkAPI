const { Schema, model } = require('mongoose');

const ThoughtSchema = new Schema({
    thoughtText: {
         type: String,
         required: 'thoughtText is required',
         minLength: 1,
         maxLength: 280

    },
    creatdAt: {
        type : Date,
        default: Date.now,
        
    },
    username: { 
        type: String, 
        required: 'username is required'
    },
    reactions: [{ 
        type: Schema.Types.ObjectId,
        ref: 'Reaction'  
    }]

},
{
    toJSON: {virtuals:true,},
    id: false
}

);

// Create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query.
ThoughtSchema.virtual('reactionCount').get(function(){
    return this.reactions.length;
});

const Thought = model('Thought',ThoughtSchema);

module.exports = Thought;