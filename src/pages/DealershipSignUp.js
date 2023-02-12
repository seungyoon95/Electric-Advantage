import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { useAuth } from "../components/AuthContext";
import "./css/dealerRegistration.css";
import { registerDealership } from "../api/DealershipAPI";
import { useHistory } from "react-router-dom";
import { getDealershipByUserID } from "../api/DealershipAPI";
import { NavLink } from "./pageComponents/NavbarElements";
import PageHeader from "../components/AdminPageHeader";
import CreateIcon from "@material-ui/icons/Create";
import { Box, MenuItem, FormHelperText } from "@material-ui/core";
import Select from "@material-ui/core/Select";

export default function DealershipProfilePage() {
  const history = useHistory();
  const [userId, setUserId] = useState(null);
  const [regionCode, setRegionCode] = useState(null);
  const [groupName, setGroupName] = useState(null);
  const [streetAddress, setStreetAddress] = useState(null);
  const [city, setCity] = useState(null);
  const [province, setProvince] = useState(null);
  const [zip, setZip] = useState(null);
  const [country, setCountry] = useState(null);
  const [salesContact, setSalesContact] = useState(null);
  const [salesEmail, setSalesEmail] = useState(null);
  const [salesPhone, setSalesPhone] = useState(null);
  const [billingContactName, setBillingContactName] = useState(null);
  const [billingPhone, setBillingPhone] = useState(null);
  const [billingEmail, setBillingEmail] = useState(null);
  const [longtitude, setLongtitude] = useState(null);
  const [latitude, setLatitude] = useState(null);

  async function onPressCreateDealership() {
    let dealershipObj = {
      UserID: userId,
      RegionCode: regionCode,
      GroupName: groupName,
      StreetAddress: streetAddress,
      City: city,
      Province: province,
      Zip: zip,
      Country: country,
      Latitude: latitude,
      Longitude: longtitude,
      SalesContact: salesContact,
      SalesEmail: salesEmail,
      SalesPhone: salesPhone,
      BillingContactName: billingContactName,
      BillingPhone: billingPhone,
      BillingEmail: billingEmail,
    };
    let result = await registerDealership(dealershipObj);
    if (result.status === 201) {
      alert("Dealership created.");
      history.push("/adminDealer");
    } else {
      alert("Something went wrong.");
    }
  }

  const createDealershipForm = () => {
    return (
      <>
        <PageHeader
          title="Dealer Registration"
          icon={<CreateIcon fontSize="large" />}
        />
        <body className="contentWrapper">
          <form className="dealerRegistrationForm">
            <Box mt={2} pt={2}>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={regionCode}
                onChange={(event) => setRegionCode(event.target.value)}
              >
                <MenuItem value={"CBC001"}>CBC001</MenuItem>
                <MenuItem value={"CBC002"}>CBC002</MenuItem>
                <MenuItem value={"CBC003"}>CBC003</MenuItem>
                <MenuItem value={"CBC004"}>CBC004</MenuItem>
              </Select>
              <FormHelperText>Region Code</FormHelperText>
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="User Id"
                variant="outlined"
                value={userId}
                onChange={(event) => setUserId(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Group Name"
                variant="outlined"
                value={groupName}
                onChange={(event) => setGroupName(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Street Address"
                variant="outlined"
                value={streetAddress}
                onChange={(event) => setStreetAddress(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="City"
                variant="outlined"
                value={city}
                onChange={(event) => setCity(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Province"
                variant="outlined"
                value={province}
                onChange={(event) => setProvince(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Zip"
                variant="outlined"
                value={zip}
                onChange={(event) => setZip(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Country"
                variant="outlined"
                value={country}
                onChange={(event) => setCountry(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Sales Contact"
                variant="outlined"
                value={salesContact}
                onChange={(event) => setSalesContact(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Sales Email"
                variant="outlined"
                value={salesEmail}
                onChange={(event) => setSalesEmail(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Sales Phone"
                variant="outlined"
                value={salesPhone}
                onChange={(event) => setSalesPhone(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Billing Contact Name"
                variant="outlined"
                value={billingContactName}
                onChange={(event) => setBillingContactName(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Billing Email"
                variant="outlined"
                value={billingEmail}
                onChange={(event) => setBillingEmail(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Biling Phone"
                variant="outlined"
                value={billingPhone}
                onChange={(event) => setBillingPhone(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Latitidue"
                variant="outlined"
                value={latitude}
                onChange={(event) => setLatitude(event.target.value)}
              />
            </Box>
            <Box mt={1} pt={1}>
              <TextField
                id="outlined-basic"
                label="Longtitude"
                variant="outlined"
                value={longtitude}
                onChange={(event) => setLongtitude(event.target.value)}
              />
            </Box>
            <div className="bottomTwo">
              <Button
                color="primary"
                variant="contained"
                onClick={() => onPressCreateDealership()}
              >
                Create Dealership
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={() => window.history.back()}
              >
                Back
              </Button>
            </div>
          </form>
        </body>
      </>
    );
  };

  return <div>{createDealershipForm()}</div>;
}
