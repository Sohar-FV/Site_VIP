let model = require("../models/vip.js");
let async = require('async');
let Cryptr = require('cryptr');
let cryptr = new Cryptr('MaSuperCléDeChiffrementDeouF');

module.exports.Connexion = 	function(request, response){
  response.title = 'Administration';
  if(!request.session.login) {

    model.connexion(request.body.login, request.body.pwd, function(err, result) {
      if (err) {
        return;
      }
      response.connexion = result;

      if (result[0] != null) {
        if (cryptr.decrypt(result[0]['PASSWD']) == request.body.pwd) {
          request.session.login = 'login';
          response.redirect('/');
        }
        else
        {
          response.render('connexion', response);
        }
      }
      else {
        response.render('connexion', response);
      }
    })
  }
  else {
    response.redirect('/vip');
  }
};
