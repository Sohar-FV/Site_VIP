
let model = require("../models/vip.js");

var async = require('async');

// ///////////////////////// R E P E R T O I R E    D E S     S T A R S

module.exports.Repertoire = 	function(request, response){

  console.log("Lettre = " + request.params.letter);
  response.title = 'Répertoire des stars';

  async.parallel ([

    function (callback){
      model.firstLetterVip(function(err, result)  {callback(null,result) } )
    },
    function (callback){
      model.vipByLetter(request.params.letter, (function(errE, resE)  {callback(null,resE) } ));
    },
  ],
  function (err, result){
    if (err) {
      console.log(err);
      return;
    }
    response.lettre = request.params.letter;
    response.firstLetters = result[0];
    response.noms = result[1];
    response.render('repertoireVips', response);
  }
);
}



module.exports.ficheVip = 	function(request, response){
 response.title = 'Test à supprimer';

 async.parallel ([

   function (callback){
     model.firstLetterVip(function(err, result)  {callback(null,result) } )
   },
   function (callback){
     model.vipByNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.photo1ByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.photoSuppByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.liaisonByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
 ],
 function (err, result){
   if (err) {
     console.log(err);
     return;
   }
   response.firstLetters = result[0]
   response.vip = result[1];
   response.photo = result[2];
   response.photoSupp = result[3];
   response.liaison = result[4];
   response.render('ficheVip', response);
 }
); // appel la vue Handlebars qui va afficher le résultat
}
