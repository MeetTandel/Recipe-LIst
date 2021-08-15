import React, { useContext } from 'react'
import Recipe from './Recipe'
import { RecipeContext } from '../App'

export default function RecipeList() {
    const { recipes, handleRecipeAdd } = useContext(RecipeContext)
    return (
        <>
            <div className="recipe-list">
                {recipes.map(recipe => {
                    return (
                        <Recipe
                            key={recipe.id}
                            {...recipe}
                        />
                    )
                })}
                <div className="recipe-list__add-recipe-btn-container">
                    <button
                        onClick={handleRecipeAdd}
                        className="btn btn--primary">Add Recipe</button>
                </div>
            </div>
        </>
    )
}
