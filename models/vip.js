let db = require('../configDb');


module.exports.test = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT COUNT(*) AS NB FROM vip ;";
      // console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.firstLetterVip = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT DISTINCT SUBSTR(VIP_NOM, 1, 1) AS FL FROM vip ORDER BY VIP_NOM ASC ;";
      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.vipByLetter = function(letter, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT v.VIP_NUMERO as numero, v.VIP_NOM as nom, v.VIP_PRENOM as prenom, p.PHOTO_ADRESSE as photo FROM vip v, photo p WHERE v.VIP_NUMERO = p.VIP_NUMERO AND VIP_NOM like \"" +letter+"%\" GROUP BY v.VIP_NUMERO ORDER BY v.VIP_NOM ASC ;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.vipByNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT v.VIP_NUMERO as numero, v.VIP_NOM as nom, v.VIP_PRENOM as prenom, v.VIP_NAISSANCE as dateNai, v.VIP_SEXE as sexe, v.VIP_TEXTE as texte, n.NATIONALITE_NOM as natio FROM vip v, nationalite n WHERE v.VIP_NUMERO = "+numero+" AND n.NATIONALITE_NUMERO = v.NATIONALITE_NUMERO ORDER BY v.VIP_NOM ASC ;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.photo1ByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT p.PHOTO_ADRESSE as photo FROM photo p WHERE p.VIP_NUMERO = "+numero+" group by p.VIP_NUMERO;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.photoSuppByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT p.PHOTO_ADRESSE as photo FROM photo p WHERE p.VIP_NUMERO = "+numero+" AND p.PHOTO_NUMERO > 1;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.liaisonByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT l.DATE_EVENEMENT as date, l.LIAISON_MOTIFFIN as motif, v.VIP_NUMERO as num, v.VIP_PRENOM as prenom, v.VIP_NOM as nom FROM liaison l JOIN vip v ON l.VIP_VIP_NUMERO=v.VIP_NUMERO WHERE l.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.mariageByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT m.DATE_EVENEMENT as date, m.MARIAGE_LIEU as lieu, m.MARIAGE_FIN as dateFin, m.MARIAGE_MOTIFFIN as motif, v.VIP_NUMERO as num, v.VIP_PRENOM as prenom, v.VIP_NOM as nom FROM mariage m JOIN vip v ON m.VIP_VIP_NUMERO=v.VIP_NUMERO WHERE m.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.acteurByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT ACTEUR_DATEDEBUT as date FROM acteur where VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.filmByActorNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT f.FILM_NUMERO, f.VIP_NUMERO as numReal , FILM_TITRE as nomFilm , FILM_DATEREALISATION as date FROM film f JOIN joue j ON j.FILM_NUMERO=f.FILM_NUMERO WHERE j.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};
