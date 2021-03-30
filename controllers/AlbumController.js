let model = require("../models/vip.js");

var async = require('async');

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';

   model.officialPhotos(function(err, result){  // appel le module test qui exécute la requete SQL
       if (err) {
           console.log(err);
           return;
       }
     response.photo = result
     console.log(response.photo);

   response.render('listerAlbum', response);
 }) ;
}
