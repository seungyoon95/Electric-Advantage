import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/AdminUseForm";
import { registerMake, updateVehicleMake } from "../../api/VehicleAPI";

// Initial input field values.
const initialFValues = {
  id: 0,
  MakeID: "",
  MakeName: "",
};

// Form used for creating a new make.
export default function RegisterMakeForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [updateID, setUpdateID] = React.useState("");
  const [updateName, setUpdateName] = React.useState("");
  const [id, setID] = React.useState("");
  const [name, setName] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);

  // OnClick function to add a new make to the database .
  async function onClickRegisterMake() {
    let makeObj = {
      MakeID: id,
      MakeName: name,
    };
    let result = await registerMake(makeObj);
    console.log(`Status : ${result.status}, ${result.body}`);
  }

  // Onclick function to update an existing make, with makeID and a new make object.
  async function onClickUpdateVehicleMake() {
    let makeObj = {
      MakeID: updateID,
      MakeName: updateName,
    };
    let result = await updateVehicleMake(id, makeObj);

    // When error occurs.
    if (result.status !== 200) {
      alert("Failed to update the make. Please try again later.");
    }
    console.log(`Status : ${result.status}, ${result.body}`);
  }

  // Validates input fields.
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
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

  // Validates input and add or edit make when submit button is clicked.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (recordForEdit === null) {
      if (isEmpty(id) || isEmpty(name)) {
        alert("ID and Name cannot be empty!");
      } else {
        await onClickRegisterMake();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      }
    } else {
      if (isEmpty(updateID) || isEmpty(updateName)) {
        alert("ID and Name cannot be empty!");
      } else {
        await onClickUpdateVehicleMake();
        if (validate()) {
          addOrEdit(values, resetForm);
        }
      }
    }
  };

  // Set input field values to corresponding attribute in the make database.
  useEffect(() => {
    if (recordForEdit !== null)
      recordForEdit && setUpdateID(recordForEdit.MakeID);
      recordForEdit && setID(recordForEdit.MakeID);
      recordForEdit && setUpdateName(recordForEdit.MakeName);
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    // Structures the make add/edit form.
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          {recordForEdit === null ? (
            <div>
              {/* Input field for makeID (adding a new ID). */}
              <Controls.Input
                label="Make ID"
                value={id}
                onChange={(event) => setID(event.target.value)}
              />
              {/* Input field for makeName (adding a new name). */}
              <Controls.Input
                label="Make Name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
          ) : (
            <div>
              {/* Input field for makeID (updating an existing ID). */}
              <Controls.Input
                label="Make ID"
                value={recordForEdit && updateID}
                onChange={(event) => setUpdateID(event.target.value)}
              />
              {/* Input field for makeName (updating an existing name). */}
              <Controls.Input
                label="New Make Name"
                value={recordForEdit && updateName}
                onChange={(event) => setUpdateName(event.target.value)}
              />
            </div>
          )}
        </Grid>
        <Grid item xs={6}>
          <div>
            {recordForEdit === null ? (
              // when add button is clicked
              <Controls.Button type="submit" text="Submit" />
            ) : (
              // when update button is clicked
              <Controls.Button type="submit" text="Update" />
            )}
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
