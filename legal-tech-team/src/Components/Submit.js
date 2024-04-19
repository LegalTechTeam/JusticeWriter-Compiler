import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
} from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import { DownloadJsonData } from "../HelperFunctions/formatJSON";

import { IPatch, patchDocument, PatchType, TextRun } from "docx";
import { saveAs } from "file-saver";

import { generateReport, summarizeFile } from "../HelperFunctions/apiCalls";
import JSZip from "jszip";
import { handleTemplateInput } from "../HelperFunctions/GenerateWordDocument";
import { clearJSON } from "../HelperFunctions/formatJSON";
await import("pdfjs-dist/build/pdf.worker.min.mjs");

function Submit() {
  const navigate = useNavigate();
  const [file, setFile] = useState(null); // State to store the selected file
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [wifiConnected, setWifiConnected] = useState(false);
  const fileInputRef = React.useRef(null);
  const [callSuccess, setCallSuccess] = useState(false);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState(
    "Write a detailed long-form expert witness paragraph on below for a professional legal proceeding. The language should be written as a sociologist, expert in forensic psychology, and professional writer.The notes section in the JSON are to be treated as quotes (DO NOT CHANGE THOSE)"
  );

  var called = 1;
  useEffect(() => {
    if (file !== null && submitSuccess) {
      generateReport(file, inputText);

      console.log("called once!");
    }
  }, [file, submitSuccess]);

  useEffect(() => {
    return () => {
      setFile(null);
      setSubmitSuccess(false);
      setWifiConnected(false);
    };
  }, []);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0]; // Get the first file from the array

    // Create a new FileReader instance
    const reader = new FileReader();

    // Callback function to handle the file reading process
    reader.onload = (e) => {
      try {
        // Parse the file contents as JSON
        const jsonData = JSON.parse(e.target.result);
        setFile(jsonData);

        // Now you can work with the parsed JSON data
        console.log("Parsed JSON data:", jsonData);

        // Set the parsed JSON data to state or perform further processing
        // For example, you can call the generateReport function with the parsed JSON data:
        //generateReport(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };

    // Read the file contents as text
    reader.readAsText(selectedFile);

    // Set the selected file to state
  };

  const handleSubmit = () => {
    setSubmitSuccess(true);
    setCallSuccess(true);

    setInputText(inputText);
  };

  const handleWifiConnect = () => {
    // Simulate connecting to WiFi (replace with actual logic)
    console.log("Connecting to WiFi...");
    setWifiConnected(true);
  };

  const handleFileChange_summarize = (event) => {
    const selectedFile = event.target.files[0]; // Get the first file from the array
    handleSummarizeFiles(selectedFile); // Call the summarize files function with the selected file
  };

  // Function to handle the "Summarize Files" button click
  const handleSummarizeFiles = async (selectedFile) => {
    fileInputRef.current.click();
    try {
      // Check if selectedFile is defined
      if (!selectedFile) {
        console.error("No file selected for summarization.");
        return;
      }

      // Load the zip file
      const zip = await JSZip.loadAsync(selectedFile);

      // Initialize an array to store summaries
      const summaries = [];

      // Iterate through each file in the zip
      zip.forEach(async (relativePath, file) => {
        if (relativePath.endsWith(".pdf")) {
          // Extract the PDF file
          const pdfData = await file.async("uint8array");

          // Process the PDF data (e.g., extract text, summarize)
          const summary = await summarizeFile(pdfData);

          // Store the summary
          summaries.push({ filename: relativePath, summary });
        }
      });

      // Display the summaries
      console.log("Summaries:", summaries);
    } catch (error) {
      console.error("Error summarizing files:", error);
    }
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
            <Button
              variant="contained"
              onClick={() => {
                DownloadJsonData();
                navigate("/submit");
              }}
            >
              Open Raw Notes
            </Button>

            {!wifiConnected && (
              <Button
                variant="contained"
                onClick={handleWifiConnect}
                style={{ marginLeft: "10px" }}
              >
                Generate Report
              </Button>
            )}

            {!wifiConnected && (
              <Button
                variant="contained"
                style={{ marginLeft: "10px" }}
                onClick={handleSummarizeFiles}
              >
                Summarize Files
              </Button>
            )}

            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  navigate("/evidence");
                }}
              >
                {" "}
                Previous
              </Button>
            </Box>
            <Box sx={{ marginTop: "20px" }}>
              <Button
                variant="contained"
                onClick={() => {
                  clearJSON();
                  navigate("/");
                }}
              >
                {" "}
                Start new Report
              </Button>
            </Box>

            <input
              type="file"
              ref={fileInputRef}
              style={{ display: "none" }} // Hide the file input
              onChange={handleFileChange_summarize}
            />

            {wifiConnected && !submitSuccess && (
              <>
                <Box sx={{ marginTop: "20px" }}>
                  <input type="file" onChange={handleFileChange} />
                  <Button
                    variant="contained"
                    onClick={handleOpen}
                    style={{ marginLeft: "10px", marginTop: "10px" }}
                  >
                    Submit
                  </Button>
                </Box>
                <Dialog open={open} onClose={handleClose} maxWidth="lg">
                  <DialogTitle>Prompt (if want to change)</DialogTitle>
                  <DialogContent style={{ width: "60vw" }}>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Prompt"
                      type="text"
                      fullWidth
                      value={inputText}
                      // InputLabelProps={{
                      //   style: { maxWidth: "100vw" },
                      // }}
                      onChange={(e) => setInputText(e.target.value)}
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button variant="contained" onClick={handleClose}>
                      Close
                    </Button>
                    <Button variant="contained" onClick={handleSubmit}>
                      Submit
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            )}

            {wifiConnected && !submitSuccess && callSuccess && (
              <Box sx={{ marginTop: "20px" }}>
                <input type="file" onChange={handleTemplateInput} />
              </Box>
            )}

            {submitSuccess && (
              <Typography
                variant="body1"
                style={{ marginTop: "10px", color: "green" }}
              >
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
