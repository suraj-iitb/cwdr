import * as React from "react";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ManageAccountsOutlinedIcon from "@mui/icons-material/ManageAccountsOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import WomanIcon from '@mui/icons-material/Woman';
import GirlIcon from '@mui/icons-material/Girl';
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import Logout from "@mui/icons-material/Logout"
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { setMobileOpen } from "../redux/slices/mobileOpenSlice";
import { drawerWidth } from "../constants/constants";
import { useAuth } from '../hooks';

export function SideBar(props) {
  const [openManageFieldWorker, setOpenManageFieldWorker] = React.useState(true);
  const [openUserData, setOpenUserData] = React.useState(true);


  const mobileOpen = useSelector((state) => state.mobileOpenReducer.value);

  const dispatch = useDispatch();

  const { _signOut } = useAuth();

  const handleManageFieldWorker = () => {
    setOpenManageFieldWorker(!openManageFieldWorker);
  };

  const handleSignOut = (event) => {
    event.preventDefault();
    _signOut();
  };

  const handleUserData = () => {
    setOpenUserData(!openUserData);
  };

  const handleDrawerToggle = () => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    dispatch(setMobileOpen(!mobileOpen));
  };

  const drawer = (
    <List
      sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader" insert={true}>
          <Box sx={{ fontSize: 24, m: 1 }}>
            <AdminPanelSettingsOutlinedIcon fontSize="medium" />
            <Box component="span" sx={{ ml: 1 }}>
              Admin Actions
            </Box>
            <Divider light={true} />
          </Box>
        </ListSubheader>
      }
    >
      <ListItemButton onClick={handleManageFieldWorker}>
        <ListItemIcon>
          <ManageAccountsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Manage Field Worker" />
        {openManageFieldWorker ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openManageFieldWorker} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            to="addFieldWorker"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PersonAddAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Add Field Worker" />
            </ListItemButton>
          </Link>
          <Link
            to="getFieldWorker"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <PeopleAltOutlinedIcon />
              </ListItemIcon>
              <ListItemText primary="Get Field Worker" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton onClick={handleUserData}>
        <ListItemIcon>
          <FileDownloadOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Manage User Data" />
        {openUserData ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openUserData} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link
            to="getUserData/manushi"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <WomanIcon />
              </ListItemIcon>
              <ListItemText primary="For Manushi" />
            </ListItemButton>
          </Link>
          <Link
            to="getUserData/mythri"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <WomanIcon />
              </ListItemIcon>
              <ListItemText primary="For Mythri" />
            </ListItemButton>
          </Link>
          <Link
            to="getUserData/snehidi"
            style={{ textDecoration: "none", color: "inherit" }}
          >
            <ListItemButton sx={{ pl: 4 }}>
              <ListItemIcon>
                <GirlIcon />
              </ListItemIcon>
              <ListItemText primary="For Snehdi" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <Link
        to="statistics"
        style={{ textDecoration: "none", color: "inherit" }}
      >
        <ListItemButton>
          <ListItemIcon>
            <InsertChartOutlinedIcon />
          </ListItemIcon>
          <ListItemText primary="Statistics" />
        </ListItemButton>
      </Link>
      <ListItemButton onClick={handleSignOut}>
        <ListItemIcon>
          <Logout />
        </ListItemIcon>
        <ListItemText primary="Sign Out" />
      </ListItemButton>
    </List>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      onClick={handleDrawerToggle()}
      onKeyDown={handleDrawerToggle()}
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle()}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>

      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
