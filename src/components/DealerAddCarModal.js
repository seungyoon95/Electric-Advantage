import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import "../pages/css/dealerAddCarModal.css";
import React from "react";
import {
  getMakeList,
  getModelListByMakeID,
  getVehicleListByMakeIDAndModelID,
  getColors,
} from "../api/VehicleAPI";
import CONDITION from "../constants/VehicleCondition";

const DealerAddCarModal = ({
  showModal,
  setShowModal,
  setCarsToAdd,
  carsToAdd,
}) => {
  const [carMake, setCarMake] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carPrice, setCarPrice] = React.useState("0");
  const [carQty, setQty] = React.useState("0");
  const [carColor, setColor] = React.useState(null);
  const [carCondition, setCarCondition] = React.useState(null);
  const [carID, setID] = React.useState("");
  const [carInfo, setInfo] = React.useState("");
  const [carImgs, setImgs] = React.useState("");

  const [makeList, setMakeList] = React.useState([]);
  const [modelList, setModelList] = React.useState([]);
  const [trimList, setTrimList] = React.useState([]);
  const [carVehicle, setCarVehicle] = React.useState("");
  const [colorList, setColorList] = React.useState([]);

  const [selectedMakeID, setSelectedMakeID] = React.useState("");
  const [selectedModelID, setSelectedModelID] = React.useState("");
  const [vehicleID, setVehicleID] = React.useState("");
  const [odo, setOdo] = React.useState("0");
  const [selectedCondition, setSelectedCondition] = React.useState("");
  const [selectedColorID, setSelectedColorID] = React.useState("");

  const resetAllFieldsHandler = () => {
    setSelectedMakeID("");
    setSelectedModelID("");
    setVehicleID("");
    setSelectedColorID("");
    setSelectedCondition("");
    setCarMake("");
    setCarModel("");
    setCarPrice("");
    setQty("");
    setColor("");
    setID("");
    setInfo("");
    setImgs("");
    setModelDisabled(true);
    setTrimDisabled(true);
  };

  React.useEffect(() => {
    getColorsList();
    onLoadGetMakeList();
  }, []);

  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}!\nThere are no makes to select.`);
    }
  }

  async function getModelList(makeID) {
    console.log(makeID);
    let resultModelList = await getModelListByMakeID(makeID);
    let statusCode = resultModelList.status;
    if (statusCode === 200) {
      let body = resultModelList.body;
      setModelList(body);
    } else {
      alert(`Status : ${statusCode}!\nThere will are no models to select.`);
      setModelList([]);
      setModelDisabled(true);
      setTrimDisabled(true);
    }
  }

  async function getVehiclesList(modelID) {
    let resultTrimList = await getVehicleListByMakeIDAndModelID(
      selectedMakeID,
      modelID
    );
    let statusCode = resultTrimList.status;
    if (statusCode === 200) {
      let body = resultTrimList.body;
      console.log("MakeID:" + selectedMakeID);
      console.log("ModelID:" + selectedModelID);
      console.log("Model:" + carModel);
      console.log("body:" + body[0].VehicleID);
      setCarVehicle(carModel + " " + body[0].Trim + " " + body[0].Year);
      setTrimList(body);
    } else {
      alert(`Status : ${statusCode}!\nThere will are no vehicles to select.`);
      setTrimDisabled(true);
    }
  }

  async function getColorsList() {
    let resultColorList = await getColors();
    let statusCode = resultColorList.status;
    if (statusCode === 200) {
      let body = resultColorList.body;
      console.log(body);
      setColorList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultColorList.error}.`);
    }
  }

  const [modelDisabled, setModelDisabled] = React.useState(true);
  const [trimDisabled, setTrimDisabled] = React.useState(true);

  // Check if the input field is empty.
  function isEmpty(str) {
    return str.length === 0 || !str.trim();
  }

  const addCarsHandler = () => {
    if (
      isEmpty(selectedMakeID) ||
      isEmpty(selectedModelID) ||
      isEmpty(vehicleID) ||
      isEmpty(odo) ||
      isEmpty(selectedCondition) ||
      isEmpty(selectedColorID)
    ) {
      alert("Fields cannot be empty");
    } else {
      setCarsToAdd([
        ...carsToAdd,
        {
          vehicleID: vehicleID,
          carMake: carMake,
          carVehicle: carVehicle,
          Odo: odo,
          Qty: carQty,
          carPrice: carPrice,
          carColor: carColor,
          info: carInfo,
          carCondition: selectedCondition,
          images: carImgs,
          carID: carID,
          colorID: selectedColorID,
        },
      ]);

      setShowModal(false);
      resetAllFieldsHandler();
    }
  };

  return (
    <Modal show={showModal} aria-label="Close">
      <Modal.Header>
        <Modal.Title>Add</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="carMake">
            <Form.Control
              onChange={(e) => {
                let index = e.target.selectedIndex;
                let label = e.target[index].text;
                setCarMake(label);
                setSelectedMakeID(e.target.value);
                getModelList(e.target.value);
                setSelectedModelID("");
                setVehicleID("");
                setTrimList([]);
              }}
              as="select"
              value={selectedMakeID}
            >
              <option disabled value="">
                Select Make...
              </option>
              {makeList.map((carMake) => (
                <option value={carMake.MakeID}>{carMake.MakeName}</option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="carModel">
            <Form.Control
              onChange={(e) => {
                let index = e.target.selectedIndex;
                let label = e.target[index].text;
                setCarModel(label);
                setSelectedModelID(e.target.value);
                setVehicleID("");
                getVehiclesList(e.target.value);
              }}
              as="select"
              disabled={selectedMakeID === ""}
              value={selectedModelID}
            >
              <option disabled value="">
                Select Model...
              </option>
              {modelList.map((carModel) => {
                return (
                  <option value={carModel.ModelID}>{carModel.ModelName}</option>
                );
              })}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="carTrim">
            <Form.Control
              onChange={(e) => {
                let index = e.target.selectedIndex;
                let label = e.target[index].text;
                setCarVehicle(label);
                setVehicleID(e.target.value);
              }}
              as="select"
              disabled={selectedModelID === ""}
              value={vehicleID}
            >
              <option disabled value="">
                Select Vehicle...
              </option>
              {trimList.map((vehicle) => (
                <option value={vehicle.VehicleID}>
                  {carModel + " " + vehicle.Trim + " " + vehicle.Year}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          {/* Condition */}
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                setSelectedCondition(e.target.value);
              }}
              as="select"
              value={selectedCondition}
            >
              <option disabled value="">
                Select Condition...
              </option>
              <option value={CONDITION.NEW}>New</option>
              <option value={CONDITION.USED}>Used</option>
            </Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              onChange={(e) => {
                let index = e.target.selectedIndex;
                let label = e.target[index].text;
                setColor(label);
                setSelectedColorID(e.target.value);
              }}
              as="select"
              value={selectedColorID}
            >
              <option disabled value="">
                Select Color...
              </option>
              {colorList.map((color) => (
                <option value={color.ColorID}>{color.ColorName}</option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Row>
          <Col>
            <div>
              Quantity:{" "}
              <input
                onChange={(e) => setQty(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Start Price:{" "}
              <input
                onChange={(e) => setCarPrice(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Odometer:{" "}
              <input
                disabled={selectedCondition !== "2"}
                onChange={(e) => setOdo(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
        </Row>
        <Form>
          <textarea
            onChange={(e) => setInfo(e.target.value)}
            placeholder="Additional Information..."
            className="detailsInput"
          ></textarea>
          <Form.File multiple className="fileInput"></Form.File>
        </Form>
        <Row></Row>
      </Modal.Body>
      <Modal.Footer className="footerButtons">
        <Button
          onClick={() => {
            setShowModal(false);
            resetAllFieldsHandler();
          }}
          className="footerButtons"
          variant="secondary"
        >
          Close
        </Button>
        <Button
          className="btn-success footerButtons"
          onClick={() => {
            {
              if (selectedCondition !== 2) {
                setOdo("0");
              }
            }
            addCarsHandler();
          }}
        >
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DealerAddCarModal;
