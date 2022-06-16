const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

// Need to handle deprecated warnings.  connect returns a promise so
// need a .then.
// To handle local host connection .connect(process.env.DATABASE_LOCAL)
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('DB connection established'));

//  Nice way to see the connection is made!
// .then((con) => {
//   console.log(con.connections);
//   console.log('DB connection successful!');
// });

// Entry point
// Start Server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`App listening on port ... ${port}`);
});
