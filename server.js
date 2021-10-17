const express = require('express');
const dbConnection = require('./config/connection') ;

const app = express();
const PORT = process.env.PORT || 3001;



app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use(require('./routes'));


dbConnection.once('open',()=>{app.listen(PORT,() => {
      console.log(`App running on port: ${PORT}`);
     });
    });
