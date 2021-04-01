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
        //redirection vip
        app.get('/vip', AdministrationController.Vip);
        app.post('/vip', AdministrationController.Vip);

        //ajouter vip
        app.get('/ajouterVip', AdministrationController.AjouterVip);
        app.post('/ajouterVip', AdministrationController.AjouterVip);

        //modifier un vip
        app.get('/modifierVip', AdministrationController.ModifierVip);
        app.post('/modifierVip', AdministrationController.ModifierVip);

        //supprimer un vip
        app.get('/supprimerVip', AdministrationController.SupprimerVip);
        app.post('/supprimerVip', AdministrationController.SupprimerVip);

        //redirection photo
        app.get('/photo', AdministrationController.Photo);
        app.post('/photo', AdministrationController.Photo);

        //ajout d'une photo
        app.get('/ajouterPhoto', AdministrationController.AjouterPhoto);
        app.post('/ajouterPhoto', AdministrationController.AjouterPhoto);

        //suppression d'une photo
        app.get('/supprimerPhoto', AdministrationController.SupprimerPhoto);
        app.post('/supprimerPhoto', AdministrationController.SupprimerPhoto);
}}};
