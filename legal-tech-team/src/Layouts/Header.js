import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { Paper } from "@mui/material";
function Header() {
  return (
    <Paper elevation={3} sx={{ marginRight: "15%", marginLeft: "15%" }}>
      <AppBar position="static" style={{ backgroundColor: "#458FFF" }}>
        <Toolbar>
          <Typography variant="h5" color="inherit" style={{ flex: 1 }}>
            Interview
          </Typography>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

export default Header;
