var express = require('express');
var router = express.Router();
const axios = require('axios');
var Mailchimp = require('mailchimp-api-v3')



var bodyParser = require('body-parser'); // Charge le middleware de gestion des paramètres
var urlencodedParser = bodyParser.urlencoded({ extended: false });

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index');
});
router.post('/envoyer' , urlencodedParser, function(req, res) {
  var firstname = req.body.firstname;
  var lastname = req.body.lastname;
  var mail = req.body.mail;

  // let url = "https://us17.api.mailchimp.com/3.0/lists/2a12b877c0/members"
  let api = "9ddff04bf92463b4311ef9d4584fd42b-us17"
  //     axios
  //     .post(url, {
  //       auth:{
  //         username: 'username',
  //         password : api
  //       },
  //       headers:{
  //         'content-type': 'application/json',
  //         "Access-Control-Allow-Origin": "*"
  //       },
  //       data:{
  //         'email_address' : mail,
  //         "status": "subscribed",
  //         "merge_fields": {
  //           "FNAME": firstname,
  //           "LNAME": lastname
  //         }
  //       }
  //     })
  //     .then(response => {
  //       console.log(response);
  //     })
  //     .catch(err => {
  //         console.log(err);
  //     })

  var mailchimp = new Mailchimp(api);

  mailchimp.post('/lists/2a12b877c0/members', {
    email_address : mail,
    status : 'subscribed',
    merge_fields: {
      FNAME : firstname,
      LNAME: lastname
    }
  })


  res.render('success', {mail: mail, firstname:firstname, lastname:lastname})
})

module.exports = router;
