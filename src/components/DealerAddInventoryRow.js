import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { XCircleFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";

const DealerAddInventoryRow = ({
  carMake,
  carVehicle,
  Odo,
  carPrice,
  Qty,
  carColor,
  car,
  carsToAdd,
  carCondition,
  setCarsToAdd,
}) => {
  const deleteHandler = (e) => {
    setCarsToAdd(carsToAdd.filter((row) => row !== car));
  };
  return (
    <tr>
      <td>{carMake}</td>
      <td>{carVehicle}</td>
      <td>{carPrice}</td>
      <td>{Odo}</td>
      <td>{Qty}</td>
      <td>{carColor}</td>
      <td>{carCondition === "1" ? "New" : "Used"}</td>
      <td className="lastColumn">
        <div className="deleteRow">
          <Button
            onClick={deleteHandler}
            variant="light"
            className="edt-dlt-buttons"
          >
            <XCircleFill />
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default DealerAddInventoryRow;
