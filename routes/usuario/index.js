var express = require('express');
var router = express.Router();
var async = require('async');
/*  Banco de dados*/
var mongoose = require('mongoose');
var post = mongoose.model('post');
var categoria = mongoose.model('categoria');
/* Format data*/
var dateFormat = require('dateformat');


/* GET home page. */
router.get('/', function (req, res) {
    console.log("Index usuario");

    var usuario_logado = req.session.logged;
    console.log(usuario_logado);
    var result;

    res.render('usuario/layout', {usuario: usuario_logado});
});

router.get('/noticia/:id', function (req, res, next) {

    console.log("Click Noticia");
    var usuario_logado = req.session.logged;

    var posts = [];
    var maisLidas = null;
    var id = req.params.id;

    res.render("usuario/layout", {usuario: usuario_logado});

});

/* GET chamadas assincronas */
router.get('/noticias', function (req, res) {
    console.log("Busca noticias usuario");

    var query = post.find().limit(5);
    query.exec(function (err, noticias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }

        return res.json(200, noticias);
    });


});

router.get('/noticiasmaislidas', function (req, res) {
    console.log("Busca noticias mais lidas usuario");
    var query = post.find().sort({numero_clicks: -1}).limit(5);
    query.exec(function (err, noticias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }
        return res.json(200, noticias);
    });
});

router.get('/buscarcategorias', function (req, res) {
    console.log("Busca categoria mais lidas usuario");
    var query = categoria.find();
    query.exec(function (err, categorias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }
        return res.json(200, categorias);
    });
});

router.get('/buscarnoticias/:value', function (req, res) {

    console.log("Pesquisar noticias: ");
    var value = req.params.value;

    var query = "";
    if (value == "undefined" || value == "") {
        query = post.find().limit(5);
    } else {
        query = post.find({content: new RegExp(value)}).limit(5);
    }

    query.exec(function (err, noticias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }
        return res.json(200, noticias);
    });


});

router.get('/buscarnoticia/:value', function (req, res) {
    var value = req.params.value;
    var noticias = [];
    console.log("Buscar noticia usuario: " + value);
    var query = post.findOne({'_id': value});
    query.exec(function (err, noticia) {
        if (err) {
            console.log(err);
            return res.send(400);
        }
        noticia.numero_clicks = noticia.numero_clicks + 1;
        noticia.save();
        return res.json(200, noticia);
    });


});

router.get('/buscarcategoria/:value', function (req, res) {

    console.log("Pesquisar categorias: ");
    var value = req.params.value;

    var query = "";
    if (value == "undefined" || value == "") {
        query = post.find().limit(5);
    } else {
        query = post.find({category: value}).limit(5);
    }

    query.exec(function (err, noticias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }
        return res.json(200, noticias);
    });


});

router.get('/gosteinoticia/:value', function (req, res) {

    console.log("Gostei Noticia: ");
    var value = req.params.value;

    var query = post.findOne({_id: value});

    query.exec(function (err, noticia) {
        if (err) {
            console.log(err);
            return res.send(400);
        }

        noticia.gostei = noticia.gostei + 1;
        noticia.save();

        return res.json(200);
    });

});

router.get('/naogosteinoticia/:value', function (req, res) {

    console.log("Não gostei noticia: ");
    var value = req.params.value;

    var query = post.findOne({_id: value});

    query.exec(function (err, noticia) {
        if (err) {
            console.log(err);
            return res.send(400);
        }

        noticia.nao_gostei = noticia.nao_gostei + 1;
        noticia.save();

        return res.json(200);
    });

});

router.get('/carreganoticias', function (req, res) {
    console.log("Carregar noticias");
    res.render('usuario/noticias', {layout: false});

});

router.get('/carreganoticia', function (req, res) {
    console.log("Carrega noticia");
    res.render('usuario/noticia', {layout: false});

});


/* GET noticia*/



router.get('/gostei/:id', function (req, res) {

    console.log("Gostei notícia");

    var id = req.params.id;
    console.log(id);
    post.findOne({_id: id}, function (err, post) {
        console.log(post);
        if (!err) {
            var number_gostei = post.gostei + 1;
            post.gostei = number_gostei;
            post.save();
            console.log('Gostei ' + post.title + ' atualizado para ' + number_gostei);
            res.redirect('/');
        } else {
            console.log('Erro ao cadastrar o gostei ' + post.title);
            res.redirect('/');
        }
    });


});

router.get('/ngostei/:id', function (req, res) {

    console.log("Não gostei notícia");

    var id = req.params.id;
    console.log(id);
    post.findOne({_id: id}, function (err, post) {
        console.log(post);
        if (!err) {
            var number_ngostei = post.nao_gostei + 1;
            post.nao_gostei = number_ngostei;
            post.save();
            console.log('Gostei ' + post.title + ' atualizado para ' + number_ngostei);
            res.redirect('/');
        } else {
            console.log('Erro ao cadastrar o gostei ' + post.title);
            res.redirect('/');
        }
    });


});

router.get('/gostei_noticia/:id', function (req, res) {

    console.log("Gostei notícia");

    var id = req.params.id;
    console.log(id);
    post.findOne({_id: id}, function (err, post) {
        console.log(post);
        if (!err) {
            var number_gostei = post.gostei + 1;
            post.gostei = number_gostei;
            post.save();
            console.log('Gostei ' + post.title + ' atualizado para ' + number_gostei);
            res.redirect('/noticia/' + id);
        } else {
            console.log('Erro ao cadastrar o gostei ' + post.title);
            res.redirect('/noticia/' + id);
        }
    });


});

