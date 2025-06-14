// src/components/Sidebar/index.jsx
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Box } from "@mui/material";
import {AssessmentOutlined, Settings} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import LogoutButton from "../logout-btn";

const Sidebar = () => {
  const navigate = useNavigate();

  const menuItems = [
    {
      text: "Status Page",
      icon: <AssessmentOutlined />,
      path: "/status",
    },
    {
    text: "Settings",
    icon: <Settings />,
    path: "/settings",
  },
  ];

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: 240,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: 240,
          boxSizing: "border-box",
          backgroundColor: "#f5f5f5",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between", // important!
        },
      }}
    >
      {/* Top Navigation Items */}
      <Box>
        <List>
          {menuItems.map((item) => (
            <ListItem button key={item.text} onClick={() => navigate(item.path)}>
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>

      <Box>
        <List>
          <LogoutButton />
        </List>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
