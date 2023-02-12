import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import "../pages/css/dealerAddCarModal.css";
import React from "react";
import {
  getMakeList,
  getModelListByMakeID,
  getVehicleListByMakeIDAndModelID,
} from "../api/VehicleAPI";

const DealerEditCarModal = ({
  showModal,
  setShowModal,
  rowCarMake,
  rowCarModel,
  rowCarPrice,
  rowCarTrim,
  rowCarQty,
}) => {
  const [carMake, setCarMake] = React.useState("");
  const [carModel, setCarModel] = React.useState("");
  const [carTrim, setCarTrim] = React.useState("");
  const [carPrice, setCarPrice] = React.useState("");
  const [carQty, setQty] = React.useState("");
  const [carColor, setColor] = React.useState("");
  const [carID, setID] = React.useState("");
  const [carInfo, setInfo] = React.useState("");
  const [carImgs, setImgs] = React.useState("");
  const [makeList, setMakeList] = React.useState([]);
  const [selectedMake, setSelectedMake] = React.useState("1");
  const [modelList, setModelList] = React.useState([]);
  const [selectedModel, setSelectedModel] = React.useState("1");
  const [trimList, setTrimList] = React.useState([]);

  const resetAllFieldsHandler = () => {
    setCarMake({ carMake });
    setCarModel({ carModel });
    setCarTrim({ carTrim });
    setCarPrice({ carPrice });
    setQty({ carQty });
    setColor("");
    setID("");
    setInfo("");
    setImgs("");
    setModelDisabled(true);
    setTrimDisabled(true);
  };

  React.useEffect(() => {
    onLoadGetMakeList();
    getModelList();
  }, []);

  React.useEffect(() => {
    getModelList();
  }, selectedMake);

  React.useEffect(() => {
    getTrimList();
  }, selectedModel);

  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      console.log(body);
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  async function getModelList() {
    let resultModelList = await getModelListByMakeID(selectedMake);
    let statusCode = resultModelList.status;
    if (statusCode === 200) {
      let body = resultModelList.body;
      console.log(body);
      setModelList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultModelList.error}`);
    }
  }

  async function getTrimList() {
    let resultTrimList = await getVehicleListByMakeIDAndModelID(
      selectedMake,
      selectedModel
    );
    let statusCode = resultTrimList.status;
    if (statusCode === 200) {
      let body = resultTrimList.body;
      console.log(body);
      setTrimList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultTrimList.error}`);
    }
  }

  const [modelDisabled, setModelDisabled] = React.useState(true);
  const [trimDisabled, setTrimDisabled] = React.useState(true);

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
                let carMakeObject = JSON.parse(e.target.value);
                setCarMake(carMakeObject.MakeName);
                setModelDisabled(false);
                setSelectedMake(carMakeObject.MakeID);
              }}
              as="select"
            >
              <option disabled selected>
                {rowCarMake}
              </option>
              {makeList.map((carMake) => (
                <option value={JSON.stringify(carMake)}>
                  {carMake.MakeName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group controlId="carModel">
            <Form.Control
              onChange={(e) => {
                let carModelObject = JSON.parse(e.target.value);
                setCarModel(carModelObject.ModelName);
                setTrimDisabled(false);
                setSelectedModel(carModelObject.ModelID);
              }}
              as="select"
              disabled={modelDisabled}
            >
              <option disabled selected>
                {rowCarModel}
              </option>
              {modelList.map((carModel) => (
                <option value={JSON.stringify(carModel)}>
                  {carModel.ModelName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
          <Form.Group
            onChange={(e) => {
              let carTrimObject = JSON.parse(e.target.value);
              setCarTrim(carTrimObject.TrimName);
            }}
            controlId="carTrim"
          >
            <Form.Control as="select" disabled={trimDisabled}>
              <option disabled selected>
                {rowCarTrim}
              </option>
              {trimList.map((carTrim) => (
                <option value={JSON.stringify(carTrim)}>
                  {carTrim.TrimName}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Form>
        <Row>
          <Col>
            <div>
              Qty:{" "}
              <input
                placeholder={rowCarQty}
                onChange={(e) => setQty(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Price:{" "}
              <input
                placeholder={rowCarPrice}
                onChange={(e) => setCarPrice(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Year:{" "}
              <input
                onChange={(e) => setQty(e.target.value)}
                className="columnInputs"
              ></input>
            </div>
          </Col>
          <Col>
            <div>
              Color:{" "}
              <input
                onChange={(e) => setColor(e.target.value)}
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
            setShowModal(false);
            resetAllFieldsHandler();
          }}
        >
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DealerEditCarModal;
