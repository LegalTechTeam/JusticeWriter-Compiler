import * as React from "react";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import AddQuotes from "./AddQuotes";

function CheckboxWithAdd(props) {
  const [checked, setChecked] = useState(false);
  const handleChange = (event) => {
    setChecked(event.target.checked);
  };
  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
        }}
      >
        <FormControlLabel
          control={<Checkbox checked={checked} onChange={handleChange} />}
          label={props.label}
        />

        <AddQuotes />
      </div>
      {checked && (
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "25px",
          }}
        >
          {props.subs.map((sub, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
              key={index}
            >
              <FormControlLabel
                control={<Checkbox />}
                label={sub.label} // Accessing the label key of the sub object
              />
              <AddQuotes />
            </div>
          ))}
        </FormGroup>
      )}
    </>
  );
}

export default CheckboxWithAdd;
