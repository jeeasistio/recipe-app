import React, { useState } from 'react';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Typography,
  Slide,
  Zoom
} from '@material-ui';
import RecipeItem from './RecipeItem.jsx';

const SearchRecipe = ({ classes, query, setQuery, recipes, setRecipes, bookmarked, setBookmarked }) => {
  const [text, setText] = useState('')

  const changeQuery = (e) => {
    e.preventDefault();
    e.target.blur();
    setText('')
    setQuery(text);
  }

  return (
    <section id="search-recipe">
      <FormControl component="form" onSubmit={changeQuery} margin="normal" className={classes.formStyle}>
        <TextField value={text} color="secondary" size="small" label="Search recipes..." variant="outlined" className={classes.textFieldStyle} onChange={(e) => setText(e.target.value)} />
        <Button type="submit" variant="contained" color="secondary">Search</Button>
      </FormControl>
      {!recipes.length && 
        <Slide in={true} direction="up" mountOnEnter unMountOnExit>
          <Typography className={classes.resultStyle} align="center" variant="h5">No Results Found</Typography>
        </Slide>}
      <Grid container className={classes.gridLayout} spacing="2" justify="space-evenly" alignItems="center">
        {recipes.map(recipe => {
          return (
            <Zoom in={true} mountOnEnter unMountOnExit>
              <Grid item sm={6} xs={12}>
                <RecipeItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
              </Grid>
            </Zoom>
          )
        })}
      </Grid>
    </section>
  )
}

export default SearchRecipe;