
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




module.exports.RepertoireLetter = 	function(request, response){
   response.title = 'Répertoire des stars';

   model.firstLetterVip(function(err, result){  // appel le module test qui exécute la requete SQL
       if (err) {
           console.log(err);
           return;
       }
       response.firstLetters = result;


      response.render('repertoireVips', response);
  } );

}
