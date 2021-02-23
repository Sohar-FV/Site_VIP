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
      let sql = "SELECT v.VIP_NUMERO as numero, v.VIP_NOM as nom, v.VIP_PRENOM as prenom, DATE_FORMAT(v.VIP_NAISSANCE, \"%D %M %Y\") as dateNai, p.PHOTO_ADRESSE as photo, n.NATIONALITE_NOM as natio FROM vip v, photo p, nationalite n WHERE v.VIP_NUMERO = p.VIP_NUMERO AND v.VIP_NUMERO = "+numero+" AND n.NATIONALITE_NUMERO = v.NATIONALITE_NUMERO ORDER BY v.VIP_NOM ASC ;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};
