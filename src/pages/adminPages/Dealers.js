import React, { useState } from "react";
import PageHeader from "../../components/AdminPageHeader";
import LaptopMacIcon from "@material-ui/icons/LaptopMac";
import {
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
} from "@material-ui/core";
import useTable from "../../components/AdminUseTable";
import * as dealerService from "./dealerService";
import Controls from "../../components/controls/Controls";
import { getAllDealerships } from "../../api/DealershipAPI";

// Styling for dealers page.
const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(3),
  },
  registerDealershipButton: {
    position: "absolute",
    left: "22vw",
    marginBottom: 30,
  },
  subButton: {
    position: "absolute",
    //lower the number, the more left
    left: "1vw",
    marginBottom: 30,
  },

  vehicleButton: {
    position: "absolute",
    //lower the number, the more left
    left: "13vw",
    marginBottom: 30,
  },
  customizeToolbar: {
    minHeight: 20,
  },
}));

// Header for each columns on the dealership table.
const headCells = [
  { id: "dealerID", label: "Dealer ID" },
  { id: "name", label: "Name" },
  { id: "address", label: "Address" },
  { id: "email", label: "Email" },
  { id: "phone", label: "Phone" },
  { id: "planID", label: "Plan ID" },
];

// Responsible for creating dealers page.
export default function Dealers() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(dealerService.getAllDealers());
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [notify, setNotify] = useState({
    isOpen: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "",
    subTitle: "",
  });
  const [dealerships, setDealerships] = React.useState([]);
  const [dealershipList, setDealershipList] = React.useState([]);

  let resultDealership = [];

  // Get all dealership information upon loading the page.
  React.useEffect(() => {
    onLoadGetAllDealerships();
  }, []);

  // Function to retrieve all dealership information.
  async function onLoadGetAllDealerships() {
    resultDealership = await getAllDealerships();
    let statusCode = resultDealership.status;

    // Assigns each dealership attributes to each columns When data retrieval is successful.
    if (statusCode === 200) {
      let body = resultDealership.body;

      if (resultDealership["body"] != undefined) {
        setDealershipList(
          resultDealership["body"].map((d) => {
            return {
              dealerID: d["DealershipID"],
              dealerName: d["GroupName"],
              dealerAddress: d["StreetAddress"],
              dealerEmail: d["SalesEmail"],
              dealerPhone: d["SalesPhone"],
              dealerPlanID: d[""],
            };
          })
        );
      } else setDealershipList([]);

      setDealerships(body);
    } else {
      // Throws an alert when an error occurs.
      alert(`Status : ${statusCode}, ${resultDealership.error}`);
    }
  }

  // Creates the dealership table with a header and a table.
  const { TblContainer, TblHead } = useTable(records, headCells, filterFn);

  return (
    <>
      {/* Structures the dealers page. */}
      <PageHeader title="Dealer" icon={<LaptopMacIcon fontSize="large" />} />
      <Paper className={classes.pageContent}>
        <Toolbar className={classes.customizeToolbar}>
          {/* Button to go to subscriptions page. */}
          <Controls.Button
            text="Subscriptions"
            color="#841584"
            variant="outlined"
            className={classes.subButton}
            onClick={(event) => (window.location.href = "/adminSub")}
          />
          {/* Button to go to vehicles page. */}
          <Controls.Button
            text="Vehicles"
            color="#841584"
            variant="outlined"
            className={classes.vehicleButton}
            onClick={(event) => (window.location.href = "/adminVehicle")}
          />
          {/* Button to go to register dealership page. */}
          <Controls.Button
            text="Register Dealership"
            color="#841584"
            variant="outlined"
            className={classes.registerDealershipButton}
            onClick={(event) => (window.location.href = "/registerdealership")}
          />
        </Toolbar>
        
        {/* Delearship table. */}
        <TblContainer>
          <TblHead />
          <TableBody>
            {/* Maps each dealership attributes to corresponding columns. */}
            {dealershipList.map((list) => (
              <TableRow key={list.id}>
                <TableCell>{list.dealerID}</TableCell>
                <TableCell>{list.dealerName}</TableCell>
                <TableCell>{list.dealerAddress}</TableCell>
                <TableCell>{list.dealerEmail}</TableCell>
                <TableCell>{list.dealerPhone}</TableCell>
                <TableCell>{list.dealerPlanID}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
    </>
  );
}
