require('../models/connection');
var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const moment = require('moment');
const {checkBody} = require('../modules/checkBody')


/*GET/mycart---------------Récupération de la ville DEPARTURE/ARRIVAL en fonction de la DATE*/

router.get('/mycart', function(req, res) {
  const body = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date
  }

  if (checkBody(body, ['departure', 'arrival', 'date'])) {
    // Formatage de la date du formulaire en objet Date
    const dateBodyChanged = moment(body.date, 'DD/MM/YYYY').toDate();

    // Gestion du problème de l'heure en excluant et en comparant les dates
    const startDate = moment(dateBodyChanged).startOf('day').toDate();
    const endDate = moment(dateBodyChanged).endOf('day').toDate();

    Trip.find({
      departure: { $regex: new RegExp(body.departure, 'i') },
      arrival: { $regex: new RegExp(body.arrival, 'i') }
    })
      .then(data => {
        const filteredTrips = data.filter(trip => {
          
          // Conversion de la date stockée en chaîne en objet Date
          const tripDate = moment(trip.date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').toDate();
          
          return tripDate >= startDate && tripDate <= endDate ;
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
    
  res.json({});
});

/*GET/mybooking---------------Récupération des réservations*/

router.get('/mybooking', function(req,res) {

  res.json({});
});

module.exports = router;
