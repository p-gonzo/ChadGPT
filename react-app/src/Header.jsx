import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

const styles = {
    appBar: {
      alignItems: 'center'
    },
    title: {
      fontSize: '2em',
      fontFamily: 'cursive'
    },
  };
  
  function Header() {
    return (
      <AppBar position="static" style={styles.appBar}>
        <Toolbar>
          <Typography variant="h6" style={styles.title}>
            ChadGPT
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
  
  export default Header;