router.get('/ngostei_noticia/:id', function (req, res) {

    console.log("Não gostei notícia");

    var id = req.params.id;
    console.log(id);
    post.findOne({_id: id}, function (err, post) {
        console.log(post);
        if (!err) {
            var number_ngostei = post.nao_gostei + 1;
            post.nao_gostei = number_ngostei;
            post.save();
            console.log('Gostei ' + post.title + ' atualizado para ' + number_ngostei);
            res.redirect('/noticia/' + id);
        } else {
            console.log('Erro ao cadastrar o gostei ' + post.title);
            res.redirect('/noticia/' + id);
        }
    });


});

router.get('/categoria/:nomeCategoria', function (req, res) {

    console.log("Filtrar categoria");

    var usuario_logado = req.session.logged;
    console.log(usuario_logado);

    var nomeCategoria = req.params.nomeCategoria;
    try {
        async.parallel([
                // Find all notícias
                function (callback) {
                    var query = post.find({category: nomeCategoria}).limit(5);
                    query.exec(function (err, noticias) {
                        if (err) {
                            callback(err);
                        }

                        callback(null, noticias);
                    });
                },

                //Find all categorias
                function (callback) {
                    var query = categoria.find();
                    query.exec(function (err, categoria) {
                        if (err) {
                            callback(err);
                        }

                        callback(null, categoria);
                    });
                },

                //Find all mais lidos
                function (callback) {
                    var query = post.find().sort({numero_clicks: -1}).limit(5);
                    query.exec(function (err, noticiasMaisLidas) {
                        if (err) {
                            callback(err);
                        }
                        callback(null, noticiasMaisLidas);
                    });
                }
            ],

            //Compute all results
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }

                if (results == null || results[0] == null) {
                    res.redirect('/');
                }
                console.log('valor resultado categoria: ');
                console.log(results[0]);
                res.render('usuario/index', {
                    title: 'Hero',
                    noticias: results[0],
                    categorias: results[1],
                    maisLidas: results[2],
                    usuario: usuario_logado
                });
            });

    } catch (err) {
        console.log("Falha ao abrir : " + err);
        res.redirect('/usuario/error');
    }


});


/* POST search*/

router.post('/comentario/:id', function (req, res) {

    console.log("User Comentários");

    var id = req.params.id;

    var user = req.body.userComentario;
    console.log(user);
    var comentario = req.body.textComentario;
    console.log(comentario);

    var time = new Date();
    time = dateFormat(time, "yyyy-mm-dd h:MM:ss");

    var comments = {
        postid: id,
        name: user,
        comment: comentario,
        date: time
    };
    console.log(comments);

    try {
        post.findOne({'_id': id}, function (err, post) {
            if (post) {

                console.log(post);

                post.comments.push(comments);
                console.log(post);

                post.save(function (err) {
                    if (err) {
                        console.log('error');
                        res.redirect('noticia/' + id);
                    }
                    else {
                        console.log('success');
                        res.redirect('noticia/' + id);
                    }
                });


            } else {
                console.log("Notifica nao encontrada");
                res.redirect('noticia/' + id);
            }

        });
    } catch (err) {
        console.log("Falha ao buscar: " + err);
        res.redirect('/');
    }


});

router.post('/search', function (req, res) {

    console.log("Index search");
    var maisLidas = null;
    var srch = req.body.search_noticia;
    var usuario_logado = req.session.logged;
    console.log(new RegExp(srch));


    try {
        async.parallel([
                // Find all notícias
                function (callback) {
                    var query = post.find({content: new RegExp(srch)}).limit(5);
                    query.exec(function (err, noticias) {
                        if (err) {
                            callback(err);
                        }
                        callback(null, noticias);
                    });
                },

                //Find all categorias
                function (callback) {
                    var query = categoria.find();
                    query.exec(function (err, categoria) {
                        if (err) {
                            callback(err);
                        }

                        callback(null, categoria);
                    });
                },

                //Find all mais lidos
                function (callback) {
                    var query = post.find().sort({numero_clicks: -1}).limit(5);
                    query.exec(function (err, noticiasMaisLidas) {
                        if (err) {
                            callback(err);
                        }
                        callback(null, noticiasMaisLidas);
                    });
                }
            ],

            //Compute all results
            function (err, results) {
                if (err) {
                    console.log(err);
                    res.redirect('/');
                }

                if (results == null || results[0] == null) {
                    res.redirect('/');
                }
                console.log('valor resultado busca: ');
                console.log(results[0]);
                res.render('usuario/index', {
                    title: 'Hero',
                    noticias: results[0],
                    categorias: results[1],
                    maisLidas: results[2],
                    usuario: usuario_logado
                });
            });

    } catch (err) {
        console.log("Falha ao abrir : " + err);
        res.redirect('/usuario/error');
    }

    /*


     var query_maisLidas = post.find().sort({numero_clicks: -1}).limit(5);

     post.find({content: new RegExp(srch)}, function (err, noticias) {
     if (err) {
     console.log("Erro busca :" + noticias);
     return console.error(err);
     } else if (noticias.length != []) {

     console.log("Tudo certo" + noticias);

     query_maisLidas.exec(function (err, maisLidasNoticias) {
     if (err) {
     console.error("Error query maisLidos find: " + err);
     res.redirect('usuario/error');
     } else {
     res.render('usuario/index', {
     title: 'Hero',
     noticias: noticias,
     maisLidas: maisLidasNoticias,
     usuario: usuario_logado
     });
     }
     });
     } else {

     console.log("Vazio: " + noticias);

     query_maisLidas.exec(function (err, maisLidasNoticias) {
     if (err) {
     console.error("Error query maisLidos find: " + err);
     res.redirect('usuario/error');
     } else {
     res.render('usuario/index', {
     title: 'Hero',
     noticias: null,
     maisLidas: maisLidasNoticias,
     usuario: usuario_logado
     });
     }
     });
     }
     });*/

});


module.exports = router;
