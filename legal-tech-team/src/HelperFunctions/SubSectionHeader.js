import * as React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Typography,
  TextField,
  Box,
  Paper,
  Divider,
  Button,
  ThemeProvider,
} from "@mui/material";

export default function SubSectionHeader(props) {
  return (
    <Typography
      variant="h6"
      gutterBottom
      sx={{
        fontWeight: 500, // Medium weight for subheading
        color: "#1f2839", // Blue color for consistency
        fontFamily: "Noto Sans",
        textTransform: "uppercase", // Uppercase for a formal look
        borderBottom: `0.5px solid #1f2839`, // Blue border
        paddingBottom: "10px",
      }}
    >
      {props.name}
    </Typography>
  );
}
