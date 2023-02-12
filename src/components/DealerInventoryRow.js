import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { XCircleFill } from "react-bootstrap-icons";
import { Button } from "react-bootstrap";
import { deleteItemByInventoryID } from "../api/DealershipAPI";

const InventoryRow = ({
  carModel,
  carMake,
  carTrim,
  carYear,
  carColor,
  carPrice,
  carCondition,
  Qty,
  editText,
  inventoryID,
  updateInventory,
  setInventoryToUpdate,
  inventoryToUpdate,
}) => {
  const [newPrice, setNewPrice] = React.useState(carPrice);
  const [newQuantity, setNewQuantity] = React.useState(Qty);

  async function onDeleteHandler() {
    let deleteResponse = await deleteItemByInventoryID(inventoryID);
    let deleteStatus = deleteResponse.status;
    if (deleteStatus == 200) {
      updateInventory();
    }
  }

  const updatePriceHandler = (e) => {
    console.log("0" + e.target.value);
    let findResult = inventoryToUpdate.find(
      (element) => element.inventoryID === inventoryID
    );
    if (findResult === undefined) {
      setInventoryToUpdate([
        ...inventoryToUpdate,
        {
          InventoryID: parseInt(inventoryID),
          StartPrice: parseFloat("0" + e.target.value),
          Quantity: parseInt(newQuantity),
        },
      ]);
      setNewPrice(e.target.value);
    } else {
      findResult.StartPrice = parseFloat("0" + e.target.value);
      findResult.Quantity = parseInt(newQuantity);
      setNewPrice(e.target.value);
    }
  };

  const updateQtyHandler = (e) => {
    let findResult = inventoryToUpdate.find(
      (element) => element.inventoryID === inventoryID
    );
    if (findResult === undefined) {
      setInventoryToUpdate([
        ...inventoryToUpdate,
        {
          InventoryID: parseInt(inventoryID),
          StartPrice: parseFloat(newPrice),
          Quantity: parseInt("0" + e.target.value),
        },
      ]);
      setNewQuantity(e.target.value);
    } else {
      findResult.StartPrice = parseFloat(newPrice);
      findResult.Quantity = parseInt("0" + e.target.value);
      setNewQuantity(e.target.value);
    }
  };

  return (
    <tr>
      <td>{carMake}</td>
      <td>{carModel}</td>
      <td>{carTrim}</td>
      <td>{carYear}</td>
      <td>{carColor}</td>
      <td>{carCondition}</td>
      <td>
        <text className={`${!editText ? "hiddenUntilEdit" : ""}`}>
          {carPrice}
        </text>
        <input
          onChange={(e) => {
            updatePriceHandler(e);
          }}
          type="text"
          className={`inputsCell ${editText ? "hiddenUntilEdit" : ""}`}
          placeholder={carPrice}
        ></input>
      </td>
      <td>
        <text className={`${!editText ? "hiddenUntilEdit" : ""}`}>{Qty}</text>
        <input
          onChange={(e) => {
            updateQtyHandler(e);
          }}
          type="text"
          className={`inputsCell ${editText ? "hiddenUntilEdit" : ""}`}
          placeholder={Qty}
        ></input>
      </td>
      <td className="lastColumn">
        <Button
          onClick={() => {
            onDeleteHandler();
          }}
          className="editIcon"
          variant="light"
        >
          <XCircleFill />
        </Button>
      </td>{" "}
      {/* <DealerEditCarModal
        rowCarModel={carModel}
        rowCarMake={carMake}
        rowCarTrim={carTrim}
        rowCarPrice={carPrice}
        rowCarQty={Qty}
        showModal={showModal}
        setShowModal={setShowModal}
      />  */}
    </tr>
  );
};

export default InventoryRow;
