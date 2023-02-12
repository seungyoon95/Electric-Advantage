var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET users listing.
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    `;
    var parameters = ["ea_db.vehicle"];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Vehicles could not be retrieved" });
      }
    });
  });
});

// POST vehicle to database that could be used by the dealership
router.post("/", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var vehicle = req.body;
    var sql = `
    INSERT INTO ea_db.vehicle 
    SET ?
    `;
    sql = mysql.format(sql, vehicle);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.error(error);
        if (error.code == "ER_DUP_ENTRY") {
          res.status(400).send({
            error: error.sqlMessage,
          });
        } else {
          res.status(500).send({ error: "Database Error" });
        }
      } else if (results.affectedRows > 0) {
        res.status(201).send({
          body: `Vehicle Created with ID: ${vehicle.VehicleID}`,
        });
      }
    });
  });
});

// DELETE vehicle from the database by VehicleID
router.delete("/:vehicleID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var vehicleID = req.params.vehicleID;
    var sql = `
    DELETE 
    FROM ?? 
    WHERE 1=1
    AND VehicleID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle", vehicleID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Vehicle with ID: ${vehicleID} deleted.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Vehicle with ID: ${vehicleID} could not be found` });
      }
    });
  });
});

// PATCH vehicle's attibutes to VehicleID specific
router.patch("/:vehicleID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var vehicleID = req.params.vehicleID;
    var data = req.body;
    var sql = `
    UPDATE ?? 
    SET 
      EVRange = '${data.EVRange}', 
      BatterySize = '${data.BatterySize}', 
      Trim = '${data.Trim}', 
      Year = ${data.Year}, 
      ModelID = '${data.ModelID}'  
    WHERE 1=1
    AND VehicleID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle", vehicleID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Vehicle with ID: ${vehicleID} updated.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Vehicle with ID: ${vehicleID} could not be found` });
      }
    });
  });
});

module.exports = router;
