import React, { useState, useEffect, useRef } from 'react'

import Card from '../UI/Card'
import './Search.css'

const Search = React.memo((props) => {
  const { onLoadIngredients } = props
  const [enteredFiltered, setEnteredFiltered] = useState('')
  const inputRef = useRef()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFiltered === inputRef.current.value) {
        const query =
          enteredFiltered.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFiltered}"`
        fetch(
          `https://academind-react-databases-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json` +
            query
        )
          .then((response) => response.json())
          .then((responseData) => {
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
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFiltered, onLoadIngredients, inputRef])

  return (
    <section className="search">
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          <input
            ref={inputRef}
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
