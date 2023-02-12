import React from "react";
import carImage from "../../images/tesla.jpg";
import "../css/searchDetails.css";
import { Card } from "react-bootstrap";
import { getInventoryByInventoryID } from "../../api/VehicleAPI";
import queryString from "query-string";
import { useAuth } from "../../components/AuthContext";
import {
  NavLink,
} from "../pageComponents/NavbarElements";

const SearchDetail = ({ match }) => {
  const [item, setItem] = React.useState("");
  const { currentUser, userType, logout, dealerObjectId } = useAuth();


  React.useEffect(() => {
    onLoadGetInventoryItem();
  }, []);

  async function onLoadGetInventoryItem() {
    let result = await getInventoryByInventoryID(match.params.inventoryID);
    console.log(result);
    if (result.status === 200) {
      setItem(result.body[0]);
    } else {
      alert(result.error);
    }
  }

  return (
    <body className="searchDetailsBody">
      <div>
        <div className="test detailsHeader">
          <h1>{item.MakeName} {item.ModelName} {item.Trim} {item.ColorName} - ${item.StartPrice}</h1>
        </div>

        <div className="carDetailsWithImage">
          <img
            src={carImage}
            alt="carDetailsImage"
            className="carDetailsImage"
          />

            <Card className="detailsCard">
              <Card.Header className="cardHeader">Vehicle Details</Card.Header>
              <div className="carDetails">
                  <div className="carAttributes">
                    <h5>Make: </h5>
                    <h5>Model: </h5>
                    <h5>price: </h5>
                    <h5>Range: </h5>
                    <h5>Trim: </h5>
                    <h5>Color: </h5>
                  </div>

                  <div className="carSpecific">
                    <h5>{item.MakeName}</h5>
                    <h5>{item.ModelName}</h5>
                    <h5>${item.StartPrice}</h5>
                    <h5>{item.EVRange}km</h5>
                    <h5>{item.Trim}</h5>
                    <h5>{item.ColorName}</h5>
                  </div>
              </div>
            </Card>
          </div>
        

          <div className="additionalInfo">
          <h5>Interested? Find your vehicle from this dealership!</h5>
              {currentUser ? (
              <Card className="infoCard">
                <div className="groupName">{item.GroupName}</div>
                <div className="salesCont">{item.SalesContact}</div>
                <div className="salesEmail">{item.SalesEmail}</div>
                <div className="salesPhone">{item.SalesPhone}</div>
              </Card>
              ) : (
                <NavLink to="/login" activeStyle>
                Press here to login to see the dealership information
                </NavLink>
              )
              }
            </div>
      </div>
    </body>
  );
};

export default SearchDetail;
