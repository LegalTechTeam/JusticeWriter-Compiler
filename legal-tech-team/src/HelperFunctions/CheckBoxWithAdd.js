import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import * as React from "react";
import { useEffect, useState } from "react";

import AddQuotes from "./AddQuotes";

function CheckboxWithAdd(props) {
  const { id, handleQuotesChange, section } = props;
  //console.log(props.checked + " " + props.id);
  const [checked, setChecked] = useState(props.checked);

  useEffect(() => {
    setChecked(props.checked);
  }, [props.checked]);

  const handleChange = (event) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    if (props.onChange) {
      props.onChange(props.id, isChecked);
    }
  };
  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
    handleQuotesChange(newQuotes);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          paddingBottom: "5px",
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
