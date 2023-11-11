require('../models/connection');
var express = require('express');
var router = express.Router();
const Trip = require('../models/trips');
const Cart = require('../models/carts');
const Booking = require('../models/bookings');
const moment = require('moment-timezone');
const {checkBody} = require('../modules/checkBody')


/*POST/mycart - En lien avec la collection TRIPS pour avoir les trajets*/

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

/*POST/mycartBook - En lien avec la collection CARTS pour stocker les paniers.
Attention dans le DOM au format de time récupéré, il faut qu'il soit au format suivant
 sinon la route ne fonctionne pas:
 {
      "_id": "654ded4dacf24b3bf0c744b3",
      "departure": "paris",
      "arrival": "bruxelles",
      "time": "2023-11-10T12:30:00.000Z", <----------------- comme ceci
      "price": 50,
      "__v": 0
    }
    */

router.post('/mycartBook', function(req, res) {
  const body = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    time: req.body.time,
    price: req.body.price
  };

  if (checkBody(body, ['departure', 'arrival', 'time', 'price'])) {
    const newCart = new Cart(body);

    newCart.save().then(() => {
      Cart.find({}).then(carts => {
        res.json({ result: true, carts });
      })
    })
  } else {
    res.json({ result: false, error: 'Erreur au niveau du body' });
  }

});

/*GET/mycartBook - En lien avec la collection CARTS pour afficher tous les CARTS*/

router.get('/mycartBook', function(req, res) {
  Cart.find({})
    .then(allCarts => {
      res.json({result:true, allCarts})
    })
})

/*POST/mybookings - En lien avec la collection BOOKINGS pour stocker les paniers booking.
Attention également pour la durée qui doit être aussis dans le même format que time*/

router.post('/mybookings', function(req, res) {
  const body = {
    departure: req.body.departure,
    arrival: req.body.arrival,
    time: req.body.time,
    price: req.body.price,
    duree: req.body.duree
  };
    
  if (checkBody(body, ['departure', 'arrival', 'time', 'price', 'duree'])) {
    const newBookings = new Booking(body);
    
    newBookings.save().then(() => {
      Booking.find({}).then(bookings => {
        res.json({ result: true, bookings });
        })
    })
  } else {
        res.json({ result: false, error: 'Erreur au niveau du body' });
  }
    
});
    
/*GET/mybookings - En lien avec la collection BOOKINGS pour afficher tous les BOOKINGS*/
    
router.get('/mybookings', function(req, res) {
  Booking.find({})
    .then(allBookings => {
      res.json({result:true, allBookings})
    })
})
    
/*DELETE/mycartBook en lien avec la collection CARTS pour supprimer un trajet*/

router.delete('/mycartBook/:id', function(req,res) {
    Cart.deleteOne({_id:req.params.id})
      .then(deletedCart => {
        if(deletedCart.deletedCount > 0){
            res.json({result:true, message:'Cart deleted'});
        } else {
            res.json({result:false, message: 'Pb DELETE' })
        }
      });
});

/*DELETE/mycartBook en lien avec la collection CARTS pour supprimer TOUS les trajets*/

router.delete('/mycartBook', function(req,res) {
  Cart.deleteMany()
    .then(deletedCart => {
        Cart.find().then(data =>{
          res.json({result:true, message:'All is deleted'});
        });
      }); 
    });

module.exports = router;
