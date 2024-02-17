import * as React from "react";
import { useState } from "react";
import {
  Grid,
  TextField,
  Box,
  Paper,
  InputLabel,
  Checkbox,
  Button,
  FormControlLabel,
  FormGroup,
} from "@mui/material";
import dayjs from "dayjs";
import { Link } from "react-router-dom";

import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import Header from "../Layouts/Header";

function Community() {
  return (
    <>
      <Header />

      <Paper
        elevation={3}
        sx={{ marginRight: "15%", marginLeft: "15%", paddingBottom: "5%" }}
      >
        <Box sx={{ padding: 5 }}>
          {/*Question*/}
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "left",
                fontWeight: 700,
              }}
            >
              What were the names of the Neighborhoods you grew up in?
            </InputLabel>
          </Grid>
          {/*Neighborhood/Location Text Field*/}
          <Box
            sx={{
              marginRight: "15%",
              paddingBottom: "40px",
              justifyContent: "left",
            }}
          >
            <Grid item xs={12} sm={10}>
              <TextField
                required
                multiline={true}
                rows={5}
                id="neighborhood"
                label="Neighborhoods"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*Social Disadvantages*/}
          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "left",
                fontWeight: 700,
              }}
            >
              Select all the social disadvantages you have experienced:
            </InputLabel>
          </Grid>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox />}
              label="Limited access to healthy food options"
            />
            <FormControlLabel control={<Checkbox />} label="Poverty" />
            <FormControlLabel
              control={<Checkbox />}
              label="Lack of HealthCare Options"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Fights/Other violent conflicts"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Unsafe and poor quality schools"
            />
            <FormControlLabel control={<Checkbox />} label="Crime" />
            <FormControlLabel control={<Checkbox />} label="Gun violence" />
            <FormControlLabel control={<Checkbox />} label="Substance abuse" />
            <FormControlLabel control={<Checkbox />} label="Prostitution" />
            <FormControlLabel
              control={<Checkbox />}
              label="Poort Infrastructure"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Limited accesss to healthcare"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Economic stagnation"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Inadequate public service"
            />
            <FormControlLabel control={<Checkbox />} label="Social Isolation" />
            <FormControlLabel
              control={<Checkbox />}
              label="Lack of Safe Recreational Areas"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Poor public transportation"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Housing Instability"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Environmental Hazards"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Lack of safe Outdoor Spaces"
            />
            <FormControlLabel
              control={<Checkbox />}
              label="Residential Segregation"
            />
          </FormGroup>

          {/*Other Notes Text */}

          <Grid item xs={12} sm={2}>
            <InputLabel
              sx={{
                display: "flex",
                justifyContent: "left",
                fontWeight: 700,
              }}
            >
              Other notes:
            </InputLabel>
          </Grid>
          {/*Other Notes Text Field*/}
          <Box
            sx={{
              marginRight: "15%",
              paddingBottom: "40px",
              justifyContent: "left",
            }}
          >
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
          </Box>
        </Box>
        <Button variant="contained" style={{ marginRight: "30px" }}>
          <Link to="/familyDynamics" style={{ textDecoration: "none" }}>
            Previous
          </Link>
        </Button>
        <Button variant="contained">Next</Button>
      </Paper>
    </>
  );
}

export default Community;
