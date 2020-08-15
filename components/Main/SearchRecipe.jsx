import React, { useState } from 'react';
import {
  Grid,
  FormControl,
  TextField,
  Button,
  Typography
} from '@material-ui';
import RecipeItem from './RecipeItem.jsx';

const SearchRecipe = ({ classes, query, setQuery, recipes, setRecipes, bookmarked, setBookmarked }) => {
  const [text, setText] = useState('')
  const changeQuery = () => {
    setQuery(text)
  }
  return (
    <section id="search-recipe">
      <FormControl margin="normal" className={classes.formStyle}>
        <TextField size="small" label="Search recipes..." type="search" variant="outlined" className={classes.textFieldStyle} onChange={(e) => setText(e.target.value)} />
        <Button variant="contained" color="primary" type="submit" onClick={changeQuery}>Search</Button>
      </FormControl>
      {!recipes.length && <Typography className={classes.resultStyle} align="center" variant="h5">No Results Found</Typography>}
      <Grid container className={classes.gridLayout} spacing="2" justify="space-evenly" alignItems="center">
        {recipes.map(recipe => {
          return (
            <Grid item sm={6} xs={12}>
              <RecipeItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default SearchRecipe;