const conn = require('../config/db');

module.exports.insert = (req, res) => {
    let sql = 'INSERT INTO users_and_tags (user_id, tag_id) values (?, ?)';

    let user = req.body.user;

    conn.query(sql, [], (err, results) => {
        if (err) {
            console.log(err);
        } else {
            results = JSON.parse(JSON.stringify(results));
            res.json(results);
        }
    })
}