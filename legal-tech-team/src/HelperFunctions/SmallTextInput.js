import { Grid, InputLabel, TextField } from "@mui/material";
function SmallTextInput(props) {
  return (
    <>
      <Grid item xs={12} sm={2}>
        <InputLabel
          sx={{
            display: "flex",
            justifyContent: "left",
            fontWeight: 700,
          }}
        >
          {props.field}
        </InputLabel>
      </Grid>

      {/*First Name text field*/}
      <Grid item xs={12} sm={4}>
        <TextField
          required
          id={props.id}
          label={props.label}
          fullWidth
          size="small"
          variant="outlined"
        />
      </Grid>
    </>
  );
}
export default SmallTextInput;
