
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
     model.mariageByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.liaisonByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.acteurByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.filmByActorNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.realByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.filmByRealNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.mannequinByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.defileByMannequinNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.couturierByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.defileByCouturierNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.chanteurByVipNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
   },
   function (callback){
     model.albumByChanteurNum(request.params.numero, (function(errE, resE)  {callback(null,resE) } ));
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
   response.mariage = result[4];
   response.liaison = result[5];
   response.acteur = result[6];
   response.filmsA = result[7];
   response.realisateur = result[8];
   response.filmsR = result[9];
   response.mannequin = result[10];
   response.defilesM = result[11];
   response.couturier = result[12];
   response.defilesC = result[13];
   response.chanteur = result[14];
   response.albums = result[15];
   console.log(response.albums);
   response.render('ficheVip', response);
 }
); // appel la vue Handlebars qui va afficher le résultat
}
