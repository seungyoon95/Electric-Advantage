import React from "react";
import { Button, Row, Col, Container } from "react-bootstrap";
import { getMakeList } from "../api/VehicleAPI";
import CONDITION from "../constants/VehicleCondition";
import RangeSlider from "react-bootstrap-range-slider";
import { CoordinateContext } from "../shared/App";
import "../pages/css/SearchBar.css";
import { makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  example1: {
    position: "absolute",
    right: "500px",
  },
}));

export default function SearchBar(props) {
  const PRICE_MAX = 250000;
  const RANGE_MAX = 1000;

  const classes = useStyles();
  const [makeList, setMakeList] = React.useState([]);
  const [priceValue, setPriceValue] = React.useState(PRICE_MAX / 2);
  const [rangeValue, setRangeValue] = React.useState(RANGE_MAX / 2);
  const [selectedMake, setSelectedMake] = React.useState(0);
  const [selectedConditionID, setSelectedConditionID] = React.useState(0);

  React.useEffect(() => {
    onLoadGetMakeList();
    props.make && setSelectedMake(props.make);
    props.condition && setSelectedConditionID(props.condition);
    props.range && setRangeValue(props.range);
    props.price && setPriceValue(props.price);
  }, []);

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

  return (
    <CoordinateContext.Consumer>
      {(state) => {
        return (
          <Row>
            <Col className="movePrice">
              <section className="range">
                <div className="priceColumn">
                  <div className="priceTitle">
                    <h3>Price</h3>
                  </div>

                  <Container>
                    <RangeSlider
                      max={PRICE_MAX}
                      value={priceValue}
                      onChange={(e) => setPriceValue(e.target.value)}
                      variant="success"
                    />
                  </Container>
                </div>
              </section>
            </Col>

            <Col className="moveRange">
              <section className="range">
                <div className="rangeColumn">
                  <div className="rangeTitle">
                    <h3 className="">Range</h3>
                  </div>

                  <Container>
                    <RangeSlider
                      max={RANGE_MAX}
                      value={rangeValue}
                      onChange={(e) => setRangeValue(e.target.value)}
                      variant="success"
                    />
                  </Container>
                </div>
              </section>
            </Col>

            <Col className="moveMake">
              <div className="makeColumn">
                <div className="makeTitle">
                  <h3>Make</h3>
                </div>

                <select
                  className="make-dropdown"
                  onChange={(e) => {
                    setSelectedMake(e.target.value);
                  }}
                >
                  <option
                    value={0}
                    key={0}
                    selected={0 === parseInt(selectedMake)}
                  >
                    Any
                  </option>
                  {makeList.map((make) => (
                    <option
                      value={make.MakeID}
                      key={make.MakeID}
                      selected={make.MakeID === selectedMake}
                    >
                      {make.MakeName}
                    </option>
                  ))}
                </select>
              </div>
            </Col>

            <Col className="moveStatus">
              <div className="statusColumn">
                <div className="statusTitle">
                  <h3>Status</h3>
                </div>

                <select
                  className="status-dropdown"
                  onChange={(e) => {
                    setSelectedConditionID(e.target.value);
                  }}
                >
                  <option
                    value={0}
                    selected={0 === parseInt(selectedConditionID)}
                  >
                    Any
                  </option>
                  <option
                    value={CONDITION.NEW}
                    selected={CONDITION.NEW === parseInt(selectedConditionID)}
                  >
                    New
                  </option>
                  <option
                    value={CONDITION.USED}
                    selected={CONDITION.USED === parseInt(selectedConditionID)}
                  >
                    Pre-Owned
                  </option>
                </select>
              </div>
            </Col>
            <Col>
              <a
                href={`/search-result?make=${selectedMake}&condition=${selectedConditionID}&price=${priceValue}&range=${rangeValue}&lat=${state.lat}&lng=${state.lng}`}
              >
                <Button className="searchButton">Search</Button>
              </a>
            </Col>
          </Row>
        );
      }}
    </CoordinateContext.Consumer>
  );
}
