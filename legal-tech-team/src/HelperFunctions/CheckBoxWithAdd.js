import * as React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

import AddQuotes from "./AddQuotes";

function CheckboxWithAdd(props) {
  const { id, handleQuotesChange, section } = props;
  //console.log(props.checked + " " + props.id);
  const [checked, setChecked] = useState(props.checked);
  const [subChecked, setSubChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
    setSubChecked(props.checked);
  }, [props.checked]);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked); // Update the checked state
    if (props.onChange) {
      props.onChange(props.id, isChecked);
      //props.handleQuotesChange(props.id, isChecked ? [""] : []);
    }
  };
  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
    handleQuotesChange(newQuotes);
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
        <AddQuotes
          quotes={quotes}
          section={section}
          id={id}
          onQuotesChange={quotesAdded}
        />{" "}
      </div>
      {checked && (
        <FormGroup
          style={{
            display: "flex",
            flexDirection: "column",
            paddingLeft: "25px",
          }}
        ></FormGroup>
      )}
    </>
  );
}

export default CheckboxWithAdd;
