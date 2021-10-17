import React, { useState } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])

  const addIngredientHander = (ingredient) => {
    setUserIngredients((prevIngredients) => [
      ...prevIngredients,
      { id: Math.random().toString(), ...ingredient },
    ])
  }

  const removeIngredientHander = (ingredientId) => {
    setUserIngredients((prevIngredients) =>
      prevIngredients.filter((ingredient) => ingredient.id !== ingredientId)
    )
  }

  return (
    <div className="App">
      <IngredientForm onAddIngredient={addIngredientHander} />

      <section>
        <Search />
        <IngredientList
          ingredients={userIngredients}
          onRemoveItem={removeIngredientHander}
        />
      </section>
    </div>
  )
}

export default Ingredients
