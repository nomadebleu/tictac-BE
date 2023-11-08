require('../models/connection');
var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment-timezone');
const {checkBody} = require('../modules/checkBody')


/*GET/mycart---------------Récupération de la ville DEPARTURE/ARRIVAL en fonction de la DATE*/

router.get('/mycart', function(req, res) {
  const body = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date
  }

  if (checkBody(body, ['departure', 'arrival', 'date'])) {
    
  

    Trip.find({
      departure: { $regex: new RegExp(body.departure, 'i') },
      arrival: { $regex: new RegExp(body.arrival, 'i') },
    })
      .then(data => {
        const filteredTrips = data.filter(trip => {          
          return new RegExp(body.date).test(trip.date.toISOString());
        });

        if (filteredTrips.length > 0) {
          res.json({ result: true, trip: filteredTrips });
        } else {
          res.json({ result: false, message: 'No trip found.' });
        }
      });
  } else {
    res.json({ result: false, message: 'No tickets in your cart. Why not plan a trip?' });
  }
});


/*DELETE/mycart---------------Supprime un TRAJET dans mycart*/

router.delete('/mycart', function(req,res) {
    Trip.deleteOne()
  res.json({});
});

/*GET/mybooking---------------Récupération des réservations*/

router.get('/mybooking', function(req,res) {

  res.json({});
});

module.exports = router;
