const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');
const md5 = require('md5');

// import { createConnection } from 'mysql';
// import { urlencoded, json } from 'body-parser';

const app = express();

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());
app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'MaheNag2794@.com',
    database: 'localarea',
})

connection.connect((err) => {
    if (err) {
        console.log(err);
    }
    else {
        console.log('connected');


        app.post('/login', (req, res) => {
            // console.log(req.body);
            const { id, email, password } = req.body;

            console.log(md5(password))

            const sql = `SELECT * FROM PERSON WHERE PERSON_ID='${id}'`;
            connection.query(sql, (err, result) => {
                if (result.length === 0) res.send('zero');
                else if (err) res.send('ERROR')
                else {
                    if (result[0].PASSWORD === md5(password) && result[0].EMAIL === email) {
                        console.log(result);
                        res.send(result)

                    }
                    else {
                        res.send('incorrect');
                    }
                }
                // res.send(result);
            })
        })

        // INCOMPLETE PID
        app.post('/register', (req, res) => {
            const { name, email, password } = req.body;
            var Pid = '';

            connection.query('SELECT MAX(PERSON_ID) AS MAX FROM PERSON', (err, result) => {
                if (err) res.send('ERROR')
                // console.log(result.MAX);
                console.log(result[0].MAX);
                // console.log(result[0]);

                var id = parseInt(result[0].MAX.toString().substring(1, 3));
                id = id + 1;

                if (id < 10) {
                    Pid = `P0${id}`
                }
                else {
                    Pid = `P${id}`
                }
                console.log(Pid);

                var pass = md5(password);

                const sql = `INSERT INTO PERSON(PERSON_ID,NAME,EMAIL,PASSWORD,ISADMIN) VALUES ('${Pid}','${name}','${email}','${pass}',${false})`;
                connection.query(sql, (err, result) => {
                    if (err) res.send('ERROR')
                    else
                        res.send(Pid);
                })

            })

        })

        app.post('/home', (req, res) => {

            const Pid = req.body.Pid;

            var sendingData = {};

            var sql = `SELECT * FROM PERSON WHERE PERSON_ID='${Pid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else {
                    sendingData['personalInfo'] = result;

                    sql = `SELECT S.*,SI.FROM_YEAR,SI.TO_YEAR,SI.FROM_STD,SI.TO_STD FROM SCHOOL S,STUDIED_IN SI WHERE SI.PID='${Pid}' AND SI.SID=S.SCHOOL_ID`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else {

                            sendingData['schoolInfo'] = result;

                            sql = `SELECT H.* FROM HOUSE H,PERSON P WHERE H.HOUSE_ID=P.HID AND P.PERSON_ID='${Pid}'`;
                            connection.query(sql, (err, result) => {
                                if (err) res.send('ERROR')
                                else {
                                    sendingData['houseInfo'] = result;

                                    sql = `SELECT H.*,C.DATE_OF_CONSULTING,C.FOR_PROBLEM FROM HOSPITAL H,CONSULTED C WHERE C.PID='${Pid}' AND H.HOSPITAL_ID=C.HID`;
                                    connection.query(sql, (err, result) => {
                                        if (err) res.send('ERROR')
                                        else {
                                            sendingData['hospitalInfo'] = result;

                                            sql = `SELECT B.*,A.ACCOUNT_NO FROM BANK B,ACCOUNT_IN A WHERE A.PID='${Pid}' AND A.BID=B.BANK_ID`;
                                            connection.query(sql, (err, result) => {
                                                if (err) res.send('ERROR')
                                                else {
                                                    sendingData['bankInfo'] = result;

                                                    sql = `SELECT * FROM HOUSE WHERE OWNER_ID='${Pid}'`;
                                                    connection.query(sql, (err, result) => {
                                                        if (err) res.send('ERROR')
                                                        else {
                                                            sendingData['houseOwnInfo'] = result;
                                                            res.send(sendingData);
                                                        }
                                                    })
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        })


        app.get('/banks', (req, res) => {
            connection.query('SELECT * FROM BANK', (err, result) => {
                if (err) res.send('ERROR');
                else
                    res.send(result);
            })
        })

        app.get('/schools', (req, res) => {
            connection.query('SELECT * FROM school', (err, result) => {
                if (err) res.send('ERROR');
                else
                    res.send(result);
            })
        })

        app.get('/hospitals', (req, res) => {
            connection.query('SELECT * FROM HOSPITAL', (err, result) => {
                if (err) res.send('ERROR');
                else
                    res.send(result);
            })
        })

        app.get('/persons', (req, res) => {
            connection.query('SELECT * FROM PERSON', (err, result) => {
                if (err) res.send('ERROR');
                else
                    res.send(result);
            })
        })

        app.get('/houses', (req, res) => {
            connection.query('SELECT * FROM HOUSE', (err, result) => {
                if (err) res.send('ERROR');
                else
                    res.send(result);
            })
        })

        app.post('/updatepersonalinfo', (req, res) => {
            const { Pid, name, email, sex, Bdate, salary } = req.body;
            sql = `UPDATE PERSON SET NAME='${name}',EMAIL='${email}',SEX='${sex}',BDATE='${Bdate}',SALARY=${salary} where PERSON_ID='${Pid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else {

                    connection.query(`SELECT * FROM PERSON WHERE PERSON_ID='${Pid}'`, (err, result) => {
                        if (err) res.send('ERROR');
                        else
                            res.send(result);
                    })
                }
            })
        })

        // app.post('/getpersonalinfo', (req, res) => {
        //     const { Pid } = req.body;
        //     sql = `SELECT * FROM PERSON WHERE PERSON_ID='${Pid}'`;
        //     connection.query(sql, (err, result) => {
        //         if (err) res.send('ERROR')
        //         res.send(result);
        //     })
        // })

        app.post('/schooladd', (req, res) => {
            const { Pid, school_id, from_std, to_std, from_year, to_year } = req.body;

            sql = `INSERT INTO STUDIED_IN VALUES('${Pid}','${school_id}',${from_year},${to_year},${from_std},${to_std})`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR');
                else {

                    sql = `SELECT S.*,SI.FROM_YEAR,SI.TO_YEAR,SI.FROM_STD,SI.TO_STD FROM SCHOOL S,STUDIED_IN SI WHERE SI.PID='${Pid}' AND SI.SID=S.SCHOOL_ID`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send(result);
                    })
                }
            })
        })

        app.post('/bankadd', (req, res) => {
            const { Pid, bank_id } = req.body;

            sql = `INSERT INTO ACCOUNT_IN VALUES('${Pid}','${bank_id}','${Pid + "" + bank_id}')`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else {

                    sql = `SELECT B.*,A.ACCOUNT_NO FROM BANK B,ACCOUNT_IN A WHERE A.PID='${Pid}' AND A.BID=B.BANK_ID`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send(result);
                    })
                }
            })
        })

        app.post('/hospitaladd', (req, res) => {
            const { Pid, hospital_id, date, for_problem } = req.body;

            sql = `INSERT INTO CONSULTED VALUES('${Pid}','${hospital_id}','${date}','${for_problem}')`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR');
                else {

                    sql = `SELECT H.*,C.DATE_OF_CONSULTING,C.FOR_PROBLEM FROM HOSPITAL H,CONSULTED C WHERE C.PID='${Pid}' AND H.HOSPITAL_ID=C.HID`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send(result)
                    })
                }
            })
        })

        app.post('/updatehouse', (req, res) => {
            const { Pid, house_id } = req.body;

            sql = `UPDATE PERSON SET HID='${house_id}' WHERE PERSON_ID='${Pid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR');
                else {

                    sql = `SELECT H.* FROM HOUSE H,PERSON P WHERE H.HOUSE_ID=P.HID AND P.PERSON_ID='${Pid}'`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else {
                            res.send(result)
                        }
                    })
                }
            })
        })

        app.post('/ownhouseadd', (req, res) => {
            const { Pid, house_id } = req.body;

            sql = `UPDATE HOUSE SET OWNER_ID='${Pid}' WHERE HOUSE_ID='${house_id}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR');

                else {

                    sql = `SELECT * FROM HOUSE WHERE OWNER_ID='${Pid}'`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send(result)
                    })
                }
            })

        })

        app.post('/deleteperson', (req, res) => {
            const { Pid } = req.body;

            sql = `DELETE FROM PERSON WHERE PERSON_ID='${Pid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR');
                else
                    res.send('deleted ok');
            })
        })

        app.post('/updateadmin', (req, res) => {
            const { Pid } = req.body;

            sql = `UPDATE PERSON SET ISADMIN=${1} WHERE PERSON_ID='${Pid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else
                    res.send('ok')
            })
        })

        app.post('/createbank', (req, res) => {
            const { name, address, IFSC } = req.body;

            var Bid = '';

            connection.query('SELECT MAX(BANK_ID) AS MAX FROM BANK', (err, result) => {
                if (err) res.send('ERROR')
                else {
                    var id = parseInt(result[0].MAX.toString().substring(1, 3));
                    id = id + 1;

                    if (id < 10) {
                        Bid = `B0${id}`
                    }
                    else {
                        Bid = `B${id}`
                    }

                    const sql = `INSERT INTO BANK VALUES ('${Bid}','${name}','${address}','${IFSC}')`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send('ok');
                    })
                }
            })

        })

        app.post('/deletebank', (req, res) => {
            const { Bid } = req.body;

            sql = `DELETE FROM BANK WHERE BANK_ID='${Bid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else
                    res.send('ok');
            })
        })

        app.post('/createhospital', (req, res) => {
            const { name, address, phone } = req.body;

            var Hid = '';

            connection.query('SELECT MAX(HOSPITAL_ID) AS MAX FROM HOSPITAL', (err, result) => {
                if (err) res.send('ERROR')

                else {
                    console.log(result);
                    var id = parseInt(result[0].MAX.toString().substring(1, 3));
                    id = id + 1;

                    if (id < 10) {
                        Hid = `H0${id}`
                    }
                    else {
                        Hid = `H${id}`
                    }

                    const sql = `INSERT INTO HOSPITAL VALUES ('${Hid}','${name}','${address}','${phone}')`;
                    connection.query(sql, (err, result) => {
                        console.log(result);
                        if (err) res.send('ERROR')
                        else
                            res.send('ok');
                    })
                }
            })

        })

        app.post('/deletehospital', (req, res) => {
            const { Hid } = req.body;

            sql = `DELETE FROM HOSPITAL WHERE HOSPITAL_ID='${Hid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else
                    res.send('ok');
            })
        })

        app.post('/createhouse', (req, res) => {
            const { name, address, rent, BHK } = req.body;

            var Hid = '';

            connection.query('SELECT MAX(HOUSE_ID) AS MAX FROM HOUSE', (err, result) => {
                if (err) res.send('ERROR')
                else {


                    var id = parseInt(result[0].MAX.toString().substring(2, 4));
                    id = id + 1;

                    if (id < 10) {
                        Hid = `HH0${id}`
                    }
                    else {
                        Hid = `HH${id}`
                    }

                    const sql = `INSERT INTO HOUSE (HOUSE_ID,NAME,ADDRESS,RENT,BHK) VALUES ('${Hid}','${name}','${address}','${rent}','${BHK}')`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send('ok');
                    })
                }

            })

        })

        app.post('/deletehouse', (req, res) => {
            const { Hid } = req.body;

            sql = `DELETE FROM HOUSE WHERE HOUSE_ID='${Hid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else
                    res.send('ok');
            })
        })

        app.post('/createschool', (req, res) => {
            const { name, address, phone } = req.body;

            var Sid = '';

            connection.query('SELECT MAX(SCHOOL_ID) AS MAX FROM SCHOOL', (err, result) => {
                if (err) res.send('ERROR')

                else {

                    var id = parseInt(result[0].MAX.toString().substring(1, 3));
                    id = id + 1;

                    if (id < 10) {
                        Sid = `S0${id}`
                    }
                    else {
                        Sid = `S${id}`
                    }

                    const sql = `INSERT INTO SCHOOL VALUES ('${Sid}','${name}','${phone}','${address}')`;
                    connection.query(sql, (err, result) => {
                        if (err) res.send('ERROR')
                        else
                            res.send('ok');
                    })

                }
            })

        })

        app.post('/deleteschool', (req, res) => {
            const { Sid } = req.body;

            sql = `DELETE FROM SCHOOL WHERE SCHOOL_ID='${Sid}'`;
            connection.query(sql, (err, result) => {
                if (err) res.send('ERROR')
                else
                    res.send('ok');
            })
        })


    }
})

app.listen(4000, () => {
    console.log('server running on port 4000');
})