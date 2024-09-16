import {
  Typography
} from "@mui/material";
import * as React from "react";

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
        borderTop: `0.5px solid #1f2839`, // Blue border
        paddingBottom: "10px",
      }}
    >
      {props.name}
    </Typography>
  );
}
