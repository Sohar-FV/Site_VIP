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

//Répertoire -------------------------------------

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

//Fiches VIP -------------------------------------

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
      let sql = "SELECT p.PHOTO_ADRESSE as photo FROM photo p WHERE p.VIP_NUMERO = "+numero+" AND p.PHOTO_NUMERO = 1;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.photoSuppByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT p.PHOTO_ADRESSE as photo , p.PHOTO_SUJET as sujet, p.PHOTO_COMMENTAIRE as comment FROM photo p WHERE p.VIP_NUMERO = "+numero+" AND p.PHOTO_NUMERO > 1;";

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
      let sql = "SELECT f.FILM_NUMERO, f.VIP_NUMERO as numReal, v.VIP_NOM as nomReal , v.VIP_PRENOM as prenomReal, FILM_TITRE as nomFilm , FILM_DATEREALISATION as date FROM vip v, film f, joue j WHERE j.FILM_NUMERO=f.FILM_NUMERO AND v.VIP_NUMERO=f.VIP_NUMERO AND j.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.mannequinByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT VIP_NUMERO FROM mannequin where VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.defileByMannequinNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT  d.DEFILE_LIEU as lieu, d.DEFILE_DATE as date, v.VIP_NUMERO as numCouturier, v.VIP_NOM as nomCouturier , v.VIP_PRENOM as prenomCouturier FROM vip v, defile d, defiledans dd WHERE dd.DEFILE_NUMERO=d.DEFILE_NUMERO AND v.VIP_NUMERO=d.VIP_NUMERO AND dd.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.couturierByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT VIP_NUMERO as num FROM couturier where VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.defileByCouturierNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT  d.DEFILE_LIEU as lieu, d.DEFILE_DATE as date FROM defile d WHERE d.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.chanteurByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT VIP_NUMERO as num, CHANTEUR_SPECIALITE as spe FROM chanteur where VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.albumByChanteurNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT  a.ALBUM_TITRE as titre, a.ALBUM_DATE as date, m.MAISONDISQUE_NOM as maisonDisque FROM album a, composer c, maisondisque m WHERE a.ALBUM_NUMERO=c.ALBUM_NUMERO AND a.MAISONDISQUE_NUMERO=m.MAISONDISQUE_NUMERO AND c.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.realByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT VIP_NUMERO as num FROM realisateur where VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.filmByRealNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT  f.FILM_TITRE as titre, f.FILM_DATEREALISATION as date FROM film f WHERE f.VIP_NUMERO="+numero+";";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

//Albums -------------------------------------

module.exports.officialPhotos = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT  p.PHOTO_ADRESSE as adresse, p.VIP_NUMERO as numero FROM photo p WHERE PHOTO_NUMERO = 1;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.vip_photoByVipNum = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT v.VIP_NOM as nom, v.VIP_PRENOM as prenom, p.PHOTO_ADRESSE as adresse, p.PHOTO_COMMENTAIRE as commentaire, p.PHOTO_NUMERO as numero FROM vip v, photo p WHERE v.VIP_NUMERO = "+numero+" AND p.VIP_NUMERO = "+numero+" group by numero;";

      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

//Articles --------------------------------------

