import React, { useState, useEffect, useRef } from 'react'

import Card from '../UI/Card'
import ErrorModal from '../UI/ErrorModal'
import useHttp from '../../hooks/http'
import './Search.css'

const Search = React.memo((props) => {
  const { onLoadIngredients } = props
  const [enteredFiltered, setEnteredFiltered] = useState('')
  const inputRef = useRef()
  const { isLoading, data, error, sendRequest, clear } = useHttp()

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFiltered === inputRef.current.value) {
        const query =
          enteredFiltered.length === 0
            ? ''
            : `?orderBy="title"&equalTo="${enteredFiltered}"`
        sendRequest(
          'https://academind-react-databases-app-default-rtdb.europe-west1.firebasedatabase.app/ingredients.json' +
            query,
          'GET'
        )
      }
    }, 500)
    return () => {
      clearTimeout(timer)
    }
  }, [enteredFiltered, inputRef, sendRequest])

  useEffect(() => {
    if (!isLoading && !error && data) {
      const loadedIngredients = []
      for (const key in data) {
        loadedIngredients.push({
          id: key,
          title: data[key].title,
          amount: data[key].amount,
        })
      }
      onLoadIngredients(loadedIngredients)
    }
  }, [data, isLoading, error, onLoadIngredients])

  return (
    <section className="search">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
      <Card>
        <div className="search-input">
          <label>Filter by Title</label>
          {isLoading && <span>Loading....</span>}
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
