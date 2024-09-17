const http = require('http');
const url = require('url');
const Loja = require('./database/Loja');
const Clientes = require('./database/Clientes');

var callback = function (req, res) {

    res.setHeader('Access-Control-Allow-Origin', '*');
    res.writeHead(200, { 'Content-type': 'application/json' })
    var rota = url.parse(req.url, true);
    var dados = rota.query;

    if (req.method == 'GET') {

        if (rota.pathname == '/loja') {
            Loja.getLoja(function (loja) {
                var json = JSON.stringify(loja)
                res.end(json)
            });
        } 

        if (rota.pathname == '/clientes') {
            Clientes.getClientes(function (clientes) {
                var json = JSON.stringify(clientes)
                res.end(json)
            });
        } 
    } else if (req.method == 'POST') {
        var body = '';
        req.on('data', function(dados){
            body += dados;

        })

        if(rota.pathname == '/loja'){
            req.on('end', function(){
                let loja = JSON.parse(body);
                Loja.saveLoja(loja, function(){
                    var json = JSON.stringify(loja);
                    res.end(json)
                })
            })
        }

        if(rota.pathname == '/clientes'){
            req.on('end', function(){
                let clientes = JSON.parse(body);
                Clientes.saveClientes(clientes, function(){
                    var json = JSON.stringify(clientes);
                    res.end(json)
                })
            })
        }

    }
}
const server = http.createServer(callback)
server.listen(3000)