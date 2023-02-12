import React from "react";
import { NavLink } from "react-router-dom";

// Styling for admin menu.
const adminMenu = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  // List of menu items for the admin page.
  const SubMenu = () => {
    return (
      <ul>
        <li>
          {/* Vehicles menu. */}
          <NavLink exact to="/adminVehicle" activeStyle={activeStyle}>
            Vehicles
          </NavLink>
        </li>
        <li>
          {/* Dealers menu. */}
          <NavLink exact to="/adminDealer" activeStyle={activeStyle}>
            Dealers
          </NavLink>
        </li>
        <li>
          {/* Subscriptions menu. */}
          <NavLink exact to="/adminSub" activeStyle={activeStyle}>
            Subscriptions
          </NavLink>
        </li>
        <li>
          {/* Register Dealership menu. */}
          <NavLink exact to="/registerdealership" activeStyle={activeStyle}>
            Register Dealership
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <div>
      <hr />
      <SubMenu />
      <hr />
    </div>
  );
};

export default adminMenu;
