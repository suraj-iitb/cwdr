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
import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import InsertChartOutlinedIcon from "@mui/icons-material/InsertChartOutlined";
import FileDownloadOutlinedIcon from "@mui/icons-material/FileDownloadOutlined";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import { useDispatch, useSelector } from "react-redux";

import { setOpenAddUser } from "../redux/slices/openAddUserSlice";
import { setMobileOpen } from "../redux/slices/mobileOpenSlice";
import { drawerWidth } from "../constants/constants";

export function SideBar(props) {
  const [openManageUser, setOpenManageUser] = React.useState(true);

  const openAddUser = useSelector((state) => state.openAddUserReducer.value);
  const mobileOpen = useSelector((state) => state.mobileOpenReducer.value);

  const dispatch = useDispatch();

  const handleDrawerToggle = () => {
    dispatch(setMobileOpen(!mobileOpen));
  };

  const handleManageUser = () => {
    setOpenManageUser(!openManageUser);
  };

  const handleAddUser = () => {
    if (!openAddUser) {
      dispatch(setOpenAddUser(true));
      dispatch(setMobileOpen(!mobileOpen));
    }
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
      <ListItemButton onClick={handleManageUser}>
        <ListItemIcon>
          <ManageAccountsOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Manage User" />
        {openManageUser ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      <Collapse in={openManageUser} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItemButton onClick={handleAddUser} sx={{ pl: 4 }}>
            <ListItemIcon>
              <PersonAddAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Add User" />
          </ListItemButton>
          <ListItemButton sx={{ pl: 4 }}>
            <ListItemIcon>
              <PeopleAltOutlinedIcon />
            </ListItemIcon>
            <ListItemText primary="Get User" />
          </ListItemButton>
        </List>
      </Collapse>

      <ListItemButton>
        <ListItemIcon>
          <ThumbUpOffAltOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Review Data" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <FileDownloadOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Download Data" />
      </ListItemButton>

      <ListItemButton>
        <ListItemIcon>
          <InsertChartOutlinedIcon />
        </ListItemIcon>
        <ListItemText primary="Statistics" />
      </ListItemButton>
    </List>
  );

  return (
    <Box
      component="nav"
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
      aria-label="mailbox folders"
    >
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Drawer
        container={window.document.body}
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
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
