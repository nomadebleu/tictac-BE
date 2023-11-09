require('../models/connection');
var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const Cart = require('../models/carts');
const Booking = require('../models/bookings');
const moment = require('moment-timezone');
const {checkBody} = require('../modules/checkBody')


/*POST/mycart-Récupération de la ville DEPARTURE/ARRIVAL en fonction de la DATE*/

router.post('/mycart', function(req, res) {
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
        const filteredTrips = data.filter(trip => new RegExp(body.date).test(trip.date.toISOString()));
        //On filtre en fonction du regex qui est mis au format

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

/*POST/mycartBook----Récupération des mes trajets électionnés ds mycart*/

router.post('/mycartBook', function(req, res) {
  const body = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    date: req.body.date,
    time: req.body.time,
    price: req.body.price
  }
  if (checkBody(body, ['departure', 'arrival', 'date','time','price'])) {

    Cart.find({})
      .then(cartBooked => {
        if (cartBooked.length > 0) {
          res.json({ result: true, carts: cartBooked });
        } else {
          res.json({ result: false, message: 'No trips booked' });
        }
      });
  } else {
    res.json({ result: false, message: 'Pb' });
  }
});
/*GET/mycartBook--------pour afficher les données de la db cart et créer le html ds FE*/
router.get('/mycartBook', function(req, res) {
  Cart.find({})
    .then(date => {
      console.log(data)
    })
})


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
