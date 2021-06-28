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
        return this.db.run(
            'INSERT INTO user (name,password, admin) VALUES (?,?,?)',
            ["admin", "admin", "1"])
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