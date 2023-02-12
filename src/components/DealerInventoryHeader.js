import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import { ChevronExpand } from "react-bootstrap-icons";

const InventoryHeader = ({ headerName, sortHandler }) => {
  return (
    <th className="tableHeaders">
      {headerName}{" "}
      <Button variant="light" className="headerButtons" onClick={sortHandler}>
        <ChevronExpand />
      </Button>
    </th>
  );
};

export default InventoryHeader;
