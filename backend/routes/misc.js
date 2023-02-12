var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET users listing.
router.get("/colors", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    `;
    var parameters = ["ea_db.color"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Colors could not be retrieved" });
      }
    });
  });
});

// GET all model listing.
router.get("/models", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    JOIN ea_db.vehicle_make
      ON vehicle_model.MakeID = vehicle_make.MakeID
    `;
    var parameters = ["ea_db.vehicle_model"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Models could not be retrieved" });
      }
    });
  });
});

// GET regions listing.
router.get("/regions", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    `;
    var parameters = ["ea_db.region"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Regions could not be retrieved" });
      }
    });
  });
});

// GET counting list.
router.get("/countings", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT * 
    FROM ??
    JOIN (SELECT RegionCode, RegionName 
          FROM ea_db.region) AS region
      ON region.RegionCode = vehicle_count.RegionCode
    WHERE CountDate >= NOW() - INTERVAL 1 DAY
    `;
    var parameters = ["ea_db.vehicle_count"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ body: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ body: "Countings list could not be retrieved" });
      }
    });
  });
});

// GET inventories counts by regionID
router.get(
  "/regions/:regionCode/dealerships/inventory-countings",
  function (req, res, next) {
    pool.getConnection(function (err, connection) {
      if (err) throw err; // When not connected
      let regionCode = req.params.regionCode;
      var sql = `
      SELECT vehicle_inventory.DealershipID, GroupName, COUNT(*) AS InventoryCount
      FROM ??
      JOIN ea_db.vehicle_inventory
        ON dealership.DealershipID = vehicle_inventory.DealershipID
      WHERE RegionCode = ?
      GROUP BY vehicle_inventory.DealershipID
    ;
    `;
      var parameters = ["ea_db.dealership", regionCode];
      sql = mysql.format(sql, parameters);
      connection.query(sql, function (error, results, fields) {
        connection.release();
        if (error) {
          console.log(error);
          res.status(500).send({ error: "Database Error" });
        } else if (results.length > 0) {
          res.status(200).send({ body: results });
        } else {
          res.status(404).send({
            error: `Dealership inventory counts within region ${regionCode} cannot be retrieved`,
          });
        }
      });
    });
  }
);

module.exports = router;
