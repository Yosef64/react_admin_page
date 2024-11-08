import React from "react";
import Sidebar from "./StaticComps/Sidebar.tsx";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Grid from "@mui/material/Grid";
import Appbar from "./StaticComps/Appbar.js";
// import AppNavbar from "./StaticComps/Appbar.jsx";

export default function Dashboard() {
  return (
    <Grid container spacing={2}>
      <Grid
        item
        xs={2.7}
        sx={{
          overflow: "hidden",
          borderRight: "1px dashed grey",
          backgroundColor: "#faf9f7",
        }}
      >
        <Sidebar />
      </Grid>
      <Grid
        item
        xs={9.3}
        sx={{ height: "100vh", overflow: "auto", backgroundColor: "#faf9f7" }}
      >
        <Box>
          <Appbar />
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}