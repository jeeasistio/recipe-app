import React, { useState } from 'react';
import {
  AppBar,
  Typography,
  makeStyles,
  Tabs,
  Tab,
  useMediaQuery,
  useTheme
} from '@material-ui';

const Header = ({ tab, setCurrTab }) => {
  const useStyles = makeStyles((theme) => ({
    navLayout: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 15px',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column',
        textAlign: 'center',
        alignItems: 'stretch'
      }
    },
    tabWidth: {
      minWidth: 0,
      width: '100px',
    }
  }));
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  return (
    <AppBar className={classes.navLayout} position="sticky">
      <Typography variant="h5" component="h1">Recipe App</Typography>
      <Tabs variant={matches && "fullWidth"} value={tab} onChange={(e, n) => setCurrTab(n)}>
        <Tab className={classes.tabWidth} label="Search" />
        <Tab className={classes.tabWidth} label="Loved" />
      </Tabs>
    </AppBar>
  )
}

export default Header;