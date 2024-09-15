import { Box, Typography } from "@mui/material";
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
          display: "flex", // Flexbox to align the number and title
          justifyContent: "center", // Center the title
          alignItems: "center", // Vertically align the elements
          position: "relative", // Position for absolute number
          background: "rgba(31, 40, 57, 0.9)",

        }}
      >
        {/* Number on the left */}
        <Typography
          variant="h5"
          sx={{
            fontWeight: 200,
            fontFamily: "Noto Sans",
            position: "absolute", // Position it absolutely on the left
            left: "20px", // Adjust based on your design
            top: "50%",
            transform: "translateY(-50%)", // Center vertically
            color: "white",
          }}
        >
          {props.number}
        </Typography>

        {/* Section Title */}
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 200, // Light for emphasis
            fontFamily: "Noto Sans",
            textAlign: "center",
            color: "white",
            borderRadius: "4px",
            boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
            letterSpacing: "1px", // Slight letter spacing for better readability
            padding: "10px 20px",
            width: "100%", // Ensure the title fills the entire width of the container
            maxWidth: "500px", // Optional: You can set a max-width if needed
          }}
        >
          {props.name}
        </Typography>
      </Box>
    </>
  );
}
