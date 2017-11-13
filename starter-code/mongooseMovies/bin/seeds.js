const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/mongoose-movies-dev');
const Celebrity = require('../models/celebrity');
const Movie = require('../models/movie');
const celebrities = [
  {
    name: 'Berp Dimpster',
    occupation: 'Actor',
    catchPhrase: 'It\'s time to tango'
  },
  {
    name: 'Carl Bolognese',
    occupation: 'Comedian',
    catchPhrase: 'I was named after lunchmeat'
  },
  {
    name: 'Clara Rhinstone',
    occupation: 'Singer',
    catchPhrase: 'My voice real good'
  }
]

const movies = [
  {
    title: "The Pepperoni",
    genre: "Horror",
    plot: "Salted meat gone wrong"
  },
  {
    title: "Bupkiss Meets Dumptruck",
    genre: 'Romance',
    plot: 'An unexpected love between a man and his truck'
  },
  {
    title: "America 2020",
    genre: "Comedy",
    plot: "Clown runs for president. Hilarity ensues"
  }
]

Movie.create(movies, (err, docs) => {
  if (err) {
    throw err;
  }

  docs.forEach((movie) => {
    console.log(movie.title)
  })
  mongoose.connection.close();
})

// Celebrity.create(celebrities, (err, docs) => {
//   if (err) {
//     throw err;
//   }
//
//   docs.forEach((celebrity) => {
//     console.log(celebrity.name)
//   })
//   mongoose.connection.close();
// })
