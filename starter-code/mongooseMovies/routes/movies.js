const express = require('express');
const Movie = require('../models/movie');

const router = express.Router()

router.get('/movies', (req, res, next) => {
  Movie.find({}, (err, movies) => {
    if (err) { return next(err) }

    res.render('movies/index', {
      movies: movies
    });
  });
});

router.get('/movies/new', (req, res, next) => {
  res.render('movies/new')
})

router.post('/movies', (req, res, next) => {
  let movieInfo = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot
  }

  const newMovie = new Movie(movieInfo)
  newMovie.save((err) => {
    if (err) {
      return render('movies/new', { errors: newMovie.errors })
    }
    return res.redirect('/movies')
  })

})

router.post('/movies/:id/delete', (req, res, next) => {
  let movieId = req.params.id

  Movie.findByIdAndRemove(movieId, (err) => {
    if (err) { return next(err) }

    return res.redirect('/movies')
  })
})

router.get('/movies/:id/edit', (req, res, next) => {
  let movieId = req.params.id

  Movie.findById(movieId, (err, movie) => {
    if (err) { return next(err) }

    res.render('movies/edit', {
      title: movie.title,
      genre: movie.genre,
      plot: movie.plot
    });
  });
});

router.post('/movies/:id', (req, res, next) => {
  let movieId = req.params.id
  let movieUpdate = {
    title: req.body.title,
    genre: req.body.genre,
    plot: req.body.plot
  }

  Movie.update( { _id: movieId }, movieUpdate, (err) => {
    if (err) { return next(err) }

    return res.redirect('/movies');
  });
});

router.get('/movies/:id', (req, res, next) => {
  let movieId = req.params.id

  Movie.findById(movieId, (err, movie) => {
    if (err) { return next(err) }

    res.render('movies/show', {
      title: movie.title,
      genre: movie.genre,
      plot: movie.plot
    })
  })
})

module.exports = router;
