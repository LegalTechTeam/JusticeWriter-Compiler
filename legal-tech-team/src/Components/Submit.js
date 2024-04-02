import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Button, TextField } from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import { DownloadJsonData } from "../HelperFunctions/formatJSON";
import { generateReport } from "../HelperFunctions/apiCalls";

function Submit() {
  const navigate = useNavigate();

  const [sud, setSUD] = useState("no");
  const [treatedSUD, setTreatedSUD] = useState("no");
  const [file, setFile] = useState(null); // State to store the selected file
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [wifiConnected, setWifiConnected] = useState(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first file from the array
    setFile(selectedFile);
  };

  const handleSubmit = () => {
    // Perform submission logic here with the selected file
    console.log("Selected file:", file);

    // You can now use the 'file' variable to upload the selected file
    // Example: generateReport(file);

    // After successful submission, set the submitSuccess state to true
    setSubmitSuccess(true);
  };

  const handleWifiConnect = () => {
    // Simulate connecting to WiFi (replace with actual logic)
    console.log("Connecting to WiFi...");
    setWifiConnected(true);
  };

  console.log("wifiConnected:", wifiConnected);
  console.log("submitSuccess:", submitSuccess);

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
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Box sx={{ padding: 3, textAlign: "center" }}>
          <Typography variant="h6" gutterBottom sx={{ paddingBottom: 5 }}>
            Successfully Saved
          </Typography>

          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
              paddingBottom: "30px",
            }}
          >
            Report will be generated once connected to WiFi.
          </Box>

          <Box sx={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={() => { DownloadJsonData(); navigate("/submit"); }}>
              Open Raw Notes
            </Button>

            {!wifiConnected && (
              <Button variant="contained" onClick={handleWifiConnect} style={{ marginLeft: "10px" }}>
                Connect to WiFi
              </Button>
            )}

            {wifiConnected && !submitSuccess && (
              <Box sx={{ marginTop: "20px" }}>
                <input type="file" onChange={handleFileChange} />
                <Button variant="contained" onClick={handleSubmit} style={{ marginLeft: "10px", marginTop: "10px" }}>
                  Submit
                </Button>
              </Box>
            )}

            {submitSuccess && (
              <Typography variant="body1" style={{ marginTop: "10px", color: "green" }}>
                Success! File submitted.
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default Submit;
