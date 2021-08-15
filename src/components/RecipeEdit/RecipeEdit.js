import React, { useContext } from 'react'
import RecipeIngredientEdit from './RecipeIngredientEdit'
import { v4 as uuidv4 } from 'uuid';
import { RecipeContext } from "../../App"

export default function RecipeEdit({ recipe }) {
    const { id, name, cookTime, servings, instructions, ingredients } = recipe
    const { handleRecipeChange, handleRecipeSelect } = useContext(RecipeContext)

    function handleChange(changes) {
        handleRecipeChange(id, { ...recipe, ...changes })
    }

    function handleIngredientChange(id, ingredient) {
        const newIngredients = [...recipe.ingredients]
        const index = newIngredients.findIndex(i => i.id === id)
        newIngredients[index] = ingredient
        handleChange({ ingredients: newIngredients })
    }


  function handleIngredientAdd(){
    const newIngredient = { 
      id: uuidv4(),
      name: "",
      amount: ""
    }
    handleChange({ingredients : [...recipe.ingredients, newIngredient]})
  }

  function handleIngredientDelete(id){
        handleChange({ingredients: recipe.ingredients.filter(i => i.id !== id)})
  }
    return (
        <div className="recipe-edit">
            <div className="recipe-edit__remove-button-cont">
                <button
                    onClick={() => handleRecipeSelect(undefined)}
                    className="btn recipe-edit__remove-button">&times;</button></div>
            <div className="recipe-edit__details-grid">
                <label
                    htmlFor="name"
                    className="recipe-edit__label">Name</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    value={name}
                    onChange={e => handleChange({ name: e.target.value })}
                    className="recipe-edit__input"
                />
                <label
                    htmlFor="cookTime"
                    className="recipe-edit__label">Cook Time</label>
                <input
                    type="text"
                    id="cookTime"
                    name="cookTime"
                    value={cookTime}
                    onChange={e => handleChange({ cookTime: e.target.value })}
                    className="recipe-edit__input"
                />
                <label
                    htmlFor="servings"
                    className="recipe-edit__label">Servings</label>
                <input
                    type="number"
                    min="1"
                    id="servings"
                    name="servings"
                    value={servings}
                    onChange={e => handleChange({ servings: parseInt(e.target.value) || '' })}
                    className="recipe-edit__input" />

                <label
                    htmlFor="instructions"
                    className="recipe-edit__label">Instructions</label>
                <textarea
                    name="instructions"
                    id="instructions"
                    value={instructions}
                    onChange={e => handleChange({ instructions: e.target.value })}
                    className="recipe-edit__input"
                ></textarea>
            </div>
            <br />
            <label className="recipe-edit__label">Ingredients</label>
            <div className="recipe-edit__ingredient-grid">
                <div>Name</div>
                <div>Amount</div>
                <div></div>
                {ingredients.map(i => {
                    return (
                        <RecipeIngredientEdit
                            key={i.id}
                            ingredient={i}
                            handleIngredientChange={handleIngredientChange}
                            handleIngredientDelete={handleIngredientDelete}
                        />
                    )
                })}
            </div>
            <div className="recipe-edit__add-ingredient-button-cont">
                <button 
                onClick={() => handleIngredientAdd()}
                className="btn btn--primary">Add Ingredient</button></div>
        </div>
    )
}
