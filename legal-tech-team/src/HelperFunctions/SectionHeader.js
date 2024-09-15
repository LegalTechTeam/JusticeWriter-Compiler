import {
  Box,
  Typography
} from "@mui/material";
import * as React from "react";
export default function SectionHeader(props) {
  return (
    <>
      {/* Background Section Header */}
      <Box
        sx={{
          marginTop: "30px",
          borderRadius: "8px",
          backgroundColor: "#ffffff",
        }}
      >
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 200, // Bold for emphasis
            fontFamily: "Noto Sans",
            textAlign: "center",
            background: "rgba(31, 40, 57, 0.9)",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            letterSpacing: "1px", // Slight letter spacing for better readability
          }}
        >
          {props.name}
        </Typography>
      </Box>
    </>
  );
}
