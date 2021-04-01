let model = require("../models/vip.js");

var async = require('async');

// ////////////////////// L I S T E R     A L B U M S

module.exports.ListerAlbum = 	function(request, response){
   response.title = 'Album des stars';

  async.parallel ([

    function (callback){
      model.officialPhotos(function(err, result)  {callback(null,result) } )
    },
    function (callback){
      model.vip_photoByVipNum(request.params.numero, (function(err, result)  {callback(null,result) } ));
    },
  ],
  function (err, result){
   	if (err) {
      console.log(err);
      return;
    }
    response.numero = request.params.numero;
    response.photoAllVip = result[0];
    response.vip = result[1];
    console.log(response.photoAllVip);
    console.log(response.vip);

   response.render('listerAlbum', response);
 }) ;
}
