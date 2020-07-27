const express = require('express');
const router = express.Router();
const axios = require('axios');
const Mailchimp = require('mailchimp-api-v3')
const bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
const urlencodedParser = bodyParser.urlencoded({ extended: false });
const Account = require('./pass')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/envoyer' , urlencodedParser, function(req, res) {
  let firstname = req.body.firstname;
  let lastname = req.body.lastname;
  let mail = req.body.mail;
  let birth = req.body.birth;
  let phone = req.body.phone
  let affil = Math.random().toString(36).substring(7);
  console.log("random", affil);

  //inversion du mois et jour pour API
  birth = birth.split('/')
  birth = birth[1] + '/' + birth[0]

  //Envoi par API dans la base mailchimp
  //A faire en parallèle d'ajout dans la base de donnée.
  let mailchimp = new Mailchimp(Account.mailchimpApi);

  mailchimp.post(Account.mailchimpUrl, {
    email_address : mail,
    status : 'subscribed',
    merge_fields: {
      FNAME : firstname,
      LNAME: lastname,
      BIRTH: birth,
      PHONE: phone,
      AFFIL: affil
    }
  })
  .then(function (result) {
    console.log(result);
    res.render('success', {mail: mail, firstname:firstname, lastname:lastname, birth:birth, phone:phone, affil:affil})
  })
  .catch(function (err) {
    console.log(err);
    res.redirect('/');
  })
})

module.exports = router;
