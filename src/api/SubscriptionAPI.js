import { database } from "../constants/Environment";

/**
 * Getting all available subscription plans
 * @returns plan objects array
 */
export async function getAllSubscriptionPlans() {
  try {
    console.log(`Retrieving all available subscription plans`);
    let url = `http://${database}:3000/subscriptions`;
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
 * Creating subscription plan to the database
 * @param {"PlanName": string,
 *         "Pricing": float,
 *         "BillingCyle": string} plan
 * @returns json object
 */
export async function createSubscriptionPlan(plan) {
  try {
    console.log(`Creating subscription plan...`);
    let url = `http://${database}:3000/subscriptions`;
    let response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(plan),
    });
    let json = await response.json();
    json["status"] = response.status;
    console.log(json.body);
    return json;
  } catch (error) {
    return false;
  }
}
