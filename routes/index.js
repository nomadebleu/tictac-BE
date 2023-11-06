require('../models/connection');
var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment');


/*GET/mycart---------------Récupération de la ville DEPARTURE/ARRIVAL en fonction de la DATE*/

router.get('/mycart', function(req,res) {
  //mise au format de la DB
  const dateBodyChanged = moment(req.body.date, 'DD/MM/YYYY').format('YYYY-MM-DDTHH:mm:ss.SSS[Z]');

  // gestion du pb de l'heure en excluant et en comparant les dates
  const startDate = moment(dateBodyChanged, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').startOf('day').toDate(); // .startOf('day')positionne le début de la journée
  const endDate = moment(dateBodyChanged, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').endOf('day').toDate(); // .endOf('day')positionne la fin de la journée  
 
  Trip.find({
    departure: {$regex: new RegExp(req.body.departure, 'i')},
    arrival: {$regex: new RegExp(req.body.arrival, 'i')},
    date:{$gte: startDate, $lte: endDate}//>=au début et fin de journée (méthodes mongoDB comme RegExp)
  })
    .then(data => {
      if(data[0]){
        res.json({result: true, trip: data})
      }else {
        res.json({result: false, message: 'No trip found.'})
      }
      
    });
});


/* GET /mybookings */
router.get('/cart', function(req,res) {
  res.json('index', { title: 'Express' });
});


module.exports = router;
