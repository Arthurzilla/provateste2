const mysql = require('mysql');
//comentario
class Clientes{
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

    static getClientes(callback){
        let connection = Clientes.connect();
        let query = 'select * from clientes'

        connection.query(query, function(error, results, fields){
            if(error) throw error;
            let clientes = results;
            callback(clientes)
        })
    }

    static insert(clientes, callback){
        let connection = Clientes.connect();

        let query = 'insert into clientes set ?'
        connection.query(query, clientes, function(error,results, fields){
            if(error) throw error;

            clientes.id = results.insertId;
            callback(clientes);
        })
    }

    static update(clientes, callback){
        let connection = Clientes.connect();

        let query = 'update clientes set ? where id = ?'
        let id = clientes.id;
        connection.query(query, [clientes, id], function(error, results, fields){
            if(error) throw error;
            callback(clientes);
        })
        connection.end();
    }

    static getClienteById(id, callback){
        let connection = Clientes.connect();
        let query = 'select * from clientes where id = ?'
        connection.query(query, id, function(error, results, fields){
            if(error) throw error;
            if(results.length == 0){
                return callback({'error': 'clientes Inexistente'})
            }

            let clientes = results[0];
            callback(clientes);
        })

        connection.end();
    }

    static saveClientes(clientes, callback){
        let connection = Clientes.connect();
 
        let query = 'insert into clientes set ?';
 
        connection.query(query, clientes, function(error, results, fields){
            if(error) throw error;
 
            clientes.id = results.insertId;
            callback(clientes);
        })
 
        connection.end();
    }

    static delete(id, callback){
        let connection = Clientes.connect();
        let query = 'delete from clientes where id = ?';

        connection.query(query, id, function(error, results, fields){
            if (error)
            throw error;

           // livros.id = results.insertId;
            callback(id)
        })
    }
}

module.exports = Clientes;