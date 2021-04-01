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



module.exports.Vip = 	function(request, response){
    response.title = 'Administration';
    // if(!request.session.login) {
    //     response.redirect('/');
    // }
    // else {
        response.render('ajouterVip', response);
    // }
 };

 module.exports.ModifierVip = function(request, response){
    response.title = 'Administration';
    // if(!request.session.login) {
    //     response.redirect('/');
    // }
    // else {
       let vipId = request.body.vip_id;
        let nom = request.body.nom_vip;
        let prenom = request.body.prenom_vip;
        if (nom && prenom) {
            let nationalite = request.body.nat_vip;
            let sexe = request.body.sex_vip;
            let naissance = request.body.date_naiss_vip;
            if (!naissance) {naissance = "NULL"; } else { naissance = "'"+naissance+"'";}
            let texte = request.body.com_vip;
            let photo = request.body.image_vip;
            let sujetPhoto = request.body.sujet_vip;

            model.modifVip(vipId, nationalite, nom, prenom, sexe, naissance, texte, photo, sujetPhoto, function(err, result) {  // appel le module test qui exécute la requete SQL
                if (err) {
                    console.log(err);
                    return;
                }

                response.msg = nom + " a été modifié !";

                response.render('ajouterVip', response);
            })
        }
        else {
            async.parallel ([
                function (callback) {
                model.vips(function (err, result) {callback(null,result)});
                },
                function (callback) {
                model.vip(request.body.vip_choix, (function (err, res) {callback(null,res)}));
                },
                function (callback) {
                model.nationnalite(function (err, res) {callback(null,res)});
                },
                ],
                function (err, result) {
                if (err) {
                    console.log(err);
                    return;
                }
                response.vips = result[0];
                response.vip = result[1];
                response.nationalites = result[2];
                console.log(response.nationalites);

                response.render('modifierVip', response);
            })
        }
    // }
 };

 module.exports.AjouterVip = 	function(request, response){
     response.title = 'Administration';
     // if(!request.session.login) {
     //     response.redirect('/');
     // }
     // else {

             
             model.ajouterVip(request.body.nat_vip, request.body.nom_vip, request.body.prenom_vip, request.body.sex_vip,
               request.body.date_naiss_vip, request.body.com_vip, request.body.image_vip, request.body.sujet_vip, function(err, result) {  // appel le module test qui exécute la requete SQL
                 if (err) {
                     console.log(err);
                     return;
                 }

                 response.msg = nom + " a été ajouté !";

                 response.render('ajouterVip', response);
             })


             model.nationnalite(function(err, result) {  // appel le module test qui exécute la requete SQL
                 if (err) {
                     console.log(err);
                     return;
                 }
                 response.nationalites = result;
                 response.render('ajouterVip', response);
             })
         };
     // }


 module.exports.SupprimerVip = function(request, response){
    response.title = 'Administration';
    // if(!request.session.login) {
    //     response.redirect('/');
    // }
    // else {
        let vipId = request.body.vip_choix;
        if (vipId!=null) {
            console.log('Supprimer ' + vipId);
            async.parallel ([
                function (callback) {
                   model.vip(vipId, function (err, result) {callback(null,result)});
                },
                function (callback) {
                   model.deleteVip(vipId, (function (errE, resE) {callback(null,resE)}));
                },
                ],
                function (err, result) {
                    if (err) {
                        console.log(err);
                        return;
                    }
                })
        }
        else {
            model.vips(function(err, result) {  // appel le module test qui exécute la requete SQL
                if (err) {
                    console.log(err);
                    return;
                }
                response.vips = result;

                response.render('supprimerVip', response);
            })
        }
    // }
 };


