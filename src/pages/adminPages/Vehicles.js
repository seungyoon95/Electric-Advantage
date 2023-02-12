import React, { useState } from "react";
import VehicleForm from "./VehicleForm";
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
import * as vehicleService from "./vehicleService";
import Controls from "../../components/controls/Controls";
import AddIcon from "@material-ui/icons/Add";
import Popup from "../../components/AdminPopup";
import EditIcon from "@material-ui/icons/Edit";
import CloseIcon from "@material-ui/icons/Close";
import Notification from "../../components/AdminNotification";
import ConfirmDialog from "../../components/AdminConfirmDialog";
import {
  getAllAvailableVehicles,
  deleteVehicleByID,
} from "../../api/VehicleAPI";

const useStyles = makeStyles((theme) => ({
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(1),
  },
  searchInput: {
    width: "50%",
  },
  newButton: {
    position: "absolute",
    right: "0vw",
    marginBottom: 30,
  },
  button1: {
    position: "absolute",
    right: "17.3vw",
    marginBottom: 30,
  },
  button2: {
    position: "absolute",
    right: "10vw",
    marginBottom: 30,
  },
  subButton: {
    position: "absolute",
    //lower the number, the more left
    left: "2vw",
    marginBottom: 30,
  },
  dealerButton: {
    position: "absolute",
    //lower the number, the more left
    left: "13vw",
    marginBottom: 30,
  },
  registerDealershipButton: {
    position: "absolute",
    //lower the number, the more left
    left: "20vw",
    marginBottom: 30,
  },
  customizeToolbar: {
    minHeight: 20,
  },
}));

const headCells = [
  { id: "vehicleID", label: "Vehicle ID" },
  { id: "modelID", label: "Model ID" },
  { id: "priceLow", label: "Price Lower" },
  { id: "priceUp", label: "Price Upper" },
  { id: "evRange", label: "EV Range" },
  { id: "batterySize", label: "Battery Size" },
  { id: "trim", label: "Trim" },
  { id: "year", label: "Year" },
  { id: "actions", label: "Delete", disableSorting: true },
];

export default function Vehicles() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [records, setRecords] = useState(vehicleService.getAllVehicles());
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
  const [openPopup2, setOpenPopup2] = useState(false);

  const [vehicles, setVehicles] = React.useState([]);
  const [vehicleList, setVehicleList] = React.useState([]);
  const [vehicleID, setVehicleID] = React.useState("");

  async function onClickDeleteVehicleByID(vID) {
    let result = await deleteVehicleByID(vID);
    if (result.status === 200) {
      onLoadGetAllAvailableVehicles();
    }
    alert(`Status : ${result.status}, ${result.body}`);
  }

  let resultVehicles = [];

  React.useEffect(() => {
    onLoadGetAllAvailableVehicles();
  }, []);

  async function onLoadGetAllAvailableVehicles() {
    resultVehicles = await getAllAvailableVehicles();
    let statusCode = resultVehicles.status;
    if (statusCode === 200) {
      let body = resultVehicles.body;
      if (resultVehicles["body"] != undefined) {
        setVehicleList(body);
      }
    } else {
      console.error(`Status : ${statusCode}, ${resultVehicles.error}`);
    }
  }

  const { TblContainer, TblHead, TblPagination } = useTable(
    records,
    headCells,
    filterFn
  );

  const addOrEdit = (vehicle, resetForm) => {
    if (vehicle.id == 0) {
      vehicleService.insertVehicle(vehicle);
    } else {
      vehicleService.updateVehicle(vehicle);
      resetForm();
      setRecordForEdit(null);
      setOpenPopup(false);
      setOpenPopup2(false);
      setRecords(vehicleService.getAllVehicles());
      setNotify({
        isOpen: true,
        message: "Submitted Successfully",
        type: "success",
      });
    }
    onLoadGetAllAvailableVehicles();
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
    setOpenPopup2(true);
  };

  const onDelete = (id) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    });
    setNotify({
      isOpen: true,
      message: "Deleted Successfully",
      type: "error",
    });
  };

  return (
    <>
      <PageHeader title="Vehicle" icon={<LaptopMacIcon fontSize="large" />} />
      <Paper className={classes.pageContent}>
        <Toolbar className={classes.customizeToolbar}>
          <Controls.Button
            text="Subscriptions"
            color="#841584"
            variant="outlined"
            className={classes.subButton}
            onClick={(event) => (window.location.href = "/adminSub")}
          />
          <Controls.Button
            text="Dealers"
            color="#841584"
            variant="outlined"
            className={classes.dealerButton}
            onClick={(event) => (window.location.href = "/adminDealer")}
          />
          <Controls.Button
            text="Register Dealership"
            color="#841584"
            variant="outlined"
            className={classes.registerDealershipButton}
            onClick={(event) => (window.location.href = "/registerdealership")}
          />

          <Controls.Button
            text="Make"
            color="#841584"
            variant="outlined"
            className={classes.button1}
            onClick={(event) => (window.location.href = "/adminMake")}
          />
          <Controls.Button
            text="Model"
            color="#841584"
            variant="outlined"
            className={classes.button2}
            onClick={(event) => (window.location.href = "/adminModel")}
          />
          <Controls.Button
            text="Vehicle"
            color="#841584"
            variant="outlined"
            startIcon={((<AddIcon />), (<EditIcon fontSize="small" />))}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {vehicleList.map((v) => (
              <TableRow key={v.VehicleID}>
                <TableCell>{v.VehicleID}</TableCell>
                <TableCell>{v.ModelID}</TableCell>
                <TableCell>{v.PriceLower}</TableCell>
                <TableCell>{v.PriceUpper}</TableCell>
                <TableCell>{v.EVRange}</TableCell>
                <TableCell>{v.BatterySize}</TableCell>
                <TableCell>{v.Trim}</TableCell>
                <TableCell>{v.Year}</TableCell>
                <TableCell>
                  <Controls.ActionButton
                    onClick={() => {
                      setConfirmDialog({
                        isOpen: true,
                        title: `Deleting ${v.VehicleID} will remove anything that relates to ${v.VehicleID} such as inventory`,
                        subTitle: `Do you want to delete?`,
                        onConfirm: () => {
                          onClickDeleteVehicleByID(v.VehicleID);
                          onDelete();
                        },
                      });
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
      </Paper>
      <Popup
        title="Add a new vehicle"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <VehicleForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} />
      </Popup>
      <Notification notify={notify} setNotify={setNotify} />
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </>
  );
}
