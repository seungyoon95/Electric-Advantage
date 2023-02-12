import { database } from "../constants/Environment";

/**
 * Retrieves list of regions objects
 * @returns region objects array
 */
export async function getRegionsList() {
  try {
    console.log(`Retrieving all the regions`);
    let url = `http://${database}:3000/regions`;
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
 * Retrieves list of daily countings
 * @returns counting objects array
 */
export async function getCountingsList() {
  try {
    console.log(`Retrieving last 24 hours counting`);
    let url = `http://${database}:3000/countings`;
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
 * Retrieves list of dealership inventory counts in specific region
 * @returns counting objects array
 */
export async function getDealershipsInventoryCountingsByRegion(regionCode) {
  try {
    console.log(
      `Retrieving dealerships inventory counts in region ${regionCode}`
    );
    let url = `http://${database}:3000/regions/${regionCode}/dealerships/inventory-countings`;
    let response = await fetch(url);
    let json = await response.json();
    json["status"] = response.status;
    console.log(`Retrieved ${JSON.stringify(json.body, null, 4)}`);
    return json;
  } catch (error) {
    console.log(error);
  }
}
