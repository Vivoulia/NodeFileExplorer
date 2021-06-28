"use strict";
const sqlite3 = require('sqlite3').verbose();

class Db {
    constructor(file) {
        this.db = new sqlite3.Database(file);
        this.createTable()
    }

    createTable() {
        const sql = `
            CREATE TABLE IF NOT EXISTS user (
                id integer PRIMARY KEY,
                name text UNIQUE,
                password text,
                admin boolean)`
        this.db.run(sql);

        this.selectByName("admin", function(err, user) {
            if(!user){
                this.db.run(
                    'INSERT INTO user (name,password, admin) VALUES (admin,ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff,1)')
            }
        });
    }

    selectByName(name, callback) {
        return this.db.get(
            `SELECT * FROM user WHERE name = ?`,
            [name],function(err,row){
                callback(err,row)
            })
    }

    selectById(id, callback) {        
        return this.db.get(
            'SELECT * FROM user WHERE id = ?',
            [id],function(err,row){
                callback(err,row)
            })
    }

    selectAll(callback) {
        return this.db.all(`SELECT * FROM user`, function(err,rows){
            callback(err,rows)
        })
    }

    insert(username, password, admin, callback) {
        return this.db.run(
            'INSERT INTO user (name,password, admin) VALUES (?,?,?)',
            [username, password, admin], (err) => {
                callback(err)
            })
    }
}

module.exports = Db