import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Button } from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";

function Submit() {
  const navigate = useNavigate();

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
        <Box sx={{ padding: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Successfully Saved
          </Typography>

          {/*input emotional neglect*/}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
              paddingBottom: "30px",
            }}
          >
            Report will be sent to your email once connected to WiFi.
          </Box>
        </Box>

        <Button variant="contained" onClick={() => navigate("/submit")}>
          Open Raw Notes
        </Button>
      </Paper>
    </div>
  );
}
export default Submit;
