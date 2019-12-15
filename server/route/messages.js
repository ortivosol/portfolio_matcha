const conn = require('../config/db');

//

module.exports.insert = (from, to, content, callback) => {
    const sql = 'INSERT INTO messages (`from`, `to`, content) values (?, ?, ?)';

    conn.query(sql, [from, to, content], (err) => {
        if (err) {
            console.log(err);
            callback(0);
        } else {
            callback(1);
        }
    })
}

//

module.exports.select = (req, res) => {
    const sql = 'SELECT content AS messages, DATE_FORMAT(time, "%Y-%m-%d %k:%i:%s") AS time , direction FROM (SELECT content, time, 1 AS direction FROM messages WHERE `from` = ? AND `to` = ? UNION SELECT content, time, 0 AS direction FROM messages WHERE `to` = ? AND `from` = ?) results ORDER BY time';

    const userId = req.session.userId;
    const to = req.query.to;

    if (data.type === 'all') {
        conn.query(sql, [userId, to, userId, to], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                results = JSON.parse(JSON.stringify(results));
                res.json(results);
            }
        })
    }
}

//

module.exports.update = (req, res) => {
    const sql = 'UPDATE messages SET checked = 1 WHERE `from` = ? AND `to` = ? AND content = ?';

    const userId = req.session.userId;
    const data = req.body;

    conn.query(sql, [userId, data.to, data.content], (err) => {
        if (err) {
            console.log(err);
            res.json(0);
        } else {
            res.json(1);
        }
    })
}