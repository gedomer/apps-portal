import * as React from 'react';
import { AppBar, Toolbar, Typography, CssBaseline, Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logoutUser } from "../actions"


const theme = createTheme();

const Layout = ({children, isAuthUser, logoutUser}) => {
  const navigate = useNavigate();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        color="default"
        elevation={0}
        sx={{
          position: 'relative',
          borderBottom: (t) => `1px solid ${t.palette.divider}`,
        }}
      >
        <Toolbar>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            APPS Portal
          </Typography>
          {isAuthUser && (
            <React.Fragment>
              <Button color="inherit" onClick={() => navigate("/")}>Randomize Apps</Button>
              <Button color="inherit" onClick={() => navigate("/convert")}>Convert</Button>
              <Button color="inherit" onClick={() => logoutUser()}>Logout</Button>
            </React.Fragment>
          )}
        </Toolbar>
      </AppBar>
      {children}
    </ThemeProvider>
  );
}

const mapStateToProps = (state) => ({
  isAuthUser: state.auth.isAuthUser
});


export default connect(mapStateToProps, { logoutUser })(Layout);