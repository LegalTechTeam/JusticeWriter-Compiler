import React from "react";
import { AppBar, Toolbar, Typography, IconButton, Paper } from "@mui/material";
import { Home as HomeIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();

  const handleHomeClick = () => {
    navigate("/");
  };

  return (
    <Paper
      elevation={3}
      sx={{
        marginRight: "15%",
        marginLeft: "15%",
        borderRadius: 3,
        marginBottom: "2% ",
      }}
    >
      <AppBar
        position="static"
        style={{ backgroundColor: "#1f2839", borderRadius: "8px 8px 0 0" }}
      >
        <Toolbar>
          <Typography
            variant="h4"
            color="inherit"
            style={{
              flex: 1,
              fontFamily: "Noto Sans",
              fontWeight: 500,
              letterSpacing: "1px",
            }}
          >
            Justice.ai
          </Typography>
          <IconButton
            edge="end"
            color="inherit"
            aria-label="home"
            onClick={handleHomeClick}
          >
            <HomeIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Paper>
  );
}

export default Header;
