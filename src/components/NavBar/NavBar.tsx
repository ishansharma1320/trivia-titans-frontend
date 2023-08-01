import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';

import AccountCircle from '@mui/icons-material/AccountCircle';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';

export default function NavBar({ isAuth }) {
  const navigate = useNavigate();
  const [auth, setAuth] = React.useState(isAuth);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const location = useLocation();
  const { claim, email, token, uid } = location.state || {};

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = async () => { // Mark the function as async
    try {
      const response = await fetch("https://login-kku3a2biga-uc.a.run.app/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token: token || "", // Use the token from the login page state or provide a default value
        }),
      });

      const responseData = await response.json();

      if (responseData.status === true && responseData.response === "User logged out successfully.") {
        navigate('/auth/login');
      } else {
        console.log("Logout error");
      }
    } catch (error) {
      console.error("Error occurred while logging out:", error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      {/* <FormGroup>
        <FormControlLabel
          control={
            <Switch
              checked={auth}
              onChange={handleChange}
              aria-label="login switch"
            />
          }
          label={auth ? 'Logout' : 'Login'}
        />
      </FormGroup> */}
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Trivia Game
          </Typography>
          {auth ? (
            <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>My account</MenuItem>
              <MenuItem onClick={handlelogout}>Logout</MenuItem>
            </Menu>
          </div>
          ): (
           <Box component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent: 'flex-end' }}>
            <Button component={NavLink} to="/auth/login" sx={{ my: 2, mr:2, color: 'white', display: 'block', '&.active': {
      fontWeight: 'bold',
      borderBottom: '2px solid #FFF',
      paddingBottom: '3px',
      borderRadius: '0'
    } }}>
                Login
            </Button>
            <Button component={NavLink} to="/auth/register" sx={{ my: 2, color: 'white', display: 'block' }}>
                Register
            </Button>
          </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}