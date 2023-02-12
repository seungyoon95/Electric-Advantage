var express = require("express");
var router = express.Router();
var pool = require("../database").pool;
var mysql = require("../database").mysql;

// GET vehicles in inventory.
// TODO: join with inventory image to retrieve images
router.get("/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected

    let makeID = req.query.makeID;
    let evRange = req.query.evRange;
    let startPrice = req.query.startPrice;
    let conditionID = req.query.conditionID;
    let lat = req.query.lat;
    let lng = req.query.lng;

    const kmFactor = 6373;
    const mileFactor = 3959;
    const defaultRadius = 50;
    const defaultNumResult = 20;
    var sql = `
    SELECT * , (
      ${kmFactor} * acos (
        cos ( radians(${lat}) )
        * cos( radians( Latitude ) )
        * cos( radians( Longitude ) - radians(${lng}) )
        + sin ( radians(${lat}) )
        * sin( radians( Latitude ) )
      )
    ) AS Distance
    FROM (SELECT VehicleID, EVRange, BatterySize, Trim, 
      Year, vehicle.ModelID, ModelName, vehicle_model.MakeID, MakeName
          FROM ea_db.vehicle 
          JOIN ea_db.vehicle_model 
            ON vehicle.ModelID = vehicle_model.ModelID
          JOIN ea_db.vehicle_make
            ON vehicle_model.MakeID = vehicle_make.MakeID
          ) AS vehicle
    JOIN ea_db.vehicle_inventory 
      ON vehicle.VehicleID = vehicle_inventory.VehicleID
    JOIN ea_db.color
      ON vehicle_inventory.ColorID = color.ColorID
    JOIN (SELECT DealershipID, Latitude, Longitude
      FROM ea_db.dealership) as dealership
      ON vehicle_inventory.DealershipID = dealership.DealershipID
    WHERE 1=1
    `;

    if (makeID && makeID != 0) {
      sql += ` AND MakeID='${makeID}'`;
    }
    if (evRange) {
      sql += ` AND EVRange < ${evRange}`;
    }
    if (startPrice) {
      sql += ` AND StartPrice < ${startPrice}`;
    }
    if (conditionID && conditionID != 0) {
      sql += ` AND ConditionID = ${conditionID}`;
    }

    sql += `
    HAVING Distance < ${defaultRadius}
    ORDER BY Distance
    LIMIT 0 , ${defaultNumResult};`;
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.length > 0) {
        res.status(200).send({ body: results });
      } else {
        res.status(404).send({ error: "Vehicles not found" });
      }
    });
  });
});

// GET inventories by InventoryID
router.get("/:inventoryID/", function (req, res, next) {
  pool.getConnection(function (err, connection) {
    if (err) throw err; // When not connected
    let inventoryID = req.params.inventoryID;
    var sql = `
      SELECT InventoryID, vehicle_inventory.VehicleID, MakeName, ModelName, EVRange,
      ColorName, Trim, StartPrice, Odometer, Quantity, vehicle_inventory.DealershipID, 
      RegionCode, GroupName, StreetAddress, City, Province, Zip, Country, 
      SalesContact, SalesEmail, SalesPhone
      FROM ??
      JOIN ea_db.dealership
        ON dealership.DealershipID = vehicle_inventory.DealershipID
      JOIN ea_db.vehicle
        ON vehicle.VehicleID = vehicle_inventory.VehicleID
      JOIN ea_db.vehicle_condition
        ON vehicle_condition.ConditionID = vehicle_inventory.ConditionID
      JOIN ea_db.color
        ON color.ColorID = vehicle_inventory.ColorID
      JOIN ea_db.vehicle_model
        ON vehicle.ModelID = vehicle_model.ModelID
      JOIN ea_db.vehicle_make
        ON vehicle_model.MakeID = vehicle_make.MakeID
      WHERE 1=1
      AND InventoryID=?
    ;
    `;
    var parameters = ["ea_db.vehicle_inventory", inventoryID];
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
          error: `Inventory items with ${inventoryID} cannot be retrieved`,
        });
      }
    });
  });
});

// POST multiple inventory items
router.post("/", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    // not connected!
    if (err) {
      console.error(err);
      res.status(500).send({
        error: "Database Error",
      });
    }

    var data = req.body;
    if (data.length > 0) {
      const dataArr = data.map((item) => [
        item.VehicleID,
        item.DealershipID,
        item.ColorID,
        item.ConditionID,
        item.StartPrice,
        item.Odometer,
        item.Quantity,
      ]);
      var sql = `
      INSERT INTO ea_db.vehicle_inventory (
        VehicleID,
        DealershipID,
        ColorID ,
        ConditionID ,
        StartPrice,
        Odometer,
        Quantity
      )
      VALUES ?
      `;
      connection.query(sql, [dataArr], function (error, results, fields) {
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
            body: `${results.affectedRows} items added`,
          });
        }
      });
    } else {
      connection.release();
      res.status(400).send({
        error: "Bad request",
      });
    }
  });
});

// DELETE inventory item from the database by InventoryID
router.delete("/:inventoryID", function (req, res, next) {
  // Connecting to the database.
  pool.getConnection(function (err, connection) {
    if (err) throw err; // not connected!
    var inventoryID = req.params.inventoryID;
    var sql = `
    DELETE 
    FROM ?? 
    WHERE 1=1
    AND InventoryID = ?
    ;
    `;
    var parameters = ["ea_db.vehicle_inventory", inventoryID];
    sql = mysql.format(sql, parameters);
    console.log(sql);
    connection.query(sql, function (error, results, fields) {
      connection.release();
      if (error) {
        console.log(error);
        res.status(500).send({ error: "Database Error" });
      } else if (results.affectedRows > 0) {
        res.status(200).send({
          body: `Item with ID: ${inventoryID} deleted.`,
        });
      } else {
        res
          .status(404)
          .send({ error: `Item with ID: ${inventoryID} could not be found` });
      }
    });
  });
});

module.exports = router;
