import * as React from "react";
import { useState } from "react";
import { Grid, TextField, InputLabel } from "@mui/material";

function OtherNotes() {
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
        </InputLabel>
      </Grid>
      {/*Other Notes Text Field*/}

      <Grid item xs={12} sm={10}>
        <TextField
          required
          multiline={true}
          rows={4}
          id="other"
          fullWidth
          variant="outlined"
        />
      </Grid>
    </>
  );
}

export default OtherNotes;
