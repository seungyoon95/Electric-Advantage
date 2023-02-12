import { database } from "../constants/Environment";

/**
 *
 * @param {string} makeID
 * @param {float} evRange
 * @param {float} startPrice
 * @param {int} conditionID
 * @param {float} lat
 * @param {float} lng
 * @returns array of vehicle inventory objects
 */
export async function getVehicleSearchResult(
  makeID,
  evRange,
  startPrice,
  conditionID,
  lat,
  lng
) {
  try {
    console.log(`Retrieving the vehicles in inventory.`);
    let url = `http://${database}:3000/inventories`;
    url += `?makeID=${makeID}`;
    url += `&evRange=${evRange}`;
    url += `&startPrice=${startPrice}`;
    url += `&conditionID=${conditionID}`;
    url += `&lat=${lat}`;
    url += `&lng=${lng}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Retrieves all inventory items those belong to specific dealership
 * @param {string} dealershipID
 * @returns inventory item objects array
 */
export async function getInventoryByDealershipID(dealershipID) {
  try {
    console.log(`Retrieving all inventory items belong to ${dealershipID}`);
    let url = `http://${database}:3000/dealerships/${dealershipID}/inventories`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Retrieves all dealership information
 * @returns dealership object array
 */
export async function getAllDealerships() {
  try {
    console.log(`Retrieving all dealership information`);
    let url = `http://${database}:3000/dealerships`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Add bulk of vehicles to inventory database.
 * @param {
 *        [{"VehicleID": string,
 *         "DealershipID": string,
 *         "ColorID": string,
 *         "ConditionID": int,
 *         "StartPrice": float,
 *         "Odometer": float,
 *         "Quantity" : int}]
 *        } vehicleArray
 * @returns message string
 */
export async function addInventoryItemToDealership(vehicleArray) {
  try {
    console.log(`Registering items to the dealership`);
    let url = `http://${database}:3000/inventories`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicleArray),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Get dealership information by userID (uid)
 * @param {string} userID
 * @returns dealership object
 */
export async function getDealershipByUserID(userID) {
  try {
    console.log(`Retrieving dealership with ${userID}`);
    let url = `http://${database}:3000/dealerships/${userID}`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update dealership information by DealershipID
 * @param {dealership object} dealership
 * @returns dealership object
 */
export async function updateDealershipByUserID(dealership) {
  try {
    let dealershipID = dealership.DealershipID;
    console.log(`Updating dealership with ${dealershipID}`);
    let url = `http://${database}:3000/dealerships/${dealershipID}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealership),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Delete inventory item with inventoryID
 * @param {int} inventoryID
 * @returns status message string
 */
export async function deleteItemByInventoryID(inventoryID) {
  try {
    console.log(`Deleting inventory with ${inventoryID}`);
    let url = `http://${database}:3000/inventories/${inventoryID}`;
    let response = await fetch(url, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}
/**
 * Register dealership
 * @param {"UserID" : string,
 *         "RegionCode": string,
 *         "GroupName": string,
 *         "StreetAddress": string,
 *         "City": string,
 *         "Province": string,
 *         "Zip": string,
 *         "Country": string,
 *         "Latitude": float,
 *         "Longitude": float,
 *         "SalesContact": string,
 *         "SalesEmail": string,
 *         "SalesPhone": string,
 *         "BillingContactName": string,
 *         "BillingPhone": string,
 *         "BillingEmail": string
 *       } dealership object
 * @returns status message string
 */
export async function registerDealership(dealership) {
  try {
    console.log(`Creating dealership with ${dealership.UserID}`);
    let url = `http://${database}:3000/dealerships`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dealership),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}

/**
 * Update dealership's inventory items (StartPrice, Quantity)
 * @param {[{"InventoryID": int,
 *         "StartPrice": float,
 *         "Quantity": int
 *       }]} inventories array
 * @param {int} dealershipID
 *
 * @returns status message string
 */
export async function updateDealershipInventoryItems(
  inventories,
  dealershipID
) {
  try {
    console.log(`Updating ${inventories.length} inventories entires`);
    let url = `http://${database}:3000/dealerships/${dealershipID}/inventories`;
    let response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(inventories),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}
