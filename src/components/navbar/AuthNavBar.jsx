import MenuIcon from "@mui/icons-material/Menu";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { styled, alpha } from "@mui/material/styles";
import { useEffect, useRef, useState } from "react";
import { useAuth } from "../context/AuthContext";

import SearchBarNew from "../SearchComponents/SearchBarNew";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const pages = ["Features", "Pricing", "Blog"];

const drawerWidth = 240;

export default function Homie() {
  const auth = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  console.log(location);

  const { currentUser, logout } = useAuth();
  const handleLogout = async () => {
    setError("");
    try {
      await logout();
      return navigate("/");
    } catch (error) {
      setError("Logout failed");
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, []);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
          <Link
            className="text-dark"
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/dashboard`,
            }}
          >
            Stock-Scanner
          </Link>
        </Typography>
      </Box>
      <Divider />
      <List>
        {/* {pages.map((page) => (
          <ListItem button key={page}>
            <ListItemText primary={page} />
          </ListItem>
        ))} */}
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText onClick={handleLogout} primary="LogOut" />
        </ListItem>
      </List>
    </div>
  );

  return (
    <>
      <AppBar color="inherit" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box sx={{ mr: 2, display: { xs: "block", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="menu appbar"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleDrawerToggle}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
            </Box>
            <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
              <Link
                className="text-dark"
                style={{ textDecoration: "none" }}
                to={{
                  pathname: `/dashboard`,
                }}
              >
                Stock-Scanner
              </Link>
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>
            {location.pathname === "/dashboard" ? (
              <Search>
                <SearchBarNew />
              </Search>
            ) : null}
            <Stack
              direction="row"
              spacing={1}
              sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Box className="mt-1 me-1">Hey {auth.currentUser.email}</Box>
              <Button onClick={handleLogout} variant="contained">
                Logout
              </Button>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
}
