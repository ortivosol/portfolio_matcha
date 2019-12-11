const mail = require('./mail');

const conn = require('../config/db');

module.exports.select = (req, res) => {
    const sql_select_user = 'SELECT `from` as data FROM likes WHERE `to` = ?';
    const sql_select_other = 'SELECT `to` as data FROM likes WHERE `from` = ?';
    const sql_select_both = 'SELECT id, first_name, last_name, picture1 FROM users WHERE id IN (SELECT `to` FROM likes WHERE `from` = ? AND `to` IN (SELECT `from` FROM likes WHERE `to` = ?))';

    const userId = req.session.userId;
    const type = req.query.type;

    if (type === 'follow') {
        let temp = {
            user: [],
            other: []
        };

        conn.query(sql_select_user, [userId], (err, results) => {
            if (err) {
                console.log(err);
            } else {
                results = JSON.parse(JSON.stringify(results));
                for (let i = 0; i < results.length; i++) {
                    results[i] = Object.values(results[i]);
                } for (let i = 0; i < results.length; i++) {
                    temp.user = temp.user.concat(results[i]);
                }
    
                conn.query(sql_select_other, [userId], (err, results) => {
                    if (err) {
                        console.log(err);
                    } else {
                        results = JSON.parse(JSON.stringify(results));
                        for (let i = 0; i < results.length; i++) {
                            results[i] = Object.values(results[i]);
                        } for (let i = 0; i < results.length; i++) {
                            temp.other = temp.other.concat(results[i]);
                        }
                        res.json(temp);
                    }
                })
            }
        })
    } else if (type === 'chat') {
        conn.query(sql_select_both, [userId, userId], (err, results) => {
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

module.exports.insert = (req, res) => {
    const sql = 'INSERT INTO likes (`from`, `to`) values (?, ?)';

    const userId = req.session.userId;
    const to = req.body.to;

    conn.query(sql, [userId, to], (err) => {
        if (err) {
            console.log(err);
            res.json(0);
        } else {
            const sql_select_to = 'SELECT email FROM users WHERE id = ?';

            conn.query(sql_select_to, [to], (err, results) => {
                if (err) {
                    console.log(err);
                    res.json(0);
                } else {
                    results = JSON.parse(JSON.stringify(results));
                    mail.notification('like', userId, results[0].email);
                    res.json(1);
                }
            })
        }
    })
}

//

module.exports.update = (req, res) => {
    const sql = 'UPDATE likes SET checked = 1 WHERE id = ?';

    const id = req.body.id;

    conn.query(sql, [id], (err) => {
        if (err) {
            console.log(err);
            res.json(0);
        } else {
            res.json(1);
        }
    })
}

//

module.exports.delete = (req, res) => {
    const sql = 'DELETE FROM likes WHERE id = ?';

    const id = req.body.id;

    conn.query(sql, [id], (err) => {
        if (err) {
            console.log(err);
            res.json(0);
        } else {
            res.json(1);
        }
    })
}