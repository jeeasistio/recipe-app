import React from 'react';
import { Grid, Typography } from '@material-ui';
import LovedItem from './LovedItem.jsx';

const LovedRecipe = ({ classes, bookmarked, setBookmarked }) => {
  return (
    <section id="loved-recipe">
      {!bookmarked.length && <Typography className={classes.resultStyle} align="center" variant="h5">No Loved Recipes</Typography> }
      <Grid container className={classes.gridLayout} spacing="2" justify="space-evenly" alignItems="center">
        {bookmarked.map(recipe => {
          return (
            <Grid item sm={6} xs={12}>
              <LovedItem recipe={recipe} bookmarked={bookmarked} setBookmarked={setBookmarked} />
            </Grid>
          )
        })}
      </Grid>
    </section>
  )
}

export default LovedRecipe;