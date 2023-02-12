import { database } from "../constants/Environment";

/**
 * Get make list
 * @returns Make objects array
 */
export async function getMakeList() {
  try {
    console.log(`Retrieving all the makes`);
    let url = `http://${database}:3000/makes`;
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
 *
 * @param {"MakeID": string,
 *         "MakeName": string} make
 * @returns json object
 */
export async function registerMake(make) {
  try {
    console.log(`Registering make with ID: ${make.makeID}`);
    let url = `http://${database}:3000/makes`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(make),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    return false;
  }
}

/**
 * Retrieves model list belongs to specific MakeID
 * @param {string} makeID
 * @returns Model objects array
 */
export async function getModelListByMakeID(makeID) {
  try {
    console.log(`Retrieving all the models belongs to ${makeID}`);
    let url = `http://${database}:3000/makes/${makeID}/models`;
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
 * Retrieves all model lists existing in database
 * @returns Model objects array
 */
export async function getModelsList() {
  try {
    console.log(`Retrieving all the models`);
    let url = `http://${database}:3000/models`;
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
 * Register model with makeID
 * @param {"ModelID": string,
 *         "ModelName": string} model
 * @returns message string
 */
export async function registerModelWithMakeID(model, makeID) {
  try {
    console.log(`Registering a new model to MakeID: ${makeID}`);
    let url = `http://${database}:3000/makes/${makeID}/models`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(model),
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
 * Retrieves list of vehicle that belongs to specific model
 * @param {string} makeID
 * @param {string} modelID
 * @returns vehicle object array
 */
export async function getVehicleListByMakeIDAndModelID(makeID, modelID) {
  try {
    console.log(`Retrieving all the vehicles belongs to ${modelID}`);
    let url = `http://${database}:3000/makes/${makeID}/models/${modelID}`;
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
 * Retrieves all available colors in the database
 * @returns color objects array
 */
export async function getColors() {
  try {
    console.log(`Retrieving all available colors`);
    let url = `http://${database}:3000/colors`;
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
 * Retrieves all available vehicles in the database
 * @returns
 */
export async function getAllAvailableVehicles() {
  try {
    console.log(`Retrieving all available vehicles`);
    let url = `http://${database}:3000/vehicles`;
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
 * Add vehicle to the database.
 * @param {"VehicleID": string,
 *        "EVRange" : float,
 *        "BatterySize" : float,
 *        "Trim" : string,
 *        "Year" : int,
 *        "ModelID" : int} vehicle
 * @returns string message
 */
export async function registerVehicleToDatabase(vehicle) {
  try {
    console.log(`Registering vehicle to the database`);
    let url = `http://${database}:3000/vehicles`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
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
 * Delete available vehicle found with VehicleID.
 * @param {string} vehicleID
 * @returns message string
 */
export async function deleteVehicleByID(vehicleID) {
  try {
    console.log(`Deleting vehicle from the database`);
    let url = `http://${database}:3000/vehicles/${vehicleID}`;
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
 * Updates the vehicle's attribute found with VehicleID.
 * @param {"VehicleID" : string,
 *         "EVRange" : float,
 *         "BatterySize" : float,
 *         "Trim" : string,
 *         "Year" : int,
 *         "ModelID" : int
 *        } vehicle
 * @returns message string
 */
export async function updateVehicleByID(vehicle) {
  try {
    console.log(
      `Updating vehicle with ID: ${vehicle.VehicleID} from the database`
    );
    let url = `http://${database}:3000/vehicles/${vehicle.VehicleID}`;
    let response = await fetch(url, {
      method: "PATCH",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(vehicle),
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
 * Retrieves inventory item by inventoryID
 * @returns inventory object
 */
export async function getInventoryByInventoryID(inventoryID) {
  try {
    console.log(`Retrieving inventory item with ${inventoryID}`);
    let url = `http://${database}:3000/inventories/${inventoryID}`;
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
 * Delete vehicle make found with makeID
 * @param {string} makeID
 * @returns message string
 */
export async function deleteVehicleMake(makeID) {
  try {
    console.log(`Deleting make with ID: ${makeID} from the database`);
    let url = `http://${database}:3000/makes/${makeID}`;
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
 * Delete vehicle model found with model and make id
 * @param {string} makeID
 * @param {string} modelID
 * @returns message string
 */
export async function deleteVehicleModel(makeID, modelID) {
  try {
    console.log(`Deleting model with ID: ${modelID} from the database`);
    let url = `http://${database}:3000/makes/${makeID}/models/${modelID}`;
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
 * Updates vehicle make with make Object found by MakeID
 * @param {string} makeID to find
 * @param {
 *          "MakeID" : string,
 *          "MakeName" : string
 *        } makeObj with desired updating values
 * @returns message string
 */
export async function updateVehicleMake(makeID, makeObj) {
  try {
    console.log(`Updating make with ID: ${makeID} from the database`);
    let url = `http://${database}:3000/makes/${makeID}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(makeObj),
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
 * Updates vehicle model with modelObject found by MakeID and ModelID
 * @param {string} makeID to find
 * @param {string} modelID to find
 * @param {
 *          "ModelID" : string,
 *          "MakeID" : string,
 *          "ModelName" : string
 *        } modelObj with desired updating values
 * @returns message string
 */
export async function updateVehicleModel(makeID, modelID, modelObj) {
  try {
    console.log(`Updating model with ID: ${modelID} from the database`);
    let url = `http://${database}:3000/makes/${makeID}/models/${modelID}`;
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(modelObj),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    console.log(error);
  }
}
