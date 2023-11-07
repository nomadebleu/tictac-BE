const moment = require('moment');
const trips = [
    {
      "_id": "65493f8c0d9db9527d79ad80",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-06T23:27:50.010Z",
      "price": 108
    },
    {
      "_id": "65493f8c0d9db9527d79ad86",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T00:02:29.052Z",
      "price": 95
    },
    {
      "_id": "65493f8c0d9db9527d79ad8d",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T01:23:35.372Z",
      "price": 50
    },
    {
      "_id": "65493f8c0d9db9527d79ada8",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T04:24:13.336Z",
      "price": 89
    },
    {
      "_id": "65493f8c0d9db9527d79adaf",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T05:46:24.973Z",
      "price": 87
    },
    {
      "_id": "65493f8c0d9db9527d79adbb",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T07:43:17.837Z",
      "price": 49
    },
    {
      "_id": "65493f8c0d9db9527d79adbd",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T07:44:13.897Z",
      "price": 80
    },
    {
      "_id": "65493f8c0d9db9527d79adc5",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T09:34:05.472Z",
      "price": 84
    },
    {
      "_id": "65493f8c0d9db9527d79adcb",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T09:59:22.865Z",
      "price": 94
    },
    {
      "_id": "65493f8c0d9db9527d79ade7",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T15:28:25.259Z",
      "price": 134
    },
    {
      "_id": "65493f8c0d9db9527d79ade8",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T16:26:14.195Z",
      "price": 81
    },
    {
      "_id": "65493f8c0d9db9527d79adff",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T20:08:28.819Z",
      "price": 59
    },
    {
      "_id": "65493f8c0d9db9527d79ae01",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T20:44:48.032Z",
      "price": 70
    },
    {
      "_id": "65493f8c0d9db9527d79ae04",
      "departure": "Paris",
      "arrival": "Bruxelles",
      "date": "2023-11-07T20:53:51.519Z",
      "price": 25
    }
  ]
  const body = {
    departure: 'Paris',
    arrival: 'Bruxelles',
    date: '07/11/2023'
  }

  if (body.date) {
    // Formatage de la date du formulaire en objet Date
    const dateBodyChanged = moment(body.date, 'DD/MM/YYYY').toDate();
   console.log(dateBodyChanged)
    // Gestion du problème de l'heure en excluant et en comparant les dates
    const startDate = moment(dateBodyChanged).startOf('day').toDate();
    console.log(startDate)
    const endDate = moment(dateBodyChanged).endOf('day').toDate();
    console.log(endDate)

  
      const filteredData = trips.filter(trip => {
        // Conversion de la date stockée en chaîne en objet Date
        const tripDate = moment(trip.date, 'YYYY-MM-DDTHH:mm:ss.SSS[Z]').toDate();
        console.log(tripDate)
         return tripDate >= startDate && tripDate <= endDate});
    console.log(filteredData);
        }