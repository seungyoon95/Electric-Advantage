import React from "react";
import { Button, TextField } from "@material-ui/core";
import { getUsersList, getUserByUserId, createUser } from "../api/UserAPI";
import {
  getMakeList,
  getModelListByMakeID,
  getVehicleListByMakeIDAndModelID,
} from "../api/VehicleAPI";
import { getVehicleSearchResult } from "../api/DealershipAPI";
import { Select, MenuItem } from "@material-ui/core";
import TYPE from "../constants/UserType";
import { Link, Route } from "react-router-dom";

export default function TestingPage() {
  const [usersList, setUsersList] = React.useState(null);
  const [searchUserId, setSearchUserId] = React.useState("");
  const [searchedUser, setSearchedUser] = React.useState(null);
  const [userId, setUserId] = React.useState("");
  const [firstname, setFirstname] = React.useState("");
  const [lastname, setLastname] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [userType, setUserType] = React.useState(TYPE.CUSTOMER);
  const [userOpen, setUserOpen] = React.useState(false);
  const [makeOpen, setMakeOpen] = React.useState(false);
  const [makeList, setMakeList] = React.useState("");
  const [modelList, setModelList] = React.useState("");
  const [selectedMakeID, setSelectedMakeID] = React.useState("");

  React.useEffect(() => {
    onLoadGetMakeList();
    onLoadGetVehicleSearchResult();
  }, []);

  async function onLoadGetVehicleSearchResult() {
    let resultSearch = await getVehicleSearchResult(
      1,
      400,
      30000,
      2,
      49.26324,
      -122.87704
    );
    console.log(resultSearch);
  }

  async function onLoadGetMakeList() {
    let resultMakeList = await getMakeList();
    let statusCode = resultMakeList.status;
    if (statusCode === 200) {
      let body = resultMakeList.body;
      console.log(body);
      setMakeList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultMakeList.error}`);
    }
  }

  async function onSelectGetModelList(makeID) {
    let resultModelList = await getModelListByMakeID(makeID);
    let statusCode = resultModelList.status;
    if (statusCode === 200) {
      let body = resultModelList.body;
      console.log(body);
      setModelList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultModelList.error}`);
    }
  }

  async function onPressGetUsersList() {
    let resultUsers = await getUsersList();
    let statusCode = resultUsers.status;
    if (statusCode === 200) {
      let body = resultUsers.body;
      setUsersList(body);
    } else {
      alert(`Status : ${statusCode}, ${resultUsers.error}`);
    }
  }

  async function onPressGetUserById() {
    if (!searchUserId) {
      alert("no id entered!");
    } else {
      let resultUser = await getUserByUserId(searchUserId);
      let statusCode = resultUser.status;
      if (statusCode === 200) {
        let body = resultUser.body[0];
        setSearchedUser(body);
      } else {
        alert(`Status : ${statusCode}, ${resultUser.error}`);
      }
    }
  }

  async function onPressCreateUser() {
    let userObj = {
      UserID: userId,
      FirstName: firstname,
      LastName: lastname,
      Email: email,
      UserTypeID: userType,
    };
    let result = await createUser(userObj);
    alert(`Status : ${result.status}, ${result.body}`);
  }

  function formatUser(userObject) {
    return (
      <div>
        <h2>User ID: {userObject.UserID}</h2>
        <p>
          First Name: {userObject.FirstName}
          <br />
          Last Name: {userObject.LastName}
          <br />
          Email: {userObject.Email}
          <br />
          User Type Id: {userObject.UserTypeID}
        </p>
      </div>
    );
  }

  const createUserForm = () => {
    return (
      <form>
        <h1>Create User</h1>
        <TextField
          id="outlined-basic"
          label="userid"
          variant="outlined"
          value={userId}
          onChange={(event) => setUserId(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="First name"
          variant="outlined"
          value={firstname}
          onChange={(event) => setFirstname(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Last name"
          variant="outlined"
          value={lastname}
          onChange={(event) => setLastname(event.target.value)}
        />
        <TextField
          id="outlined-basic"
          label="Email"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={userOpen}
          onClose={() => setUserOpen(false)}
          onOpen={() => setUserOpen(true)}
          value={userType}
          onChange={(event) => {
            setUserType(event.target.value);
          }}
        >
          <MenuItem value={TYPE.CUSTOMER}>Customer</MenuItem>
          <MenuItem value={TYPE.DEALERSHIP}>Dealership</MenuItem>
          <MenuItem value={TYPE.ADMIN}>Admin</MenuItem>
        </Select>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPressCreateUser()}
        >
          Create User
        </Button>
      </form>
    );
  };

  const vehiclesList = () => {
    return (
      <div>
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
        <div>
          {modelList &&
            modelList.map((model, index) => {
              return <div key={index}>{model.ModelName}</div>;
            })}
        </div>
      </div>
    );
  };

  const searchingForm = () => {
    return <div>searching form</div>;
  };
  return (
    <div>
      <h2>User List</h2>
      {usersList &&
        usersList.map((user, index) => {
          return <div key={index}>{formatUser(user)}</div>;
        })}
      <Button
        variant="contained"
        color="primary"
        onClick={() => onPressGetUsersList()}
      >
        Get users
      </Button>

      <br />
      <h2>Searched User</h2>
      {searchedUser && formatUser(searchedUser)}
      <form>
        <TextField
          id="outlined-basic"
          label="User Id"
          variant="outlined"
          value={searchUserId}
          onChange={(event) => setSearchUserId(event.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => onPressGetUserById()}
        >
          Get user by id
        </Button>
      </form>
      <br />
      {createUserForm()}
      {vehiclesList()}
      {searchingForm()}
    </div>
  );
}
