const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3008;



app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(require('./routes'));

mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/Social-Network',{
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

mongose.set('useCreateIndex',true);
mongose.set('debug',true);


app.listen(PORT,() => {
    console.log(`App running on port: ${PORT}`);
});