import React from "react";
import { NavLink } from "react-router-dom";

const DealerMenu = () => {
  const activeStyle = {
    color: "green",
    fontSize: "2rem",
  };

  return (
    <div>
      <ul>
        <li>
          <NavLink exact to="/inventory" activeStyle={activeStyle}>
            Inventory
          </NavLink>
        </li>
        <li>
          <NavLink to="/subscription" activeStyle={activeStyle}>
            Subscription
          </NavLink>
        </li>
        <li>
          <NavLink to="/accountInfo" activeStyle={activeStyle}>
            Account Info
          </NavLink>
        </li>
      </ul>
      <hr />
    </div>
  );
};

export default DealerMenu;
