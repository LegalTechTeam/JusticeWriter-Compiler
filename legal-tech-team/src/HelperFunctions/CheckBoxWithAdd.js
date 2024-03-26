import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import AddQuotes from "./AddQuotes";

function CheckboxWithAdd(props) {
  //console.log(props.checked + " " + props.id);
  const [checked, setChecked] = useState(props.checked);
  const [subChecked, setSubChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
    setSubChecked(props.checked);
  }, [props.checked]);

  const handleChange = (event) => {
    console.log("in handle change");
    const isChecked = event.target.checked;
    setChecked(event.target.checked);
    if (props.onChange) {
      props.onChange(props.id, isChecked);
    }
  };

  const handleSubChange = (event) => {
    console.log("in handle change");
    const isChecked = event.target.checked;
    setChecked(event.target.checked);
    if (props.onChange) {
      props.onChange(props.id, isChecked);
    }
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
          {/* {props.subs.map((sub, index) => (
            <div
              style={{
                display: "flex",
                flexDirection: "row",
              }}
              key={index}
            >
              <FormControlLabel
                control={
                  <Checkbox checked={subChecked} onChange={handleSubChange} />
                }
                label={sub.label} // Accessing the label key of the sub object
              />
              <AddQuotes />
            </div>
          ))} */}
        </FormGroup>
      )}
    </>
  );
}

export default CheckboxWithAdd;
