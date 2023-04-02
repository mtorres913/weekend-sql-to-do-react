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
router.put('/:id', (req, res) => {
    console.log(`In PUT request /todo`);
    let taskID = req.params.id;
    let taskToEdit = req.params.body;
    let queryText = 'UPDATE "todo" SET "completed" = $1 WHERE "id" = $2;'
    pool.query(queryText,['Yes', taskID]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in PUT ${error}`)
        res.sendStatus(500);
    })
})

// DELETE
router.delete('/:id', (req, res) => {
    console.log(req.params.id);
    const deleteIndex = Number(req.params.id);
    let queryText = 'DELETE FROM "todo" WHERE "id" = $1;';
    pool.query(queryText, [deleteIndex]).then((result) => {
        res.sendStatus(200);
    }).catch((error) => {
        console.log(`Error in DELETE ${error}`)
        res.sendStatus(500);
    })
})

module.exports = router;
