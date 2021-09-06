import React, { useState } from 'react'
import './App.css';
import  { useQuery, useMutation } from 'react-query'
import Post from './Post'
import client from './react-query-client'

const fetcher = (url, body) => fetch(url, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(body),
})

function App() {

  const mutation = useMutation((body) => fetcher('/api/create-record', body), {
    // side-effects
    onSuccess(data) {
      console.log('Got response from backend', data)
    },
    onError(error) {
      console.log('Got error from backend', error)
    },
  })

  function callMutations() {
    mutation.mutate('')
  }
  
  return (
    <div className="App">
      <h1>Some fav languages</h1>
      <p onClick={callMutations}>Submit</p>
    </div>
  );
}

export default App;
