import React, { useState, useEffect } from 'react';
import {
  Card,
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
      width: 260,
      [theme.breakpoints.down('xs')]: {
        width: '100%',
        height: 240
      }
    },
    dialogHeader: {
      display: 'flex',
      padding: '0px 5px',
      justifyContent: 'space-between',
      alignItems: 'center',
      boxShadow: '0px 2px 8px -8px rgba(0, 0, 0, 0.8)'
    },
    exitButton: {
      padding: '15px 0px'
    },
    faveStyle: {
      padding: '15px 0px'
    },
    listStyle: {
      height: 190,
      width: 315,
      [theme.breakpoints.down('xs')]: {
        width: 290,
        height: 250,
        padding: '0px 5px'
      }
    },
    ulStyle: {
      overflow: 'scroll',
      height: 150,
      padding: 5,
    },
    listItemStyle: {
      fontSize: 13
    },
    switchStyle: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0px 15px'
    }
  }));

  const classes = useStyles();
  const [isOpen, setIsOpen] = useState(false)
  const {label, image, source, ingredientLines, calories, cautions, dietLabels, healthLabels} = recipe.recipe;
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
  }
  
  const removeBookmark = () => {
    setBookmarked(
      bookmarked.filter(item => 
        label !== item.recipe.label
      )
    );
    setIsBookmarked(false);
  }
  
  return (
    <div>
      <Card className={classes.cardStyle}>
        <CardMedia className={classes.media} image={image} />
        <CardContent>
          <Typography gutterBottom variant="h6">{label}</Typography>
          <Typography variant="body2" color="textSecondary">- {source}</Typography>
        </CardContent>
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
              <Typography variant="h6">{label}</Typography>
              <IconButton onClick={() => setIsOpen(false)} className={classes.exitButton}><Icon>close</Icon></IconButton>
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
    </div>
  );
}

export default RecipeItem;