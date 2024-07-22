import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@material-ui/core/CircularProgress";
import {
  Typography,
  Box,
  Paper,
  Button,
  TextField,
  FormLabel,
  Dialog,
  DialogContent,
  DialogActions,
  DialogTitle,
  ThemeProvider,
  Zoom,
} from "@mui/material";
import { DownloadJsonData, clearJSON } from "../HelperFunctions/formatJSON";
import { generateReport, summarizeFile } from "../HelperFunctions/apiCalls";
import JSZip from "jszip";
import Header from "../Layouts/Header";
import HomeIcon from "@mui/icons-material/Home";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SaveIcon from "@mui/icons-material/Save";
import { chatPatches } from "../HelperFunctions/apiCalls";
import BarChartIcon from "@mui/icons-material/BarChart";
import { handleTemplateInput } from "../HelperFunctions/GenerateWordDocument";

import NoteAddIcon from "@mui/icons-material/NoteAdd";
import "./styles.css"; // Import the CSS file for custom styles
import themeWrapper from "../Layouts/ThemeWrapper.js";

const prompts = {
  grammar: ["Write in third person.", "Do not write run-on sentences."],
  tone: [
    "Write professionally and in full sentences. Do NOT omit any information and do NOT write in bullet points. Using only the provided data, generate a paragraph that accurately reflects interviewee's experiences. Do not infer or add any new information beyond what is given.",
  ],
  quotes: [
    "The notes section of the data should be treated as direct quotes. Insert direct quotes using quotation marks. Do not edit the direct quotes.",
    "Do not write curse words or expletives.",
  ],
  themes: [
    "Transform the following into complete sentences. Each point should be a complete sentence.",
  ],
};

const randIndex = Math.floor(Math.random() * prompts.tone.length);
const combinedQuotes = {
  grammar: prompts.grammar.join(" "),
  tone: prompts.tone[randIndex],
  quotes: prompts.quotes.join(" "),
  themes: prompts.themes.join(" "),
};

