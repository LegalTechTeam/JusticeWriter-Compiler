import * as React from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  InputLabel,
  Button,
  Radio,
  FormControlLabel,
} from "@mui/material";
import "react-dropdown/style.css";

import Header from "../Layouts/Header";
import themeSubHeading from "../Layouts/Theme";
function MentalHealth() {
  const navigate = useNavigate();
  const themeTitle = themeSubHeading();

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
        <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
          Mental Health Treatment
        </Typography>

        {/* First Yes or No Question */}
        <Box sx={{ paddingRight: 5, paddingLeft: 5, paddingBottom: 5 }}>
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid container>
              <Grid item xs={7}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    marginBottom: 1,
                  }}
                >
                  Have you ever received behavioral or mental health treatment?
                </InputLabel>
              </Grid>
              <Grid item xs={5}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </Grid>
            </Grid>
          </Box>

          {/*Second Yes or no question */}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid container>
              <Grid item xs={7}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    textWrap: "balance",
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Have you ever participated in a mental health or drug program?
                </InputLabel>
              </Grid>

              <Grid item xs={5}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </Grid>
            </Grid>
          </Box>

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
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Treatments/Counseling (if any)
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Treatments/Counseling"
                label="Treatments/Counseling"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          <Typography variant="h6" gutterBottom sx={{ ...themeTitle }}>
            Evidence of Character and Potential To Change
          </Typography>

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
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Provide an example of your character
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Character Examples"
                label="Character Examples"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

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
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Give examples of good deeds and contributions that you’ve made
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Good Deeds"
                label="Good Deeds"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

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
                  label: "Size",
                  id: "outlined-size-small",
                  defaultValue: "Small",
                  size: "small",
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                List any volunteering, employment, mentoring, community
                engagement that you’ve done
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Extracurriculars"
                label="Extracurriculars"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "10%",
              paddingBottom: "30px",
            }}
          >
            <Grid container>
              <Grid item xs={7}>
                <InputLabel
                  sx={{
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                    fontWeight: 700,
                    textWrap: "balance",
                    marginBottom: 1, // Adjust spacing as needed
                  }}
                >
                  Are you a parent?
                </InputLabel>
              </Grid>
              <Grid item xs={5}>
                <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="no" control={<Radio />} label="No" />
              </Grid>
            </Grid>
          </Box>
        </Box>

        <Button
          variant="contained"
          onClick={() => navigate("/peers-role-models")}
        >
          Previous
        </Button>

        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>

        <Button variant="contained" onClick={() => navigate("/evidence")}>
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default MentalHealth;
