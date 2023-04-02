const express = require('express');
const router = express.Router();
const pool = require('../modules/pool.js');

// GET
router.get('/', (req,res) => {
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

// PUT

// DELETE

module.exports = router;
