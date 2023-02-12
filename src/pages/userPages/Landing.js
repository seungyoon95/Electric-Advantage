import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../css/landing.css";
import {
  getDealershipsInventoryCountingsByRegion,
  getCountingsList,
} from "../../api/MiscAPI";
import SearchBar from "../../components/SearchBar";
import carImage1 from "../../images/kia.jpg";
import { Table } from "react-bootstrap";

export default function LandingPage() {
  const [countings, setCountings] = React.useState([]);
  const [selectedRegion, setSelectedRegion] = React.useState([]);
  const [inventoryCountArray, setInventoryCountArray] = React.useState([]);

  React.useEffect(() => {
    onLoadGetCountingsList();
  }, []);

  async function onLoadGetCountingsList() {
    let resultCountList = await getCountingsList();
    let statusCode = resultCountList.status;
    if (statusCode === 200) {
      let body = resultCountList.body;
      setCountings(body);
      setSelectedRegion(body[0]);
      onChangeGetDealershipInventoryCountingsByRegion(body[0]);
    } else {
      alert(`Status : ${statusCode}, ${resultCountList.error}`);
    }
  }

  async function onChangeGetDealershipInventoryCountingsByRegion(region) {
    let resultList = await getDealershipsInventoryCountingsByRegion(
      region.RegionCode
    );
    let statusCode = resultList.status;
    if (statusCode === 200) {
      let body = resultList.body;
      setInventoryCountArray(body);
    } else {
      console.error(`Status : ${statusCode}, ${resultList.error}`);
      setInventoryCountArray([]);
    }
  }

  const renderCard = (obj, index) => {
    if (index < 3)
      return (
        <div className="dealerCard">
          <div className="dealerImageContainer">
            <img src={carImage1} className="dealerImage" />
          </div>

          <Table striped hover className="dealerTable">
            <tbody>
              <tr>
                <td>{obj.GroupName}</td>
                <td className="inventory">Inventory: {obj.InventoryCount}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
  };

  return (
    <body>
      <div className="regionContainer">
        <select
          className="regionSelect"
          onChange={(e) => {
            setSelectedRegion(JSON.parse(e.target.value));
            onChangeGetDealershipInventoryCountingsByRegion(
              JSON.parse(e.target.value)
            );
          }}
        >
          {countings.map((region) => {
            return (
              <option className="optionText" value={JSON.stringify(region)}>
                {region.RegionName}
              </option>
            );
          })}
        </select>
      </div>

      <div className="banner">
        <div className="countBox">
          <div className="value" style={{ fontSize: "25pt" }}>
            {selectedRegion.DealershipCount}
          </div>
          <div className="category">Dealerships</div>
        </div>
        <div className="countBox">
          <div className="value" style={{ fontSize: "25pt" }}>
            {selectedRegion.UsedCount}
          </div>
          <div className="category">New Cars</div>
        </div>
        <div className="countBox">
          <div className="value" style={{ fontSize: "25pt" }}>
            {selectedRegion.NewCount}
          </div>
          <div className="category">Pre-Owned Cars</div>
        </div>
      </div>

      <div className="dealerResults">
        <h2 style={{ color: "#207567" }}>Top 3 Dealerships in this Region</h2>
        {inventoryCountArray.length > 0 ? (
          inventoryCountArray.map(renderCard)
        ) : (
          <h3>No Dealerships found in this region :(</h3>
        )}
      </div>

      <SearchBar />
    </body>
  );
}
