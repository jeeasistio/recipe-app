import React, {useState} from 'react';
import { Grid, Typography, FormControl, TextField } from '@material-ui';
import RecipeItem from './RecipeItem.jsx';

const FavoritesRecipe = ({ classes, bookmarked, setBookmarked }) => {
  
  const [tempBookmarked, setTempBookmarked] = useState([]);
  
  const searchFavorites = (e) => {
    const regex = new RegExp(`${e.target.value}`, 'ig');
    e.target.value !== '' ? 
      setTempBookmarked(bookmarked.filter(item => item.recipe.label
        .match(regex))) :
      setTempBookmarked([]);
  }
  
  return (
    <section id="favorites-recipe">
      <FormControl margin="normal" className={classes.formStyle}>
        <TextField color="secondary" onChange={searchFavorites} size="small" label="Search favorites..." type="search" variant="outlined" className={classes.textFieldStyle} />
      </FormControl>
      { !bookmarked.length &&
        <Typography className={classes.resultStyle} align="center" variant="h5">No Favorites</Typography> }
      <Grid container className={classes.gridLayout} spacing="2" justify="space-evenly" alignItems="center">
        {!tempBookmarked.length ? 
          bookmarked.map(recipe => {
            return (
              <Grid item sm={6} xs={12}>
                <RecipeItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
              </Grid>
            )
          }) : 
          tempBookmarked.map(recipe => {
            return (
              <Grid item sm={6} xs={12}>
                <RecipeItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
              </Grid>
            )
          })
        }
      </Grid>
    </section>
  )
}

export default FavoritesRecipe;