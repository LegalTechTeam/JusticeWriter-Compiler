import * as React from "react";
import { useState } from "react";
import { Grid, TextField, InputLabel } from "@mui/material";
import AddQuotes from "./AddQuotes";
function OtherNotes(props) {
  const { id, handleQuotesChange, section } = props;

  const [quotes, setQuotes] = useState([]);

  const quotesAdded = (newQuotes) => {
    setQuotes((prevQuotes) => [...prevQuotes, ...newQuotes]);
    handleQuotesChange(newQuotes);
  };

  return (
    <>
      {/*Other Notes Text */}

      <Grid item xs={12} sm={2}>
        <InputLabel
          sx={{
            display: "flex",
            justifyContent: "left",
            fontWeight: 700,
            paddingTop: "5%",
          }}
        >
          Other notes:
          <AddQuotes
            quotes={quotes}
            section={section}
            id={id}
            onQuotesChange={quotesAdded}
          />{" "}
        </InputLabel>
      </Grid>
      {/*Other Notes Text Field*/}

      <Grid item xs={12} sm={10}>
        <TextField
          required
          multiline={true}
          rows={5}
          id="otherNotes"
          label="otherNotes"
          fullWidth
          variant="outlined"
          onChange={props.handleChange}
          value={props.value}
        />
      </Grid>
    </>
  );
}

export default OtherNotes;
