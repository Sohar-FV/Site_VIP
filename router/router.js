let HomeController = require('./../controllers/HomeController');
let VipController = require('./../controllers/VipController');
let AlbumController = require('./../controllers/AlbumController');
let TestController = require('./../controllers/TestController');
let ArticleController = require('./../controllers/ArticleController');

let AdministrationController = require('./../controllers/AdministrationController');

// Routes
module.exports = function(app){

if(app.get('port')==6800){
  // tests à supprimer
  app.get('/test', TestController.Test);

  // Main Routes
  app.get('/', HomeController.Index);
  app.get('/accueil', HomeController.Index);

  // VIP
  app.get('/repertoire', VipController.Repertoire);
  app.get('/repertoire/:letter', VipController.Repertoire);
  app.get('/repertoire/vip/:numero', VipController.ficheVip);

  // albums
  app.get('/album', AlbumController.ListerAlbum);

  // articles
  app.get('/articles', ArticleController.ArticlesVip);
  app.get('/articles/:numero', ArticleController.ArticlesVip);

  // tout le reste
  app.get('*', HomeController.NotFound);
  app.post('*', HomeController.NotFound);

} else{ if(app.get('port')==6900){
        app.get('/', AdministrationController.Connexion);
        app.post('/', AdministrationController.Connexion);
}}};
