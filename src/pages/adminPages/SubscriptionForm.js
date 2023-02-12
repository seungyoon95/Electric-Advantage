import React, { useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../components/controls/Controls";
import { useForm, Form } from "../../components/AdminUseForm";
import { createSubscriptionPlan } from "../../api/SubscriptionAPI";
import { Select, MenuItem } from "@material-ui/core";
import BILLINGCYCLE from "../../constants/BillingCycle";

// Initial input field values.
const initialFValues = {
  id: 0,
  planID: "",
  planName: "",
  pricing: "",
  billing: "",
};

// Form used for creating a new subscription plan.
export default function SubscriptionForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [name, setName] = React.useState("");
  const [price, setPrice] = React.useState("");
  const [selectedBillingCyle, setSelectedBillingCycle] = React.useState("");
  const [cycleOpen, setCycleOpen] = React.useState(false);

  // Onclick function to create a new subscription plan.
  async function onClickCreateSubscriptionPlan() {
    let subscriptionObj = {
      PlanName: name,
      Pricing: price,
      BillingCycle: selectedBillingCyle,
    };
    let result = await createSubscriptionPlan(subscriptionObj);
    if (result.status !== 201) {
      alert("Failed to create a plan. Please try again later.");
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

  // Validates input and add or edit subscription when submit button is clicked.
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isEmpty(name) || isEmpty(price) || isEmpty(selectedBillingCyle)) {
      alert("Values cannot be empty!");
    } else {
      await onClickCreateSubscriptionPlan();
      if (validate()) {
        addOrEdit(values, resetForm);
      }
    }
  };

  // Set input field values to corresponding attributes in the subscription database.
  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    // Structures the subscription add form.
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={6}>
          {/* Input field for planName. */}
          <Controls.Input
            label="Subscription Plan"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          {/* Input field for pricing. */}
          <Controls.Input
            label="Pricing"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
          />
          {/* Dropdown menu for billing cycle. */}
          <Select
            style={{ width: "20vh", marginLeft: "1vh" }}
            open={cycleOpen}
            displayEmpty
            onClose={() => setCycleOpen(false)}
            onOpen={() => setCycleOpen(true)}
            value={selectedBillingCyle}
            onChange={(event) => {
              setSelectedBillingCycle(event.target.value);
            }}
          >
            {/* Disabled dropdown menu item to indicate this is for the billing cycle. */}
            <MenuItem value="" disabled>
              - Select Billing Cycle -
            </MenuItem>
            {/* List of available billing cycles. */}
            <MenuItem value={BILLINGCYCLE.MONTH}>Monthly</MenuItem>
            <MenuItem value={BILLINGCYCLE.ANNUAL}>Annually</MenuItem>
          </Select>
        </Grid>
        <Grid item xs={6}>
          <div>
            {/* When add button is clicked. */}
            <Controls.Button type="submit" text="Submit" />
          </div>
        </Grid>
      </Grid>
    </Form>
  );
}
