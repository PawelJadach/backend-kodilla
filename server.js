const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');
const mongoose = require('mongoose');

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// Serve static files from the React app
app.use((req, res, next) => {
  req.io = io;
  next();
});
app.use(express.static(path.join(__dirname, '/client/build')));

const testimonialsRoutes = require('./routes/testimonials.routes');
const seatsRoutes = require('./routes/seats.routes');
const concertsRoutes = require('./routes/concerts.routes');

app.use('/api', testimonialsRoutes);
app.use('/api', seatsRoutes);
app.use('/api', concertsRoutes);

// const uri = "mongodb+srv://pawel12345:admin12345@ticket-app-cluster-jtqb0.mongodb.net/test?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true , useUnifiedTopology: true });
// MongoClient.connect(uri, { dbName: 'newWaveDB', useNewUrlParser: true , useUnifiedTopology: true })
//   .then( () => {
//     console.log('Connection to the Atlas Cluster is successful!')
//   })
//   .catch( (err) => console.error(err));

mongoose.connect('mongodb+srv://pawel12345:admin12345@ticket-app-cluster-jtqb0.mongodb.net/test?retryWrites=true&w=majority', { dbName: 'newWaveDB', useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.once('open', () => {
  console.log('Connected to the database');
});
db.on('error', err => console.log('Error ' + err));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.use((req, res) => {
  res.status(404).json({message: 'Not found'});
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
});

const io = socket(server);

io.on('connection', function (socket) {
  console.log('New connect!')
});