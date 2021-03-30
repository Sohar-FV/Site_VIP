
let model = require("../models/vip.js");

var async = require('async');

module.exports.ArticlesVip = 	function(request, response){
  async.parallel ([

    function (callback){
      model.tousLesVip(function(err, result)  {callback(null,result) } )
    },
    function (callback){
      model.articles(request.params.numero, (function(err, result)  {callback(null,result) } ));
    },
  ],
  function (err, result){
    if (err) {
      console.log(err);
      return;
    }
    response.numero = request.params.numero;
    response.tousLesVip = result[0];
    response.articles = result[1];
    response.render('ArticlesVip', response);
  }
 );
}

module.exports.DetailArticlesVip = 	function(request, response){
  async.parallel ([

    function (callback){
      model.tousLesVip(function(err, result)  {callback(null,result) } )
    },
    function (callback){
      model.detailsArticles(request.params.numeroArticle, (function(err, result)  {callback(null,result) } ));
    },
  ],
  function (err, result){
    if (err) {
      console.log(err);
      return;
    }
    response.numeroArticle = request.params.numeroArticle;
    response.tousLesVip = result[0];
    response.detail = result[1];
    response.render('DetailsArticle', response);
  }
 );
}
