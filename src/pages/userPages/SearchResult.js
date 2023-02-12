import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/Home.css";
import queryString from "query-string";
import carImage from "../../images/tesla.jpg";
import { Button } from "react-bootstrap";
import { Table } from "react-bootstrap";
import { getVehicleSearchResult } from "../../api/DealershipAPI";
import SearchBar from "../../components/SearchBar";

const SearchResult = ({ location }) => {
  const [vehicleList, setVehicleList] = React.useState("");

  const query = queryString.parse(location.search);

  React.useEffect(() => {
    onLoadGetVehicleSearchResult();
  }, []);

  async function onLoadGetVehicleSearchResult() {
    let resultSearch = await getVehicleSearchResult(
      query.make,
      query.range,
      query.price,
      query.condition,
      query.lat,
      query.lng
    );
    console.log(resultSearch);
    if (resultSearch.status === 200) {
      setVehicleList(resultSearch.body);
    } else {
      setVehicleList(null);
      console.error(resultSearch.error);
    }
  }

  return (
    <body>
      <h2>Search Result</h2>
      <SearchBar
        make={query.make}
        condition={query.condition}
        price={query.price}
        range={query.range}
      />
      {/* <Button className="emailAlertButton">Send Email Alert</Button> */}
      <div className="results">
        {vehicleList && vehicleList !== null ? (
          vehicleList.map((vehicle) => (
            <div className="carCard" key={vehicle.VehicleID}>
              <img src={carImage} className="carImage" />

              <Table striped hover className="carTable">
                <tbody>
                  <tr>
                    <td>Make: {vehicle.MakeName}</td>
                    <td>Model: {vehicle.ModelName}</td>
                    <td>Trim: {vehicle.Trim}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">Odometer: {vehicle.Odometer} km</td>
                    <td>Color: {vehicle.ColorName}</td>
                  </tr>
                  <tr>
                    <td colSpan="2">Vehicle Year: {vehicle.Year}</td>
                    <td>Price: ${vehicle.StartPrice}</td>
                  </tr>
                </tbody>
              </Table>

              <a
                className="nav-search carDetailsButton"
                href={`/search-detail/${vehicle.InventoryID}`}
              >
                <Button className="detailsButton">Details</Button>
              </a>
            </div>
          ))
        ) : (
          <div>No vehicles found</div>
        )}{" "}
      </div>
    </body>
  );
};

export default SearchResult;
