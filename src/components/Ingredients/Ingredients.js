import React, { useState } from 'react'

import IngredientForm from './IngredientForm'
import IngredientList from './IngredientList'
import Search from './Search'

const Ingredients = () => {
  const [userIngredients, setUserIngredients] = useState([])

  const addIngredientHander = (ingredient) => {
    fetch(
      'https://academind-react-databases-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json ',
      {
        method: 'POST',
        body: JSON.stringify(ingredient),
        headers: { 'Content-Type': 'application/json' },
      }
    )
      .then((response) => {
        return response.json()
      })
      .then((responseData) => {
        setUserIngredients((prevIngredients) => [
          ...prevIngredients,
          { id: responseData.name, ...ingredient },
        ])
      })
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
