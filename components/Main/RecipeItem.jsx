import React, { useState, useEffect } from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  IconButton,
  Icon,
  List,
  ListItem,
  ListItemText,
  Paper,
  Switch,
  FormControlLabel,
  Snackbar,
  SnackbarContent,
  makeStyles
} from '@material-ui';

const RecipeItem = ({recipe, bookmarked, setBookmarked}) => {
    const [isBookmarked, setIsBookmarked] = useState(false);
    
    const useStyles = makeStyles(theme => ({
    media: {
      height: 200,
    },
    cardStyle: {
      borderRadius: 15,
      border: '1px solid #ddd'
    },
    cardActionsStyle: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    iconStyle: {
      color: isBookmarked && "red"
    },
    dialogStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      overflow: 'hidden',
      [theme.breakpoints.down('xs')]: {
        flexDirection: 'column'
      }
    },
    dialogMedia: {
      maxWidth: 300,
      width: 270,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: 220
      }
    },
    dialogHeader: {
      display: 'flex',
      background: '#f93',
      color: '#fff',
      padding: '0px 5px',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 2px 15px -15px rgba(0, 0, 0, 0.8)'
    },
    listStyle: {
      height: '80vh',
      maxWidth: 310,
      width: 310,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      [theme.breakpoints.down('xs')]: {
        width: 300,
        height: 250
      }
    },
    ulStyle: {
      overflow: 'scroll',
      height: 180,
      padding: '5px 15px',
    },
    listItemStyle: {
      fontSize: 13
    },
    switchStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 12px 0px 0px',
      background: '#f1f1f1'
    },
    addStyle: {
      background: '#0c0',
      maxWidth: 200,
      minWidth: 200,
      width: 200,
      margin: 'auto'
    },
    removeStyle: {
      background: '#f55',
      maxWidth: 240,
      minWidth: 200,
      width: 240,
      margin: 'auto'
    }
  }));

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false)
  const {label, image, source, ingredientLines, calories, cautions, dietLabels, healthLabels} = recipe.recipe;
  const [addIsOpen, setAddIsOpen] = useState(false);
  const [removeIsOpen, setRemoveIsOpen] = useState(false);
  const [moreInfo, setMoreInfo] = useState({
    checkedA: true,
    checkedB: false
  })
  
  useEffect(() => {
    bookmarked.map(item => {
      if (item) {
        if (label === item.recipe.label) {
          setIsBookmarked(true);
        }
      }
    })
  })
  
  const addBookmark = () => {
    setBookmarked([...bookmarked, recipe]);
    setIsBookmarked(true);
    setAddIsOpen(true);
  }
  
  const removeBookmark = () => {
    setBookmarked(
      bookmarked.filter(item => 
        label !== item.recipe.label
      )
    );
    setIsBookmarked(false);
    setRemoveIsOpen(true);
  }
  
  return (
    <div>
      <Card className={classes.cardStyle}>
        <CardActionArea onClick={() => setIsOpen(true)}>
          <CardMedia className={classes.media} image={image} />
          <CardContent>
            <Typography gutterBottom variant="h6">{label}</Typography>
            <Typography variant="body2" color="textSecondary">- {source}</Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActionsStyle}>
          <Button onClick={() => setIsOpen(true)} size="small">Show Recipe</Button>
          <IconButton onClick={isBookmarked ? removeBookmark : addBookmark}>
            <Icon className={classes.iconStyle}>favorite</Icon>
          </IconButton>
        </CardActions>
      </Card>
      <Dialog fullWidth open={isOpen} onClose={() => setIsOpen(false)}>
        <Paper className={classes.dialogStyle}>
          <img className={classes.dialogMedia} src={image} />
          <div className={classes.listStyle}>
            <div className={classes.dialogHeader}>
              <Typography noWrap variant="h6">{label}</Typography>
              <IconButton onClick={() => setIsOpen(false)}><Icon color="primary">close</Icon></IconButton>
            </div>
            {
              moreInfo.checkedB ?
                <List className={classes.ulStyle}>
                  <Typography variant="body1">Calories: </Typography>
                  <ListItem className={classes.listItemStyle}><ListItemText disableTypography>{calories}</ListItemText></ListItem>
                  <Typography variant="body1">Cautions: </Typography>
                  {cautions.map(item => (
                    <ListItem className={classes.listItemStyle}><ListItemText disableTypography>{item}</ListItemText></ListItem>
                  ))}
                  <Typography variant="body1">Diet Labels: </Typography>
                  {dietLabels.map(item => (
                    <ListItem className={classes.listItemStyle}><ListItemText disableTypography>{item}</ListItemText></ListItem>
                  ))}
                  <Typography variant="body1">Health Labels: </Typography>
                  {healthLabels.map(item => (
                    <ListItem className={classes.listItemStyle}><ListItemText disableTypography>{item}</ListItemText></ListItem>
                  ))}
                </List> :
                <List className={classes.ulStyle}>
                  <Typography variant="body1">Ingredients: </Typography>
                  {ingredientLines.map(item => (
                    <ListItem className={classes.listItemStyle}><ListItemText disableTypography>{item}</ListItemText></ListItem>
                  ))}
                </List>
            }
            <div className={classes.switchStyle}>
              <IconButton className={classes.faveStyle} onClick={isBookmarked ? removeBookmark : addBookmark}>
                <Icon className={classes.iconStyle}>favorite</Icon>
              </IconButton>
              <FormControlLabel control={
                <Switch checked={moreInfo.checkedB} name="checkedB" onChange={(event) => setMoreInfo({ ...moreInfo, [event.target.name]: event.target.checked })}/>
              } label="More Info" labelPlacement="start" />
            </div>
          </div>
        </Paper>
      </Dialog>
      <Snackbar onClose={() => setAddIsOpen(false)} open={addIsOpen} autoHideDuration="1500">
        <SnackbarContent message="Added to Favorite Recipes" className={classes.addStyle} />
      </Snackbar>
      <Snackbar onClose={() => setRemoveIsOpen(false)} open={removeIsOpen} autoHideDuration="1500">
        <SnackbarContent message="Removed from Favorite Recipes" className={classes.removeStyle} />
      </Snackbar>
    </div>
  );
}

export default RecipeItem;