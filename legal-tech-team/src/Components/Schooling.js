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
  FormControl,
  Select,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
  FormGroup,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";

function Schooling() {
  const navigate = useNavigate();

  const [sud, setSUD] = useState("no");
  const [treatedSUD, setTreatedSUD] = useState("no");

  const handleSUDChange = (event) => {
    setSUD(event.target.value);
  };

  const handleTreatedSUDChange = (event) => {
    setTreatedSUD(event.target.value);
  };

  const [schoolQuality, setSchoolQuality] = useState();
  const handleSchoolQualityChange = (event) => {
    setSchoolQuality(event.target.value);
  }

  return (
    <div>

      <Header />

      <Paper
        elevation={3}
        sx={{ marginRight: "10%", marginLeft: "15%", paddingBottom: "5%" }}
      >
        <Box sx={{ padding: 5 }}>
        <Typography variant="h6">
            Schooling
          </Typography>
          </Box>
          {/*input one*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                List names and school grades of the schools you attended
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Schools attended"
                label="Schools attended"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*input two*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                How many times did you change schools?
              </InputLabel>

              <TextField
                required
                multiline={false}
                id="School changes"
                label="School changes"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*input three*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                What were your experiences and grades like at school?
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="School experiences"
                label="School experiences"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>
          {/*input four*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
              paddingBottom: "30px",
            }}
          >
            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Rate the quality of your school
              </InputLabel>
            </Grid>
            <Grid item xs={12} sm={3}>
              <RadioGroup
                row
                aria-label="answer"
                name="answer"
                value={schoolQuality}
                onChange={handleSchoolQualityChange}
              >
                <FormControlLabel value="Poor" control={<Radio />} label="Poor" />
                <FormControlLabel value="Average" control={<Radio />} label="Average" />
                <FormControlLabel value="Good" control={<Radio />} label="Good" />
                <FormControlLabel value="Excellent" control={<Radio />} label="Excellent" />
              </RadioGroup>

            </Grid>
          </Box>
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
              paddingBottom: "30px",
            }}>
            {/*input five*/}
            <Grid item xs={12} sm={8}>
              <InputLabel
                sx={{
                  display: "flex",
                  justifyContent: "left",
                  fontWeight: 700,
                }}
              >
                Have you every been:
              </InputLabel>
            </Grid>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox />}
                label="Suspended"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Expelled"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="Dropped Out"
              />
              <FormControlLabel
                control={<Checkbox />}
                label="None of the above"
              />
            </FormGroup>
          </Box>


          <Divider orientation="horizontal" flexItem />

          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 3 }}>
            Adverse Childhood Experience
          </Typography>

          {/*emotional abuse input*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                Emotional Abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Emotional Abuse"
                label="Emotional Abuse"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*Physical abuse input*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                Physical Abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Physical Abuse"
                label="Physical Abuse"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

          {/*Sexual Abuse*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
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
                Sexual Abuse
              </InputLabel>

              <TextField
                required
                multiline={true}
                rows={3}
                id="Sexual Abuse"
                label="Sexual Abuse"
                fullWidth
                variant="outlined"
              />
            </Grid>
          </Box>

        <Button variant="contained" onClick={() => navigate("/community")}>
          Previous
        </Button>
        <span style={{ marginLeft: "10px", marginRight: "10px" }}></span>
        <Button
          variant="contained"
          onClick={() => navigate("/aceOne")}
        >
          Next
        </Button>
      </Paper>
    </div>
  );
}
export default Schooling;
