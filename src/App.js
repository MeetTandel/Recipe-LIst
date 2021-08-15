import React, { useState, useEffect } from 'react'
import RecipeList from './components/RecipeList';
import RecipeEdit from './components/RecipeEdit/RecipeEdit';
import { v4 as uuidv4 } from 'uuid';
import './css/app.css'

export const RecipeContext = React.createContext()
const LOCAL_STORAGE_KEY = "CookingWithReact.recipes"

function App() {
  const [recipes, setRecipes] = useState(sampleRecipes)
  const [selectedRecipeId, setSelectedRecipeId] = useState()
  const selectedRecipe = recipes.find(recipe => recipe.id === selectedRecipeId)
  
  // load recipes
  useEffect(() => {
    const recipeJSON = localStorage.getItem(LOCAL_STORAGE_KEY) || []
    if (recipeJSON !== null) setRecipes(JSON.parse(recipeJSON))
  }, [])

  // store recipes
  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(recipes))
  }, [recipes])

  const recipeContextValue = {
    handleRecipeAdd,
    recipes,
    handleRecipeDelete,
    handleRecipeSelect,
    handleRecipeChange
  }

  function handleRecipeSelect(id) {
    setSelectedRecipeId(id)
  }

  function handleRecipeAdd() {
    const newRecipe = {
      id: uuidv4(),
      name: "",
      servings: 1,
      cookTime: "",
      instructions: "",
      ingredients: [
        {
          id: uuidv4(),
          name: "",
          amount: ""
        }
      ]
    }
    setSelectedRecipeId(newRecipe.id)
    setRecipes([...recipes, newRecipe])
  }


  function handleRecipeDelete(id) {
    if(selectedRecipeId !== null && selectedRecipeId === id){
      setSelectedRecipeId(undefined)
    }
    setRecipes(recipes.filter(recipe => recipe.id !== id))
  }

  
  function handleRecipeChange(id, recipe) {
    const newRecipes = [...recipes]
    const index = newRecipes.findIndex(r => r.id === id)
    newRecipes[index] = recipe
    setRecipes(newRecipes)
  }

  return (
    <RecipeContext.Provider value={recipeContextValue}>
      <RecipeList />
      {selectedRecipe && <RecipeEdit key={selectedRecipe.id} recipe={selectedRecipe} />}
    </RecipeContext.Provider>
  )
}

const sampleRecipes = [
  {
    id: 1,
    name: "Plain Chicken",
    servings: 3,
    cookTime: "1.45",
    instructions: "1. Put Salt on Chicken\n2. Put Chicken on Oven\n3. Eat Chicken",
    ingredients: [
      {
        id: 1,
        name: "Chicken",
        amount: "1 kg"
      },
      {
        id: 2,
        name: "Salt",
        amount: "1 Tbs"
      }
    ]
  },
  {
    id: 2,
    name: "Cake",
    servings: 4,
    cookTime: "1.30",
    instructions: "1. Make Bater\n2. Put Cake on Oven\n3. Eat Cake",
    ingredients: [
      {
        id: 1,
        name: "Eggs",
        amount: "5"
      },
      {
        id: 2,
        name: "Salt",
        amount: "2 Tbs"
      }
    ]
  }
]


export default App;
