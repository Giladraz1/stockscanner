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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { styled, alpha } from "@mui/material/styles";
import SearchBarNew from "../SearchComponents/SearchBarNew";

const drawerWidth = 240;

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

export default function UnAuthNavBar() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navigate = useNavigate();

  function handleLogin() {
    navigate("/login");
  }

  function handleRegister() {
    navigate("/signup");
  }

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <div>
      <Box sx={{ p: 2 }}>
        <Link
          to={{
            pathname: `/`,
          }}
        ></Link>
        <Typography variant="h6" noWrap component="div" sx={{ mr: 2 }}>
          <Link
            className="text-dark"
            style={{ textDecoration: "none" }}
            to={{
              pathname: `/`,
            }}
          >
            Stock-Scanner
          </Link>
        </Typography>
      </Box>

      <List>
        <ListItem button>
          <ListItemText onClick={handleRegister} primary="Register" />
        </ListItem>
        <ListItem button>
          <ListItemText onClick={handleLogin} primary="Login" />
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
                  pathname: `/`,
                }}
              >
                Stock-Scanner
              </Link>
            </Typography>
            <Box
              sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}
            ></Box>

            {location.pathname === "/" ? (
              <Search>
                <SearchBarNew />
              </Search>
            ) : null}

            <Stack
              direction="row"
              spacing={1}
              sx={{ flexGrow: 0, display: { xs: "none", md: "flex" } }}
            >
              <Button onClick={handleRegister} variant="outlined">
                Register
              </Button>
              <Button onClick={handleLogin} variant="contained">
                Login
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
