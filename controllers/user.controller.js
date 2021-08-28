const express = require('express');
const { validate, Joi } = require('express-validation');
const { model } = require('mongoose');
const validateRequest = require('../middleware/validate');

const router = express.Router();
const UserCollection = model("User")

const UserValidator = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required(),
  mobile: Joi.string().regex(/\d{10}/).required().messages({
    'string.pattern.base': '"mobile" must be 10 digit number'
  }),
  city: Joi.string().required()
})

const saveUser = (user, data, cb) => {
  user.username = data.username;
  user.email = data.email;
  user.mobile = data.mobile;
  user.city = data.city;
  user.save(cb);
}

const listUsers = (req,res) => {
  UserCollection.find({}, (err, docs) => {
    if (err) {
      return res.send(err);
    } 
    res.render('users/index', {docs});
  }).lean()
}

const createUser = (req, res) => {
  saveUser(new UserCollection(), req.body, err => {
    console.log(err);
    if(err) res.send(err);
    else res.redirect('/users/')
  })
}

const showEditForm = (req, res) => {
  UserCollection.findById(req.params.id, (err, user) => {
    if(err) {
      return res.send(err);
    }
    res.render("users/form", {user})
  }).lean();
}

const updateUser = (req, res) => {
  UserCollection.findById(req.params.id, (err, user) => {
    if(err) {
      return res.send(err);
    }
    saveUser(user, req.body, err => {
      console.log(err);
      if(err) res.send(err);
      else res.redirect('/users/')
    })
  }).lean();
}

const deleteUser = (req, res) => {
  UserCollection.deleteOne({_id: req.params.id}, err => {
    if(err) {
      return res.send(err);
    }
    res.redirect('/users/')
  });
}


// Attach Routes with it's functions 
router.get('/', listUsers)
router.get('/create', (req, res) => res.render('users/form'));
router.post('/', validateRequest(UserValidator, 'users/form'), createUser);
router.get('/edit/:id', showEditForm);
router.put('/update/:id', validateRequest(UserValidator, 'users/form'), updateUser);
router.post('/delete/:id', deleteUser);

// Export router
module.exports = router;