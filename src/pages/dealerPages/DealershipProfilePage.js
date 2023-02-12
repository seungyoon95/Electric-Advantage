import React, { useRef, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useAuth } from "../../components/AuthContext";
import Signup from "../Signup";
import "../css/dealerRegistration.css";
import { registerDealership } from "../../api/DealershipAPI";
import { Link, useHistory } from "react-router-dom";
import { getDealershipByUserID } from "../../api/DealershipAPI";
import { Nav, NavLink, Bars, NavMenu } from "../pageComponents/NavbarElements";
import PageHeader from "../../components/AdminPageHeader";
import CreateIcon from "@material-ui/icons/Create";
import { Box, ButtonGroup, MenuItem } from "@material-ui/core";
import Select from "@material-ui/core/Select";

export default function DealershipProfilePage() {
  const history = useHistory();
  const [regionCode, setRegionCode] = React.useState(null);
  const [groupName, setGroupName] = React.useState(null);
  const [streetAddress, setStreetAddress] = React.useState(null);
  const [city, setCity] = React.useState(null);
  const [province, setProvince] = React.useState(null);
  const [zip, setZip] = React.useState(null);
  const [country, setCountry] = React.useState(null);
  const [salesContact, setSalesContact] = React.useState(null);
  const [salesEmail, setSalesEmail] = React.useState(null);
  const [salesPhone, setSalesPhone] = React.useState(null);
  const [billingContactName, setBillingContactName] = React.useState(null);
  const [billingPhone, setBillingPhone] = React.useState(null);
  const [billingEmail, setBillingEmail] = React.useState(null);
  const [longtitude, setLongtitude] = React.useState(null);
  const [latitude, setLatitude] = React.useState(null);
  const [dealerObjectId, setDealerObjectId] = useState("");
  const { currentUser, userType, logout, userObject } = useAuth();
  const [searchedUser, setSearchedUser] = useState(null);
  const [userId, setUserId] = useState("");

  const createDealershipForm = () => {
    return (
      <>
        <a
          className="w-100 text-center mt-3"
          href={`mailto:admin@electricadvantage.ca?subject=Dealer Register Request&body=Please fill out this information to register as dealership
          %0AFirst name:
          %0ALast name:
          %0AEmail:
          %0AUser id: ${userObject.UserID}
          `}
        >
          <Button
            style={{ marginTop: "10vh" }}
            variant="contained"
            color="primary"
          >
            Request Dealership Registration
          </Button>
        </a>
      </>
    );
  };

  return <div>{createDealershipForm()}</div>;
}