module.exports.tousLesVip = function(callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT v.VIP_NUMERO as numero, v.VIP_NOM as nom, v.VIP_PRENOM as prenom FROM vip v ORDER by nom ASC;";
      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.articles = function(numero, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT v.VIP_NUMERO as num, v.VIP_NOM as nom, v.VIP_PRENOM as prenom, a.ARTICLE_NUMERO as numArt, a.ARTICLE_TITRE as titre, a.ARTICLE_RESUME as resume, a.ARTICLE_NUMEROPAGEDEBUT as pageDebut, a.ARTICLE_DATE_INSERT as date from article a JOIN apoursujet ap ON a.ARTICLE_NUMERO = ap.ARTICLE_NUMERO JOIN vip v ON ap.VIP_NUMERO=v.VIP_NUMERO where v.VIP_NUMERO="+numero+" ORDER BY a.ARTICLE_DATE_INSERT DESC;";
      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};

module.exports.detailsArticles = function(numeroArticle, callback) {
  db.getConnection(function(err, connexion) {
    if (!err) {
      let sql = "SELECT a.ARTICLE_NUMERO as numArt, a.ARTICLE_TITRE as titre, a.EXEMPLAIRE_NUMERO as numExempl, a.ARTICLE_RESUME as resume, a.ARTICLE_NUMEROPAGEDEBUT as pageDebut, a.ARTICLE_DATE_INSERT as date, e.EXEMPLAIRE_DATEPUBLICATION as datePub from article a JOIN apoursujet ap ON a.ARTICLE_NUMERO = ap.ARTICLE_NUMERO JOIN exemplaire e ON a.EXEMPLAIRE_NUMERO=e.EXEMPLAIRE_NUMERO where a.ARTICLE_NUMERO="+numeroArticle+";";
      console.log(sql);
      connexion.query(sql, callback);
      connexion.release();
    }
  });
};


//Administration --------------------------------------

module.exports.connexion = function(login, pwd, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT LOGIN, PASSWD FROM parametres WHERE LOGIN = \"" + login + "\"";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.nationnalite = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT  NATIONALITE_NOM, NATIONALITE_NUMERO  FROM nationalite";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.vips = function(callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT VIP_NOM, VIP_NUMERO, VIP_PRENOM FROM vip ORDER BY VIP_NOM ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.vip = function(vip, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "SELECT v.VIP_NOM, v.VIP_NUMERO, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, PHOTO_SUJET, PHOTO_ADRESSE FROM vip v JOIN photo p ON v.VIP_NUMERO=p.VIP_NUMERO WHERE PHOTO_NUMERO = 1 AND v.VIP_NUMERO = " +  vip + " ORDER BY VIP_NOM ASC ;";
            connexion.query(sql, callback);
            connexion.release();
        }
    });
};

module.exports.ajouterVip = function(nationalite, nom, prenom, sexe, naissance, texte, photo, sujet, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "INSERT INTO vip (NATIONALITE_NUMERO, VIP_NOM, VIP_PRENOM, VIP_SEXE, VIP_NAISSANCE, VIP_TEXTE, VIP_DATE_INSERTION)VALUES ( \"" + nationalite + "\", \"" + nom + "\", \"" + prenom + "\", \"" + sexe + "\", " + naissance + ", \"" + texte + "\", NOW());";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
            db.getConnection(function(err, connexion) {
                if (!err) {
                    sql = "INSERT INTO photo (PHOTO_NUMERO, VIP_NUMERO, PHOTO_SUJET, PHOTO_COMMENTAIRE, PHOTO_ADRESSE) VALUES (1,(SELECT VIP_NUMERO FROM vip ORDER BY VIP_NUMERO DESC LIMIT 1), \""+ sujet + "\",\"\", \"" + photo + "\")";
                    console.log(sql);
                    connexion.query(sql, callback);
                    connexion.release();
                }
            });
        };
    });
}

module.exports.modifVip = function(vipId, nationalite, nom, prenom, sexe, naissance, texte, photo, sujet, callback) {
    db.getConnection(function(err, connexion) {
        if (!err) {
            let sql = "UPDATE vip SET NATIONALITE_NUMERO = \"" + nationalite + "\", VIP_NOM = \"" + nom + "\", VIP_PRENOM = \"" + prenom + "\", VIP_SEXE = \"" + sexe + "\", VIP_NAISSANCE = " + naissance + ", VIP_TEXTE = \"" + texte + "\" WHERE VIP_NUMERO = " + vipId + ";";
            console.log(sql);
            connexion.query(sql, callback);
            connexion.release();
            db.getConnection(function(err, connexion) {
                if (!err) {
                    if (photo) {
                        sql = "UPDATE photo SET PHOTO_SUJET = \"" + sujet +"\", PHOTO_ADRESSE = \"" + photo + "\" WHERE VIP_NUMERO = " + vipId;
                    }
                    else
                    {
                        sql = "UPDATE photo SET PHOTO_SUJET = \"" + sujet +"\" WHERE VIP_NUMERO = " + vipId;
                    }
                    console.log(sql);
                    connexion.query(sql, callback);
                    connexion.release();
                }
            });
        };
    });
}
