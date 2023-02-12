import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/AdminUseForm";
import { Select, MenuItem } from "@material-ui/core";
import InputLabel from "@material-ui/core/InputLabel";
import {
  getMakeList,
  getModelListByMakeID,
  registerVehicleToDatabase,
  updateVehicleByID,
} from "../../api/VehicleAPI";

// Initial input field values.
const initialFValues = {
  id: 0,
  VehicleID: "",
  ModelID: "",
  EVRange: "",
  BatterySize: "",
  Trim: "",
  Year: "",
};

// Form used for creating a new vehicle.
export default function VehicleForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [makeList, setMakeList] = React.useState([]);
  const [modelList, setModelList] = React.useState([]);
  const [makeOpen, setMakeOpen] = React.useState(false);
  const [modelOpen, setModelOpen] = React.useState(false);
  const [selectedMakeID, setSelectedMakeID] = React.useState("");
  const [selectedModelID, setSelectedModelID] = React.useState("");
  const [vehicleID, setVehicleID] = React.useState("");
  const [evRange, setEVRange] = React.useState("");
  const [batterySize, setBatterySize] = React.useState("");
  const [trim, setTrim] = React.useState("");
  const [year, setYear] = React.useState("");
  const [updateModelID, setUpdateModelID] = React.useState("");
  const [updateVehicleID, setUpdateVehicleID] = React.useState("");
  const [updateEvRange, setUpdateEvRange] = React.useState("");
  const [updateBatterySize, setUpdateBatterySize] = React.useState("");
  const [updateTrim, setUpdateTrim] = React.useState("");
  const [updateYear, setUpdateYear] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  // Retrieves the list of makes upon loading the form.
  React.useEffect(() => {
    onLoadGetMakeList();
  }, []);

  // Retrieves all make information.
  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      setMakeList(body);
    } else {
      console.log(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  // Retrieves list of models from selected make.
  async function onSelectGetModelList(makeID) {
    let resultModelList = await getModelListByMakeID(makeID);
    let statusCode = resultModelList.status;
    if (statusCode === 200) {
      let body = resultModelList.body;
      setModelList(body);
    } else {
      setModelList();
    }
  }

  // Onclick function to register a new vehicle to the database.
  async function onClickRegisterVehicleToDatabase() {
    let vehicleObj = {
      VehicleID: vehicleID,
      ModelID: selectedModelID,
      EVRange: !evRange ? 0 : evRange,
      BatterySize: !batterySize ? 0 : batterySize,
      Trim: trim,
      Year: !year ? 0 : year,
    };
    let result = await registerVehicleToDatabase(vehicleObj);
    if (result.status !== 201) {
      alert("Failed to create a vehicle. Please try again later.");
    }
    console.log(`Status : ${result.status}, ${result.body}`);
  }

  // Onclick function to update the vehicle with vehicle object.
  async function onClickUpdateVehicleByID() {
    let vehicleObj = {
      VehicleID: updateVehicleID,
      ModelID: updateModelID,
      EVRange: !updateEvRange && 0,
      BatterySize: updateBatterySize && 0,
      Trim: !updateTrim,
      Year: !updateYear && 0,
    };
    let result = await updateVehicleByID(vehicleObj);
    if (result.status !== 200) {
      alert("Failed to update a vehicle. Please try again later.");
    }
    console.log(`Status : ${result.status}, ${result.body}`);
  }

  // Validates input fields.
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("carID" in fieldValues)
      temp.carID = fieldValues.carID ? "" : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  // Check if the input field is empty.
  function isEmpty(str) {
    return str.length === 0 || !str.trim();
  }

  // Validates input and add vehicle when submit/update button is clicked.
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (recordForEdit === null) {
      if (
        isEmpty(vehicleID) ||
        isEmpty(selectedMakeID) ||
        isEmpty(selectedModelID)
      ) {
        alert("Make, Model, or VehicleID cannot be empty!");
      } else {
        await onClickRegisterVehicleToDatabase();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      }
    } else {
      if (isEmpty(updateVehicleID) || isEmpty(updateModelID)) {
        alert("Model, or VehicleID cannot be empty!");
      } else {
        await onClickUpdateVehicleByID();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      }
    }
  };

  // Set input field values to corresponding attributes in the vehicle database.
  useEffect(() => {
    if (recordForEdit != null)
      recordForEdit && setSelectedMakeID(recordForEdit.MakeID);
      recordForEdit && setSelectedModelID(recordForEdit.ModelID);
      recordForEdit && setUpdateModelID(recordForEdit.ModelID);
      recordForEdit && setUpdateVehicleID(recordForEdit.VehicleID);
      recordForEdit && setUpdateEvRange(recordForEdit.EVRange);
      recordForEdit && setUpdateBatterySize(recordForEdit.BatterySize);
      recordForEdit && setUpdateTrim(recordForEdit.Trim);
      recordForEdit && setUpdateYear(recordForEdit.Year);
      setValues({
        ...recordForEdit,
      });
    }, [recordForEdit]);

  const vehiclesList = () => {
    return (
      // Structures the vehicle add/edit form.
      <div>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              {recordForEdit === null ? (
                <div>
                  {/* Dropdown menu for selecting make. */}
                  <InputLabel>Choose Make:</InputLabel>
                  <Select
                    open={makeOpen}
                    onClose={() => setMakeOpen(false)}
                    onOpen={() => setMakeOpen(true)}
                    value={selectedMakeID}
                    onChange={(event) => {
                      setSelectedMakeID(event.target.value);
                      onSelectGetModelList(event.target.value);
                    }}
                  >
                    {makeList &&
                      makeList.map((make, index) => {
                        return (
                          <MenuItem key={make.MakeID} value={make.MakeID}>
                            {make.MakeName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <br />
                  <br />
                  {/* Dropdown menu for selecting model. */}
                  <InputLabel>Choose Model:</InputLabel>
                  <Select
                    open={modelOpen}
                    onClose={() => setModelOpen(false)}
                    onOpen={() => setModelOpen(true)}
                    value={selectedModelID}
                    onChange={(event) => {
                      setSelectedModelID(event.target.value);
                    }}
                  >
                    {modelList &&
                      modelList.map((model, index) => {
                        return (
                          <MenuItem key={index} value={model.ModelID}>
                            {model.ModelName}
                          </MenuItem>
                        );
                      })}
                  </Select>
                  <br />
                  <br />
                  {/* Input field for vehicle ID (adding a new vehicle). */}
                  <Controls.Input
                    label="Vehicle ID"
                    value={vehicleID}
                    onChange={(event) => setVehicleID(event.target.value)}
                    error={errors.vehicleID}
                  />
                  {/* Input field for EV range (adding a new vehicle). */}
                  <Controls.Input
                    label="EV Range"
                    value={evRange}
                    onChange={(event) => setEVRange(event.target.value)}
                  />
                  {/* Input field for battery size (adding a new vehicle). */}
                  <Controls.Input
                    label="Battery Size"
                    value={batterySize}
                    onChange={(event) => setBatterySize(event.target.value)}
                  />
                  {/* Input field for trim (adding a new vehicle). */}
                  <Controls.Input
                    label="Trim"
                    value={trim}
                    onChange={(event) => setTrim(event.target.value)}
                  />
                  {/* Input field for vehicle year (adding a new vehicle). */}
                  <Controls.Input
                    label="Year"
                    value={year}
                    onChange={(event) => setYear(event.target.value)}
                  />
                </div>
              ) : (
                <div>
                  {/* Displays the current model ID (updating an existing vehicle).  */}
                  <Controls.Input
                    label="Model ID"
                    value={recordForEdit && updateModelID}
                    disabled={true}
                  />
                  {/* Displays the current vehicle ID (updating an existing vehicle). */}
                  <Controls.Input
                    label="Vehicle ID"
                    value={recordForEdit && updateVehicleID}
                    disabled={true}
                  />
                  {/* Input field for EV range (updating an existing vehicle). */}
                  <Controls.Input
                    label="EV Range"
                    value={recordForEdit && updateEvRange}
                    onChange={(event) => setUpdateEvRange(event.target.value)}
                  />
                  {/* Input field for battery size (updating an existing vehicle). */}
                  <Controls.Input
                    label="Battery Size"
                    value={recordForEdit && updateBatterySize}
                    onChange={(event) =>
                      setUpdateBatterySize(event.target.value)
                    }
                  />
                  {/* Input field for trim (updating an existing vehicle). */}
                  <Controls.Input
                    label="Trim"
                    value={recordForEdit && updateTrim}
                    onChange={(event) => setUpdateTrim(event.target.value)}
                  />
                  {/* Input field for year (updating an existing vehicle). */}
                  <Controls.Input
                    label="Year"
                    value={recordForEdit && updateYear}
                    onChange={(event) => setUpdateYear(event.target.value)}
                  />
                </div>
              )}
            </Grid>
            <Grid item xs={6}>
              <div>
                {recordForEdit === null ? (
                  // When add button is clicked.
                  <Controls.Button type="submit" text="Submit" />
                ) : (
                  // When update button is clicked.
                  <Controls.Button type="submit" text="Update" />
                )}
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    );
  };

  // Returns the vehicle form.
  return <div>{vehiclesList()}</div>;
}
