const express = require('express');
const cors = require('cors');
const path = require('path');
const socket = require('socket.io');

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

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});


app.use((req, res) => {
  res.status(404).json({message: 'Not found'});
})

const server = app.listen(process.env.PORT || 8000, () => {
  console.log('Server is running on port: 8000');
  console.log(app.settings)
});

const io = socket(server);

io.on('connection', (socket) => {
  console.log('New Connect');
});


