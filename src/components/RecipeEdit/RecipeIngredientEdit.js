import React from 'react'

export default function RecipeIngredientEdit({ handleIngredientChange, handleIngredientDelete, ingredient }) {

    function handleChange(changes) {
        handleIngredientChange(ingredient.id, { ...ingredient, ...changes })
    }

    return (
        <>
            <input
                className="recipe-edit__input"
                onChange={e => handleChange({ name: e.target.value })}
                value={ingredient.name}
                type="text" />

            <input
                className="recipe-edit__input"
                value={ingredient.amount}
                onChange={e => handleChange({ amount: e.target.value })}
                type="text" />

            <button
            onClick={() => handleIngredientDelete(ingredient.id)}
                className="btn btn--danger">&times;</button>
        </>
    )
}
