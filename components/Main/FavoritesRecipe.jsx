import React, { useState } from 'react';
import {
  Grid,
  Typography,
  FormControl,
  TextField,
  IconButton,
  Icon,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Slide,
  Zoom
} from '@material-ui';
import RecipeItem from './RecipeItem.jsx';

const FavoritesRecipe = ({ classes, bookmarked, setBookmarked }) => {

  const [tempBookmarked, setTempBookmarked] = useState([]);
  const [dialogIsOpen, setDialogIsOpen] = useState(false);

  const searchFavorites = (e) => {
    const regex = new RegExp(`${e.target.value}`, 'ig');
    e.target.value !== '' ?
      setTempBookmarked(bookmarked.filter(item => item.recipe.label
        .match(regex))) :
      setTempBookmarked([]);
  }
  
  const removeAll = () => {
    setBookmarked([]);
    setDialogIsOpen(false);
  }

  return (
    <section id="favorites-recipe">
      <FormControl margin="normal" className={classes.formStyle}>
        <TextField color="secondary" onChange={searchFavorites} size="small" label="Search favorites..." variant="outlined" className={classes.textFieldStyle} />
        <Button className={classes.deleteButtonStyle} onClick={() => setDialogIsOpen(true)}><Icon>delete</Icon></Button>
        <Dialog open={dialogIsOpen} onClose={() => setDialogIsOpen(false)}>
          <DialogTitle>Remove all favorite recipes</DialogTitle>
          <DialogContent>
            <DialogContentText>Are you sure you want to remove all your favorite recipes?</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogIsOpen(false)}>No</Button>
            <Button onClick={removeAll} className={classes.confirmRemove}>Yes</Button>
          </DialogActions>
        </Dialog>
      </FormControl>
      { !bookmarked.length &&
        <Slide in={true} direction="up" mountOnEnter unMountOnExit>
          <Typography className={classes.resultStyle} align="center" variant="h5">No Favorites</Typography>
        </Slide>}
      <Grid container className={classes.gridLayout} spacing="2" justify="space-evenly" alignItems="center">
        {!tempBookmarked.length ? 
          bookmarked.map(recipe => {
            return (
              <Zoom in={true} mountOnEnter unMountOnExit>
                <Grid item sm={6} xs={12}>
                  <RecipeItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
                </Grid>
              </Zoom>
            )
          }) : 
          tempBookmarked.map(recipe => {
            return (
              <Zoom in={true} mountOnEnter unMountOnExit>
                <Grid item sm={6} xs={12}>
                  <RecipeItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
                </Grid>
              </Zoom>
            )
          })
        }
      </Grid>
    </section>
  )
}

export default FavoritesRecipe;