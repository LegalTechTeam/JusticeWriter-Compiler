import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Divider,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
function ACEp2() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

  const [sud, setSUD] = useState("no");
  const [treatedSUD, setTreatedSUD] = useState("no");

  const handleSUDChange = (event) => {
    setSUD(event.target.value);
  };

  const handleTreatedSUDChange = (event) => {
    setTreatedSUD(event.target.value);
  };

  return (
    <div>
      <Header />

      <Paper
        elevation={3}
        sx={{
          marginRight: "15%",
          marginLeft: "15%",
          paddingBottom: "5%",
          fontFamily: "Noto Sans",
        }}
      >
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Adverse Childhood Experience (cont.)
          </Typography>

          {/*input one*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Family member in prison (if any)
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Family in prison"
                label="Family in prison"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*input two*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Any significant losses or deaths
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Losses or deaths"
                label="Losses or deaths"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*input three*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Other traumatic experiences
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Other"
                label="Other"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          <Divider orientation="horizontal" flexItem />

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Drug Use
          </Typography>

          {/*drug input*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={10}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Types of drugs used and how often
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Drugs used"
                label="Drugs used"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*Question 1 Radio buttons*/}
          <Box
            sx={{ marginLeft: "10%", marginRight: "5%", paddingBottom: "5px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Ever been diagnosed with substance use disorder (SUD)?
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  row
                  aria-label="sud"
                  name="sud"
                  value={sud}
                  onChange={handleSUDChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>

          {/*Questionm 2 Radio buttons*/}
          <Box
            sx={{ marginLeft: "10%", marginRight: "5%", paddingBottom: "30px" }}
          >
            <Grid container spacing={3}>
              <Grid item xs={6}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Ever been tested or treated for SUD?
                </InputLabel>
              </Grid>
              <Grid item xs={6}>
                <RadioGroup
                  row
                  aria-label="treatedSUD"
                  name="treatedSUD"
                  value={treatedSUD}
                  onChange={handleTreatedSUDChange}
                >
                  <FormControlLabel
                    value="yes"
                    control={<Radio />}
                    label="Yes"
                  />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Button variant="contained" onClick={() => navigate("/aceOne")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <Button
          variant="contained"
          onClick={() => navigate("/peers-role-models")}
        >
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default ACEp2;
