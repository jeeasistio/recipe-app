import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui';
import SearchRecipe from './Main/SearchRecipe.jsx';
import FavoritesRecipe from './Main/FavoritesRecipe.jsx';

const Main = ({ tab }) => {
  const useStyles = makeStyles(theme => ({
    gridLayout: {
      padding: '5px 15px',
      margin: 0,
      width: '100%'
    },
    formStyle: {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      marginTop: 20
    },
    textFieldStyle: {
      width: '70%',
      color: '#000'
    },
    resultStyle: {
      margin: '40px auto',
      color: '#999'
    },
    deleteButtonStyle: {
      color: '#fff',
      padding: 0,
      minWidth: 0
    },
    deleteStyle: {
      background: '#f55',
      width: 64,
      height: 36,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 5
    },
    confirmRemove: {
      color: '#f55'
    }
  }))
  const classes = useStyles();
  const [query, setQuery] = useState('chicken');
  const [recipes, setRecipes] = useState([]);
  const items = localStorage.getItem('bookmarkedItems')
  const [bookmarked, setBookmarked] = useState(
    items ? JSON.parse(items) : []
  );
  
  useEffect(() => {
    getRecipes();
  }, [query]);
  
  useEffect(() => {
    localStorage.setItem('bookmarkedItems', JSON.stringify(bookmarked));
  }, [bookmarked])
  
  const getRecipes = async () => {
    const res = await fetch(`https://api.edamam.com/search?q=${query}&app_id=710ac8a7&app_key=403c64835e480554d074c7a2461abfe0`);
    const data = await res.json();
    setRecipes([]);
    setRecipes(data.hits);
  }
  
  return (
    <div>
      {tab === 0 && <SearchRecipe classes={classes} query={query} setQuery={setQuery} recipes={recipes} setRecipes={setRecipes} bookmarked={bookmarked} setBookmarked={setBookmarked} />}
      {tab === 1 && <FavoritesRecipe classes={classes} bookmarked={bookmarked} setBookmarked={setBookmarked} />}
    </div>
  )
}

export default Main;