const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req, res) => {
    const sqlText = `SELECT * FROM "todo" ORDER BY task DESC;`;
    pool.query(sqlText)
        .then((result) => {
            res.send(result.rows);
        })
        .catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})
// POST
router.post('/', (req, res) => {
    const task = req.body;
    const sqlText = `INSERT INTO "todo" (task)
    VALUES ($1)`;
    pool.query(sqlText, [task.task])
        .then((result) => {
            console.log(`Added task to the database`, task);
            res.sendStatus(201);
        }).catch((error) => {
            console.log(`Error making database query ${sqlText}`, error);
            res.sendStatus(500);
        })
})
// PUT (Complete)


// DELETE

module.exports = router;
