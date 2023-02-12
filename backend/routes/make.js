var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET makes listing.
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    WHERE 1=1
    `;
    var parameters = ["ea_db.vehicle_make"];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ error: "Makes could not be retrieved" });
      }
    });
  });
});

// GET all models of a make
router.get("/:makeID/models", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    WHERE 1=1
    AND MakeID = ?
    `;
    var parameters = ["ea_db.vehicle_model", req.params.makeID];
    sql = mysql.format(sql, parameters);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ error: "Models could not be retrieved" });
      }
    });
  });
});

// POST model from the specific make
router.post("/:makeID/models", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var model = req.body;
    model["MakeID"] = req.params.makeID;
    var sql = `
    INSERT INTO ea_db.vehicle_model 
    SET ?
    `;
    sql = mysql.format(sql, model);
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
          body: `Model Created with ID: ${model.ModelID}`,
        });
      }
    });
  });
});

// GET all vehicles of a model
router.get("/:makeID/models/:modelID", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    var sql = `
    SELECT *
    FROM ??
    WHERE 1=1
    AND ModelID = ?
    `;
    var parameters = ["ea_db.vehicle", req.params.modelID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ error: "Vehicles could not be retrieved" });
      }
    });
  });
});

// POST make (Add Make)
router.post("/", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var make = req.body;
    var sql = `
    INSERT INTO ea_db.vehicle_make 
    SET ?
    `;
    sql = mysql.format(sql, make);
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
          body: `Make Created with ID: ${make.MakeID}`,
        });
      }
    });
  });
});

// DELETE make with MakeID
router.delete("/:makeID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var makeID = req.params.makeID;
    var sql = `
    DELETE 
    FROM ?? 
    WHERE 1=1
    AND MakeID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle_make", makeID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Make with ID: ${makeID} deleted.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Make with ID: ${makeID} could not be found` });
      }
    });
  });
});
// PUT make with MakeID
router.put("/:makeID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var makeID = req.params.makeID;
    var makeObj = req.body;
    var sql = `
    UPDATE ?? 
    SET ?
    WHERE 1=1
    AND MakeID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle_make", makeObj, makeID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Make with ID: ${makeID} updated.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Make with ID: ${makeID} could not be found` });
      }
    });
  });
});

// DELETE modelID and makeID
router.delete("/:makeID/models/:modelID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var makeID = req.params.makeID;
    var modelID = req.params.modelID;
    var sql = `
    DELETE 
    FROM ?? 
    WHERE 1=1
    AND MakeID = ?
    AND ModelID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle_model", makeID, modelID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Model with ID: ${modelID} deleted.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Model with ID: ${modelID} could not be found` });
      }
    });
  });
});

// PUT modelID and makeID
router.put("/:makeID/models/:modelID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var makeID = req.params.makeID;
    var modelID = req.params.modelID;
    var modelObj = req.body;
    var sql = `
    UPDATE ?? 
    SET ?
    WHERE 1=1
    AND MakeID = ?
    AND ModelID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle_model", modelObj, makeID, modelID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Model with ID: ${modelID} updated.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Model with ID: ${modelID} could not be found` });
      }
    });
  });
});

module.exports = router;
