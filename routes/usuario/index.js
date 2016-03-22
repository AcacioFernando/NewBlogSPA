var express = require('express');
var router = express.Router();

var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

/*  Banco de dados*/
var mongoose = require('mongoose');
var post = mongoose.model('post');
var categoria = mongoose.model('categoria');

/* Format data*/
var dateFormat = require('dateformat');

/*  Banco de dados */
var cloudinary = require('cloudinary');
cloudinary.config({
    cloud_name: 'hlrpvlno9',
    api_key: '233981594891625',
    api_secret: '95VDJfIMfT_10QuSBvqkoAl24xc'
});


/* GET home page. */
router.get('/', function (req, res) {
    console.log("Index usuario");
    var usuario_logado = req.session.logged;
    console.log(usuario_logado);
    res.render('usuario/index', {usuario: usuario_logado});
});

router.get('/noticia/:id', function (req, res, next) {

    console.log("Click Noticia");
    var usuario_logado = req.session.logged;
    res.render("usuario/index", {usuario: usuario_logado});

});

router.get('/categoria/:id', function (req, res, next) {

    console.log("Click categoria");
    var usuario_logado = req.session.logged;

    res.render("usuario/index", {usuario: usuario_logado});

});

router.get('/search/:id', function (req, res, next) {

    console.log("Click search");
    var usuario_logado = req.session.logged;

    res.render("usuario/index", {usuario: usuario_logado});

});

/* GET chamadas assincronas */

router.get('/buscarnoticias', function (req, res) {
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

router.get('/buscarusuario', function (req, res) {
    console.log("Buscar  usuario");

    var usuario_logado = req.session.logged;
    return res.json(200, usuario_logado);

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

router.get('/buscarpesquisa/:value', function (req, res) {

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
    console.log(value);
    var query = "";
    var queryC = "";
    if (value == "undefined" || value == "") {
        query = post.find().limit(5);
    } else {
        queryC = categoria.findOne({_id: value});
    }

    queryC.exec(function (err, categoria) {
        if (err) {
            console.log(err);
            return res.send(400);
        }
        query = post.find({category: categoria.nome_categoria}).limit(5);
        query.exec(function (err, noticias) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            if (noticias)
                return res.json(200, noticias);
            else
                return res.render('usuario/pesquisavazia');
        });
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

router.get('/buscarnoticiasdeletar', function (req, res) {
    console.log("Busca noticias usuario");

    var query = post.find();
    query.exec(function (err, noticias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }

        return res.json(200, noticias);
    });


});
/* Post chamdas assincronas*/

router.post('/submitcomentario/:value', function (req, res) {
    console.log("Entrei aqui");

    var value = req.params.value;
    var query = post.findOne({_id: value});

    var comentario = req.body.comment;
    console.log(comentario);
    var user = req.body.nome;
    console.log(user);

    var time = new Date();
    time = dateFormat(time, "yyyy-mm-dd h:MM:ss");

    try {
        post.findOne({'_id': value}, function (err, noticia) {
            if (noticia) {

                var comments = {
                    postid: value,
                    name: user,
                    comment: comentario,
                    date: time
                };
                noticia.comments.push(comments);
                noticia.save(function (err) {
                    if (err) {
                        console.log('Falha ao salvar comentário: ' + err);
                        return res.json(400, noticia.comments);
                    }
                    else {
                        console.log('success');
                        res.json(200, noticia.comments);
                    }
                });
            } else {
                console.log("Falha ao buscar noticia: " + err);
                return res.send(400);
            }
        });

    } catch (err) {
        console.log("Falha ao buscar: " + err);
        return res.send(400);
    }
});


/* Mudar para admim */
router.get('/deletarnoticia/buscarnoticiadeletar/:value', function (req, res) {
    console.log("Busca noticias deletar usuario");
    var value = req.params.value;

    try {
        var query = post.findOne({'_id': value});
        query.exec(function (err, noticia) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            var imgagem = noticia.img.replace("http://res.cloudinary.com/hlrpvlno9/image/upload/v1446942169/", "");
            console.log(imgagem);
            cloudinary.api.delete_resources_by_tag(imgagem,
                function (result) {
                    console.log(result);
                    noticia.remove();
                    console.log('removed');
                    return res.json(200);
                });


        });
    } catch (err) {
        return res.send(400);
    }
});

router.get('/buscarnoticiasdeletar', function (req, res) {
    console.log("Busca noticias usuario");

    var query = post.find().limit(10);
    query.exec(function (err, noticias) {
        if (err) {
            console.log(err);
            return res.send(400);
        }

        return res.json(200, noticias);
    });


});

router.post('/cadastrarnoticia/uploadform', multipartMiddleware, function (req, res, next) {

    console.log("salvarPost");

    var error = null;
    var time = new Date();
    time = dateFormat(time, "yyyy-mm-dd h:MM:ss");
    console.log(time);
    var dir = "http://res.cloudinary.com/hlrpvlno9/image/upload/v1446942169/";
    try {

        var title_post = time.split(' ').join('-');
        console.log(title_post);

        var image = req.files.file
            , image_upload_path_old = image.path
            , image_upload_name = image.name.split(' ').join('-')
            , image_name_ext = title_post + image_upload_name
            , image_name = image_name_ext.replace(".jpg", "")
            , image_name_ext = dir + image_name_ext;
        ;

        console.log(image_name);

        post.create({
            title: req.body.noticia.title,
            title_sub: req.body.noticia.title_sub,
            content: req.body.noticia.content,
            category: req.body.noticia.category.nome_categoria,
            sub_title: req.body.noticia.title_sub,
            date: time,
            img: image_name_ext,
            numero_clicks: Number(0),
            gostei: Number(0),
            nao_gostei: Number(0)
        }, function (err, user) {
            if (err) {

                console.log(err);
                return res.send(400);
            }
            if (user) {
                console.log("Sem errro ");
                // Testa se o diretório upload existe na pasta atual
                cloudinary.uploader.upload(
                    image_upload_path_old,
                    function (result) {
                        console.log(result);
                    },
                    {
                        public_id: image_name
                    });
                return res.json(200);

            }
        });

    } catch (err) {
        console.log(err);
        return res.send(400);
    }
});

router.get('/deletarnoticia/buscarnoticiadeletar/:value', function (req, res) {
    console.log("Busca noticias deletar admin");
    var value = req.params.value;

    try {
        var query = post.findOne({'_id': value});
        query.exec(function (err, noticia) {
            if (err) {
                console.log(err);
                return res.send(400);
            }
            var imgagem = noticia.img.replace("http://res.cloudinary.com/hlrpvlno9/image/upload/v1446942169/", "");
            console.log(imgagem);
            cloudinary.api.delete_resources_by_tag(imgagem,
                function (result) {
                    console.log(result);
                    noticia.remove();
                    console.log('removed');
                    return res.json(200);
                });


        });
    } catch (err) {
        return res.send(400);
    }
});

module.exports = router;
