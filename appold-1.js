const fs = require('fs');

const express = require('express');

const app = express();

// MiddleWare - data from the body can be added. req.body is available
//  with this
app.use(express.json());

// Testing server code
// app.get('/', (req, res) =>{
//res.status(200).send('Hello from the server side');
//     res.status(200).json({message: 'Hello from the server side', app: 'Natours'});
// });

// app.post('/', (req, res) => {
//     res.send('You can post to this endpoint');
// })

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

// you don't have to do tours: tours in ES6 can specify just tours.
// The json returned shows status and the envelop of data around tours.
// The result is a nice to have for arrays.
app.get('/api/v1/tours', (req, res) => {
  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

// Lets get the route with an :id
app.get('/api/v1/tours/:id', (req, res) => {
  const id = req.params.id * 1; // convert to a number

  // Get the id matching the id in the tours array.
  const tour = tours.find((el) => el.id === id);

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    results: tours.length,
    data: {
      tour: tour,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  // console.log(req.body);   this is the data!

  // lets pretend and create a tour like it was in an database and add the id to
  // it.
  const newId = tours[tours.length - 1].id + 1;
  const newTour = Object.assign({ id: newId }, req.body);

  // add the newTour the tours array.
  tours.push(newTour);

  // We have to convert tours to JSON.
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      });
    }
  );
});

app.patch('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour: 'Updated tour here..',
    },
  });
});

// This is the correct response.
app.delete('/api/v1/tours/:id', (req, res) => {
  if (req.params.id * 1 > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'Invalid ID',
    });
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`App listening on port ... ${port}`);
});
