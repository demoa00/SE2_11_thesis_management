'use strict';

const sqlite = require('sqlite3').verbose();
const path = require('path');

const DBSOURCE = path.join(__dirname, '../database/thesis_management.db');

const db = new sqlite.Database(DBSOURCE, (err) => {
    if (err) {
        // Cannot open database
        console.error(err.message);
        throw err;
    }

    db.exec('PRAGMA foreign_keys = 1;', function (error) {
        if (error) {
            console.error("Pragma statement didn't work.")
        }
    });
});

module.exports = db;