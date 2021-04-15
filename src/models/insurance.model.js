const query = require('../db/db-connection');
const fs = require("fs");
const { multipleColumnSet } = require('../utils/common.utils');
const Role = require('../utils/userRoles.utils');
const fastcsv = require("fast-csv");

class InsuranceModel {
    tableName = 'insurance';

    find = async (params = {}) => {
        let sql = `SELECT * FROM ${this.tableName}`;

        if (!Object.keys(params).length) {
            return await query(sql);
        }

        const { columnSet, values } = multipleColumnSet(params)
        sql += ` WHERE ${columnSet}`;

        return await query(sql, [...values]);
    }

    findOne = async (params) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `SELECT * FROM ${this.tableName}
        WHERE ${columnSet}`;

        const result = await query(sql, [...values]);

        // return back the first row (user)
        return result[0];
    }

    create = async ({ InsuranceNumber, TotalAmount, InsuranceEffectiveDate, InsuranceExpireDate, CreateDate, IsActive, AdditionalInfo, Country_ID }) => {
        const sql = `INSERT INTO ${this.tableName}
        ( InsuranceNumber, TotalAmount, InsuranceEffectiveDate, InsuranceExpireDate, CreateDate, IsActive, AdditionalInfo, Country_ID) VALUES (?,?,?,?,?,?,?,?)`;

        const result = await query(sql, [InsuranceNumber, TotalAmount, InsuranceEffectiveDate, InsuranceExpireDate, CreateDate, IsActive, AdditionalInfo, Country_ID]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    update = async (params, id) => {
        const { columnSet, values } = multipleColumnSet(params)

        const sql = `UPDATE user SET ${columnSet} WHERE id = ?`;

        const result = await query(sql, [...values, id]);

        return result;
    }

    delete = async (id) => {
        const sql = `DELETE FROM ${this.tableName}
        WHERE id = ?`;
        const result = await query(sql, [id]);
        const affectedRows = result ? result.affectedRows : 0;

        return affectedRows;
    }

    dumb = () => {
        const ws = fs.createWriteStream("insurance.csv");

        // let stream = fs.createReadStream("bezkoder.csv");
        // let csvData = [];
        return new Promise((resolve, reject) => {
            query("SELECT * FROM category", function (error, data, fields) {
                if (error) throw error;

                const jsonData = JSON.parse(JSON.stringify(data));
                console.log("jsonData", jsonData);

                fastcsv
                    .write(jsonData, { headers: true })
                    .on("finish", function () {
                        console.log("Write to bezkoder_mysql_fastcsv.csv successfully!");

                        resolve(jsonData)
                    })
                    .pipe(ws)
            });
        }).then(data => {
            return data;
        });
    }

    push = async () => {
        let stream = fs.createReadStream("insurance.csv");
        let csvData = [];
        let csvStream = fastcsv
            .parse()
            .on("data", function (data) {
                csvData.push(data);
            })
            .on("end", async function () {
                // remove the first line: header
                csvData.shift();

                // connect to the MySQL database
                // save csvData

                //     let command =
                //     `INSERT INTO category (id, name, description, created_at) values ?`;
                //   await query(command, [csvData], (error, response) => {
                //         console.log(error || response);
                //     });

                var mysql = require('mysql');

                const connection = mysql.createConnection({
                    host: process.env.HOST,
                    user: process.env.DB_USER,
                    password: process.env.DB_PASS,
                    database: process.env.DB_DATABASE,
                  });
              
                  // open the connection
                  connection.connect(error => {
                    if (error) {
                      console.error(error);
                    } else {
                      let query =
                        "INSERT INTO category (id, name, description, created_at) VALUES ?";
                      connection.query(query, [csvData], (error, response) => {
                        console.log(error || response);
                      });
                    }
                  });
            });

        stream.pipe(csvStream);
    }
}

module.exports = new InsuranceModel;