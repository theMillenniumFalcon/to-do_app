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
  const [templang, setTemplang] = useState('')

  const mutation = useMutation((body) => fetcher('/api/create-record', body), {
    // side-effects
    onSuccess(data) {
      console.log('Got response from backend', data)
      setTemplang('')
      client.invalidateQueries('favlangs')
    },
    onError(error) {
      console.log('Got error from backend', error)
    },
  })

  const { data: favlangs, isLoading, isError } = useQuery('favlangs', () => {
    return fetch('/api/get-records').then((response) => response.json())
  }, {
    select: data => data.lang
  })

  function callMutations() {
    mutation.mutate({ record: templang })
  }

  if(isLoading) {
    return <p>Loading...</p>
  }

  if(isError) {
    return <p>Error with request</p>
  }
  
  return (
    <div className="App">
      <h1>Some fav languages</h1>
      {favlangs.map((lang) => {
        return <li key = {lang}>{lang}</li>
      })}
      <input type="text" value={templang} onChange={e => setTemplang(e.target.value)} />
      <p onClick={callMutations}>Submit</p>
    </div>
  );
}

export default App;
