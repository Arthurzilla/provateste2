const mysql = require('mysql');

class Loja{
    static connect(){
        var connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '',
            database: 'empresa_bd'
        })
        connection.connect();
        return connection;
    }

    static getLoja(callback){
        let connection = Loja.connect();
        let query = 'select * from loja'

        connection.query(query, function(error, results, fields){
            if(error) throw error;
            let loja = results;
            callback(loja)
        })
    }

    static insert(loja, callback){
        let connection = Loja.connect();

        let query = 'insert into loja set ?'
        connection.query(query, loja, function(error,results, fields){
            if(error) throw error;

            loja.id = results.insertId;
            callback(loja);
        })
    }

    static update(loja, callback){
        let connection = Loja.connect();

        let query = 'update loja set ? where id = ?'
        let id = loja.id;
        connection.query(query, [loja, id], function(error, results, fields){
            if(error) throw error;
            callback(loja);
        })
        connection.end();
    }

    static getLojaById(id, callback){
        let connection = Loja.connect();
        let query = 'select * from loja where id = ?'
        connection.query(query, id, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0){
                return callback({'error': 'loja Inexistente'})
            }

            let loja = results[0];
            callback(loja);
        })

        connection.end();
    }

    static saveLoja(loja, callback){
        let connection = Loja.connect();
 
        let query = 'insert into loja set ?';
 
        connection.query(query, loja, function(error, results, fields){
            if(error) throw error;
 
            loja.id = results.insertId;
            callback(loja);
        })
 
        connection.end();
    }

    static delete(id, callback){
        let connection = Loja.connect();
        let query = 'delete from loja where id = ?';

        connection.query(query, id, function(error, results, fields){
            if (error)
            throw error;

           // livros.id = results.insertId;
            callback(id)
        })
    }
}

module.exports = Loja;