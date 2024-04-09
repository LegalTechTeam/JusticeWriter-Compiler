import { Grid, InputLabel, TextField } from "@mui/material";

function BigText(props) {
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
          {props.question}
        </InputLabel>
      </Grid>
      ;
      <Grid item xs={12} sm={10}>
        <TextField
          required
          multiline={true}
          rows={5}
          id={props.id}
          label={props.label}
          fullWidth
          variant="outlined"
        />
      </Grid>
      ;
    </>
  );
}
export default BigText;