function Submit() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [file, setFile] = useState(null);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [wifiConnected, setWifiConnected] = useState(false);
  const fileInputRef = useRef(null);
  const [open, setOpen] = useState(false);
  const [inputText, setInputText] = useState({
    tone: combinedQuotes.tone,
    grammar: combinedQuotes.grammar,
    quotes: combinedQuotes.quotes,
    themes: combinedQuotes.themes,
  });

  useEffect(() => {
    if (file && submitSuccess) {
      generateReport(file, inputText);
      console.log("called once!");
    }
  }, [file, submitSuccess]);

  useEffect(() => {
    return () => {
      setFile(null);
      setSubmitSuccess(false);
      setWifiConnected(false);
      if (chatPatches) chatPatches = null;
      setIsLoading(false);
    };
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const jsonData = JSON.parse(e.target.result);
        setFile(jsonData);
      } catch (error) {
        console.error("Error parsing JSON:", error);
      }
    };
    reader.readAsText(selectedFile);
  };

  const handleSubmit = async () => {
    setSubmitSuccess(true);
    setIsLoading(true);
    await generateReport(file, inputText);
    setIsLoading(false);
    setOpen(false);
  };

  const handleWifiConnect = () => {
    console.log("Connecting to WiFi...");
    setWifiConnected(true);
  };

  const handleFileChangeSummarize = (event) => {
    const selectedFile = event.target.files[0];
    handleSummarizeFiles(selectedFile);
  };

  const handleSummarizeFiles = async (selectedFile) => {
    fileInputRef.current.click();
    if (!selectedFile) {
      console.error("No file selected for summarization.");
      return;
    }

    try {
      const zip = await JSZip.loadAsync(selectedFile);
      const summaries = [];
      zip.forEach(async (relativePath, file) => {
        if (relativePath.endsWith(".pdf")) {
          const pdfData = await file.async("uint8array");
          const summary = await summarizeFile(pdfData);
          summaries.push({ filename: relativePath, summary });
        }
      });
      console.log("Summaries:", summaries);
    } catch (error) {
      console.error("Error summarizing files:", error);
    }
  };

  return (
    <ThemeProvider theme={themeWrapper}>
      <div>
        <Header />
        <Paper
          elevation={3}
          sx={{
            marginRight: "15%",
            marginLeft: "15%",
            paddingBottom: "5%",
            fontFamily: "Noto Sans",
            padding: "2%",
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "center",
          }}
        >
          <Box sx={{ textAlign: "center" }}>
            <Typography
              variant="h2"
              gutterBottom
              sx={{
                paddingBottom: 5,
                display: "flex",
                alignItems: "center",
                gap: 5,
                fontFamily: "noto-sans",
              }}
            >
              <HomeIcon fontSize="extra-large" />
              HomePage
            </Typography>
            <Typography variant="body1" sx={{ margin: "0 10% 30px 10%" }}>
              Report will be generated once connected to WiFi.
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                  marginBottom: "20px",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ marginBottom: "10px", fontFamily: "noto-sans" }}
                >
                  Save and Submit
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    DownloadJsonData();
                    navigate("/");
                  }}
                  sx={{
                    marginBottom: "20px",
                    width: "80%",
                    transition: "transform 0.3s",
                  }}
                  className="zoom-button"
                  startIcon={<SaveIcon />}
                >
                  Save Raw Notes
                </Button>
              </Box>
              {!wifiConnected && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "100%",
                    marginBottom: "20px",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ marginBottom: "10px", fontFamily: "noto-sans" }}
                  >
                    Generate and View Reports
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={handleWifiConnect}
                    sx={{
                      marginLeft: "10px",
                      width: "80%",
                      marginBottom: "10px",
                      transition: "transform 0.3s",
                    }}
                    className="zoom-button"
                  >
                    Generate Report
                  </Button>
                  <Button
                    variant="contained"
                    onClick={() => navigate("/crime-stats")}
                    sx={{
                      marginLeft: "10px",
                      width: "80%",
                      transition: "transform 0.3s",
                    }}
                    className="zoom-button"
                    startIcon={<BarChartIcon />}
                  >
                    Crime Statistics
                  </Button>
                </Box>
              )}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  width: "100%",
                }}
              >
                <Typography
                  variant="h5"
                  sx={{ marginBottom: "10px", fontFamily: "noto-sans" }}
                >
                  Reports
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    clearJSON();
                    navigate("/demographics");
                  }}
                  sx={{
                    marginTop: "20px",
                    width: "80%",
                    transition: "transform 0.3s",
                  }}
                  className="zoom-button"
                  startIcon={<NoteAddIcon />}
                >
                  Start New Report
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate("/demographics")}
                  sx={{
                    marginTop: "20px",
                    width: "80%",
                    transition: "transform 0.3s",
                  }}
                  className="zoom-button"
                  startIcon={<NoteAddIcon />}
                >
                  Continue Previous Report
                </Button>
              </Box>
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                onChange={handleFileChangeSummarize}
              />
              {wifiConnected && !submitSuccess && (
                <>
                  <Box
                    sx={{
                      marginTop: "20px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                    }}
                  >
                    <input type="file" onChange={handleFileChange} />
                    <Button
                      variant="contained"
                      onClick={handleOpen}
                      sx={{
                        marginLeft: "10px",
                        marginTop: "10px",
                        width: "80%",
                        transition: "transform 0.3s",
                      }}
                      className="zoom-button"
                    >
                      Submit
                    </Button>
                  </Box>
                  <Dialog open={open} onClose={handleClose} maxWidth="lg">
                    <DialogTitle>Enter a prompt for each section</DialogTitle>
                    <DialogContent>
                      <TextField
                        label="Tone"
                        multiline
                        rows={4}
                        fullWidth
                        value={inputText.tone}
                        onChange={(e) =>
                          setInputText({ ...inputText, tone: e.target.value })
                        }
                        sx={{ marginBottom: "20px", marginTop: "30px" }}
                      />
                      <TextField
                        label="Grammar"
                        multiline
                        rows={4}
                        fullWidth
                        value={inputText.grammar}
                        onChange={(e) =>
                          setInputText({
                            ...inputText,
                            grammar: e.target.value,
                          })
                        }
                        sx={{ marginBottom: "20px" }}
                      />
                      <TextField
                        label="Quotes"
                        multiline
                        rows={4}
                        fullWidth
                        value={inputText.quotes}
                        onChange={(e) =>
                          setInputText({ ...inputText, quotes: e.target.value })
                        }
                        sx={{ marginBottom: "20px" }}
                      />
                      <TextField
                        label="Themes"
                        multiline
                        rows={4}
                        fullWidth
                        value={inputText.themes}
                        onChange={(e) =>
                          setInputText({ ...inputText, themes: e.target.value })
                        }
                        sx={{ marginBottom: "20px", marginTop: "10px" }}
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
              {isLoading && (
                <Box
                  display="flex"
                  flexDirection="column"
                  alignItems="center"
                  mt={2}
                  fontFamily="Noto Sans"
                >
                  <CircularProgress size={40} />
                  <Typography
                    variant="h6"
                    color="primary"
                    sx={{ marginTop: 2 }}
                  >
                    Calling API...
                  </Typography>
                </Box>
              )}
              {wifiConnected && submitSuccess && chatPatches && (
                <Box sx={{ marginTop: "20px" }}>
                  <FormLabel sx={{ marginRight: "20px" }}>
                    Insert Template Doc
                  </FormLabel>
                  <input type="file" onChange={handleTemplateInput} />
                </Box>
              )}
              {submitSuccess && (
                <Typography
                  variant="body1"
                  sx={{ marginTop: "10px", color: "green" }}
                >
                  Success! File submitted.
                </Typography>
              )}
            </Box>
          </Box>
        </Paper>
      </div>
    </ThemeProvider>
  );
}

export default Submit;
