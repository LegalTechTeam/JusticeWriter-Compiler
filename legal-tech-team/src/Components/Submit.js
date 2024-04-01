import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Button, TextField } from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import { DownloadJsonData } from "../HelperFunctions/formatJSON";
import { generateReport } from "../HelperFunctions/apiCalls";

function Submit() {
  // if connected to wifi, ask for file path 
  const navigate = useNavigate();

  // file path variable 
  const [sud, setSUD] = useState("no");
  const [treatedSUD, setTreatedSUD] = useState("no");
  const [filePath, setFilePath] = useState("");
  const [showFilePathInput, setShowFilePathInput] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false); // New state for submit success

  const handleSUDChange = (event) => {
    setSUD(event.target.value);
  };

  const handleTreatedSUDChange = (event) => {
    setTreatedSUD(event.target.value);
  };

  const handleConnectedToWifiClick = () => {
    setShowFilePathInput(true);
  };

  const handleFilePathChange = (event) => {
    const newFilePath = event.target.value;
    setFilePath(newFilePath);
    console.log("File path:", newFilePath); // Log the file path for debugging
  };

  const handleSubmit = () => {
    // Perform submission logic here with filePath
    console.log("File path:", filePath);
    // Set submit success to true
    generateReport(filePath);
    setSubmitSuccess(true);
  };

  console.log("Rendering Submit component"); // Log statement for component rendering

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

          {/* Input emotional neglect */}
          <Box
            sx={{
              marginLeft: "10%",
              marginRight: "15%",
              paddingBottom: "30px",
            }}
          >
            Report will be generated once connected to WiFi.
          </Box>

          {/* Container for buttons */}
          <Box sx={{ marginTop: "20px" }}>
            <Button variant="contained" onClick={() => { DownloadJsonData(); navigate("/submit"); }}>
              Open Raw Notes
            </Button>

            <Button variant="contained" onClick={handleConnectedToWifiClick} style={{ marginLeft: "10px" }}>
              Connected to WiFi
            </Button>

            {showFilePathInput && (
              <Box sx={{ marginTop: "20px" }}>
                <TextField
                  label="Enter File Path"
                  variant="outlined"
                  value={filePath}
                  onChange={handleFilePathChange}
                />
                <Button variant="contained" onClick={handleSubmit} style={{ marginLeft: "10px", marginTop: "10px" }}>
                  Submit
                </Button>
              </Box>
            )}

            {/* Display success message if submit success */}
            {submitSuccess && (
              <Typography variant="body1" style={{ marginTop: "10px", color: "green" }}>
                Success! File path submitted.
              </Typography>
            )}
          </Box>
        </Box>
      </Paper>
    </div>
  );
}

export default Submit;


