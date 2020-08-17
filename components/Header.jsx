import React, { useState } from 'react';
import {
  AppBar,
  Typography,
  makeStyles,
  Tabs,
  Tab,
  Slide,
  useMediaQuery,
  useTheme,
  useScrollTrigger
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
        alignItems: 'stretch',
        padding: 0
      }
    },
    logo: {
      background: '#f93',
      color: '#fff',
      padding: '15px 8px'
    },
    tabWidth: {
      minWidth: 0,
      width: '100px',
      fontWeight: 500
    }
  }));
  const classes = useStyles();
  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('xs'));
  
  const HideOnScroll = ({ children, window }) => {
    const trigger = useScrollTrigger({ target: window ? window() : undefined });
    return (
      <Slide appear={false} direction="down" in={!trigger}>
        {children}
      </Slide>
    )
  }
  
  return (
    <HideOnScroll>
      <AppBar className={classes.navLayout} position="sticky">
        <Typography className={classes.logo} variant="h5" component="h1">Recipe App</Typography>
        <Tabs color="primary" indicatorColor="none" variant={matches && "fullWidth"} value={tab} onChange={(e, n) => setCurrTab(n)}>
          <Tab className={classes.tabWidth} label="Search" />
          <Tab className={classes.tabWidth} label="Favorites" />
        </Tabs>
      </AppBar>
    </HideOnScroll>
  )
}

export default Header;