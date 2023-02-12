import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/AdminUseForm";
import InputLabel from "@material-ui/core/InputLabel";
import { Select, MenuItem } from "@material-ui/core";
import {
  getMakeList,
  registerModelWithMakeID,
  updateVehicleModel,
} from "../../api/VehicleAPI";

// Initial input field values.
const initialFValues = {
  id: 0,
  ModelID: "",
  ModelName: "",
  MakeID: "",
};

// Form used for creating a new model.
export default function RegisterModelForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [selectedMakeID, setSelectedMakeID] = React.useState("");
  const [modelID, setModelID] = React.useState("");
  const [modelName, setModelName] = React.useState("");
  const [updateMakeID, setUpdateMakeID] = React.useState("");
  const [updateModelID, setUpdateModelID] = React.useState("");
  const [updateModelName, setUpdateModelName] = React.useState("");
  const [makeOpen, setMakeOpen] = React.useState(false);
  const [makeList, setMakeList] = React.useState("");
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
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  // Validates input fields.
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    setErrors({
      ...temp,
    });
    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  // Retrieves all make information.
  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  // Onclick function to add a new model to the database with its makeID.
  async function onClickRegisterModelWithMakeID() {
    let modelObj = {
      ModelID: modelID,
      ModelName: modelName,
    };
    let result = await registerModelWithMakeID(modelObj, selectedMakeID);
    if (result.status !== 201) {
      alert("Failed to create the model. Please try again later.");
    }
    console.log(`Status : ${result.status}, ${result.body}`);
  }

  // Onclick function to update existing model with makeID, modelID and a new model object.
  async function onClickUpdateVehicleModel() {
    let modelObj = {
      MakeID: updateMakeID,
      ModelID: updateModelID,
      ModelName: updateModelName,
    };
    let result = await updateVehicleModel(selectedMakeID, modelID, modelObj);
    if (result.status !== 200) {
      alert("Failed to update the model. Please try again later.");
    }
    console.log(`Status : ${result.status}, ${result.body}`);
  }

  const { values, setValues, errors, setErrors, resetForm } = useForm(
    initialFValues,
    true,
    validate
  );

  // Check if the input field is empty.
  function isEmpty(str) {
    return str.length === 0 || !str.trim();
  }

  // Validates input and add or edit model when submit button is clicked.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recordForEdit === null) {
      if (isEmpty(selectedMakeID) || isEmpty(modelID) || isEmpty(modelName)) {
        alert("Values cannot be empty!");
      } else {
        await onClickRegisterModelWithMakeID();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      }
    } else {
      if (
        isEmpty(updateMakeID) ||
        isEmpty(updateModelID) ||
        isEmpty(updateModelName)
      ) {
        alert("ID and Name cannot be empty!");
      } else {
        await onClickUpdateVehicleModel();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      }
    }
  };

  // Set input field values to corresponding attributes in the model database.
  useEffect(() => {
    if (recordForEdit != null) {
      recordForEdit && setSelectedMakeID(recordForEdit.MakeID);
      recordForEdit && setModelID(recordForEdit.ModelID);
      recordForEdit && setUpdateMakeID(recordForEdit.MakeID);
      recordForEdit && setUpdateModelID(recordForEdit.ModelID);
      recordForEdit && setUpdateModelName(recordForEdit.ModelName);
    }
    setValues({
      ...recordForEdit,
    });
  }, [recordForEdit]);

  const vehiclesList = () => {
    return (
      // structures the model add/edit form.
      <div>
        <Form onSubmit={handleSubmit}>
          <Grid container>
            <Grid item xs={6}>
              {recordForEdit === null ? (
                <div>
                  {/* Dropdown menu for selecting make. */}
                  <InputLabel>Choose Make: </InputLabel>
                  <Select
                    open={makeOpen}
                    onClose={() => setMakeOpen(false)}
                    onOpen={() => setMakeOpen(true)}
                    value={selectedMakeID}
                    onChange={(event) => {
                      setSelectedMakeID(event.target.value);
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
                  {/* Input field for modelID (adding a new ID). */}
                  <Controls.Input
                    label="Model ID"
                    value={modelID}
                    onChange={(event) => setModelID(event.target.value)}
                  />
                  {/* Input field for modelName (adding a new name). */}
                  <Controls.Input
                    label="Model Name"
                    value={modelName}
                    onChange={(event) => setModelName(event.target.value)}
                  />
                </div>
              ) : (
                makeList && (
                  <div>
                    {/* Dropdown menu for updating the selected model's make. */}
                    <InputLabel>Choose Make: </InputLabel>
                    <Select
                      open={makeOpen}
                      onClose={() => setMakeOpen(false)}
                      onOpen={() => setMakeOpen(true)}
                      value={recordForEdit && updateMakeID}
                      onChange={(event) => {
                        setUpdateMakeID(event.target.value);
                      }}
                    >
                      {makeList.map((make, index) => {
                        return (
                          <MenuItem key={make.MakeID} value={make.MakeID}>
                            {make.MakeName}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <br />
                    <br />
                    {/* Input field for modelID (updating an existing ID). */}
                    <Controls.Input
                      label="Model ID"
                      value={recordForEdit && updateModelID}
                      onChange={(event) => setUpdateModelID(event.target.value)}
                    />
                    {/* Input field for modelName (updating an existing name). */}
                    <Controls.Input
                      label="New Model Name"
                      value={recordForEdit && updateModelName}
                      onChange={(event) =>
                        setUpdateModelName(event.target.value)
                      }
                    />
                  </div>
                )
              )}
            </Grid>
            <Grid item xs={6}>
              <div>
                {recordForEdit === null ? (
                  // When add button is clicked.
                  <Controls.Button type="submit" text="Submit" />
                ) : (
                  //  When update button is clicked.
                  <Controls.Button type="submit" text="Update" />
                )}
              </div>
            </Grid>
          </Grid>
        </Form>
      </div>
    );
  };

  // Returns the model form.
  return <div>{vehiclesList()}</div>;
}
