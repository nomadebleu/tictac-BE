const mongoose = require('mongoose');

const connectionString ='mongodb+srv://anthonyiezzi64:nomadebleu@cluster0.fnubh5t.mongodb.net/tictac';

mongoose.connect(connectionString,{connectTimeoutMS:2000})
    .then(() => console.log('DataTrips is connected'))
    .catch(error => console.error(error));

