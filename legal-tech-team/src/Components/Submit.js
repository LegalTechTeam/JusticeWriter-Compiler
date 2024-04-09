import * as React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Box, Paper, Button } from "@mui/material";
import dayjs from "dayjs";

import Header from "../Layouts/Header";
import { DownloadJsonData } from "../HelperFunctions/formatJSON";
import { IPatch, patchDocument, PatchType, TextRun } from "docx";
import { saveAs } from 'file-saver';
import template from '../Assets/template.docx';
import JSZip from 'jszip';

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


        <Button variant="contained" onClick={() => { patch2(); /*DownloadJsonData();*/ navigate("/submit"); }}>
          Open Raw Notes
        </Button>
        <div>
          <input type="file" onChange={handleFileChange} />
        </div>
      </Paper>
    </div>
  );
}

export const font = "Trebuchet MS"
export const getPatches = fields => {
  const patches = {}

  for (const field in fields) {
    patches[field] = {
      type: PatchType.PARAGRAPH,
      children: [new TextRun({ text: fields[field], font })]
    }
  }

  return patches
}

const patches = getPatches({
  name: "Mr",
  table_heading_1: "John",
  item_1: "Doe",
  paragraph_replace: "Lorem ipsum paragraph"
})

function patch2(file) {
  //const temp = new File(template, "temp");
  //const url = URL.createObjectURL(temp);
  // Create a URL for the file using createObjectURL
  const url = URL.createObjectURL(template.toString());
  // Convert loaded data to Blob
  console.log(url);
  fetch(url)
    .then((response) => response.blob())
    .then((data) =>
      patchDocument(data, {
        outputType: "blob",
        patches,
      })
    )
    .then((patchedData) => {
      uint8ArrayToWordDoc(patchedData);
      //saveAs(bl, 'My Document.docx');
    })
    .catch((error) => {
      console.error('Error patching document:', error);
    });
};

function uint8ArrayToWordDoc(uint8Array) {
  // Convert Uint8Array to Blob
  const blob = new Blob([uint8Array], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });

  // Create Object URL for the Blob
  const url = URL.createObjectURL(blob);

  // Download or Display the Word document
  // For downloading, you can create an anchor element and simulate a click
  const a = document.createElement('a');
  a.href = url;
  a.download = 'MyDocument.docx'; // Specify the filename
  document.body.appendChild(a);
  a.click();

  // Cleanup by revoking the Object URL
  URL.revokeObjectURL(url);
}


const patch = (file) => {

  const reader = new FileReader();

  reader.onload = function (event) {
    try {
      const data = event.target.result;
      const blob = new Blob([data], {
        type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      }); // Convert loaded data to Blob

      patchDocument(file, {
        outputType: 'blob',
        patches,
      }).then((patchedData) => {
        const bl = new Blob(patchedData, {
          type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        saveAs(bl, 'My Document');
      });
    } catch (error) {
      console.error('Error reading file:', error);
    }
  };

  reader.onerror = function (event) {
    console.error('File reading error:', event.target.error);
  };

  if (file) {
    reader.readAsArrayBuffer(file);
  }
}

const handleFileChange = (event) => {
  const file = event.target.files[0];
  console.log(file);
  patch2(file);
};

export default Submit;
