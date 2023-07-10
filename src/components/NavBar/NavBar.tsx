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
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  const [auth, setAuth] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setAuth(event.target.checked);
//   };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
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
            </Menu>
          </div>
          ): (
           <Box component='div' sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' },justifyContent: 'flex-end' }}>
            <Button component={NavLink} to="/login" sx={{ my: 2, mr:2, color: 'white', display: 'block', '&.active': {
      fontWeight: 'bold',
      borderBottom: '2px solid #FFF',
      paddingBottom: '3px',
      borderRadius: '0'
    } }}>
                Login
            </Button>
            <Button component={NavLink} to="/page-link" sx={{ my: 2, color: 'white', display: 'block' }}>
                Register
            </Button>
          </Box>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}