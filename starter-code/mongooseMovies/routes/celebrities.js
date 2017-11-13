const express = require('express');
const Celebrity = require('../models/celebrity');

const router = express.Router()

router.get('/celebrities', (req, res, next) => {
  Celebrity.find({}, (err, celebrities) => {
    if (err) { return next(err) }

    res.render('celebrities/index', {
      celebrities: celebrities
    });
  });
});

router.get('/celebrities/new', (req, res, next) => {
  res.render('celebrities/new')
})

router.post('/celebrities', (req, res, next) => {
  const celebrityInfo = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  };

  const newCelebrity = new Celebrity(celebrityInfo)
  newCelebrity.save((err) => {
    if (err) {
      return render('celebrities/new', { errors: newCelebrity.errors});
    }
    return res.redirect('/celebrities')
  })
})

router.post('/celebrities/:id/delete', (req, res, next) => {
  let celebrityId = req.params.id

  Celebrity.findByIdAndRemove(celebrityId, (err) => {
    if (err) { return next(err) }

    return res.redirect('/celebrities')
  })
})

router.get('/celebrities/:id', (req, res, next) => {
  let celebrityId = req.params.id

  Celebrity.findById( celebrityId, (err, celebrity) => {
    if (err) { return next(err) }

    res.render('celebrities/show', {
      name: celebrity.name,
      occupation: celebrity.occupation,
      catchPhrase: celebrity.catchPhrase
    });
  });
});

router.get('/celebrities/:id/edit', (req, res, next) => {
  let celebrityId = req.params.id

  Celebrity.findById( celebrityId, (err, celebrity) => {
    if (err) { return next(err) }

    res.render('celebrities/edit', {
      name: celebrity.name,
      occupation: celebrity.occupation,
      catchPhrase: celebrity.catchPhrase,
      id: celebrity.id
    })
  })
})

router.post('/celebrities/:id', (req, res, next) => {
  let celebrityId = req.params.id
  let newValues = {
    name: req.body.name,
    occupation: req.body.occupation,
    catchPhrase: req.body.catchPhrase
  }

  Celebrity.update( { _id: celebrityId }, newValues, (err) => {
    if (err) { return next(err) }
    console.log(newValues)
    return res.redirect('/celebrities')
  })
})

module.exports = router;
