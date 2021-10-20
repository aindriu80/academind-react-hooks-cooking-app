import React, { useState, useEffect } from 'react'

import Card from '../UI/Card'
import './Search.css'

const Search = React.memo((props) => {
  const { onLoadIngredients } = props
  const [enteredFiltered, setEnteredFiltered] = useState('')

  useEffect(() => {
    const query =
      enteredFiltered.length === 0
        ? ''
        : `?orderBy="title"&equalTo="${enteredFiltered}"`
    fetch(
      'https://academind-react-databases-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json ' +
        query
    ).then((responseData) => {
      const loadedIngredients = []
      for (const key in responseData) {
        loadedIngredients.push({
          id: key,
          title: responseData[key].title,
          amount: responseData[key].amount,
        })
      }
      onLoadIngredients(loadedIngredients)
    })
  }, [enteredFiltered, onLoadIngredients])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            type="text"
            value={enteredFiltered}
            onChange={(event) => setEnteredFiltered(event.target.value)}
          />
        </div>
      </Card>
    </section>
  )
})

export default Search
