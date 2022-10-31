import './App.css'
import React, { useState, useEffect } from 'react'
import axios from 'axios'

function App() {
  const [ip, setIP] = useState('')
  const [statusButton, setStatusButton] = useState(true)
  const [info, setInfo] = useState(
    'O cache já foi limpo na nova versão da aplicação'
  )

  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data)
    setIP(res.data.IPv4)
  }

  // Function to clear complete cache data
  const clearCacheData = () => {
    caches.keys().then((names) => {
      names.forEach((name) => {
        caches.delete(name)
      })
    })
    setInfo('O cache já foi limpo na nova versão da aplicação')
    setStatusButton(true)
  }

  // Function to add complete cache data
  const addDataIntoCache = (cacheName: any, url: any, response: any) => {
    const data = new Response(JSON.stringify(response))

    if ('caches' in window) {
      caches.open(cacheName).then((cache) => {
        cache.put(url, data)
      })
    }
  }

  function handleClearStorage() {
    clearCacheData()
  }

  useEffect(() => {
    getData()
    let ipInfo = localStorage.getItem('ip')
    if (!ipInfo) {
      setInfo('Sua versão é atualizada! Favor limpar o cache')
      setStatusButton(false)
      localStorage.setItem('ip', ip)
      console.log(ip)
    }
  }, [ip])

  return (
    <div className="App" style={{ height: 500, width: '100%' }}>
      <h2>IP da sua máquina</h2>
      <h4>{ip}</h4>
      <div>
        <button
          disabled={statusButton}
          style={{
            marginBottom: '10px',
            marginRight: '10px',
            backgroundColor: 'yellow'
          }}
          onClick={() => {
            addDataIntoCache('MyCache', 'https://localhost:3000', 'SampleData')
            setStatusButton(true)
          }}
        >
          Add cache
        </button>
        <button
          disabled={info.includes('já foi limpo') ? true : false}
          style={{
            marginBottom: '10px',
            marginLeft: '10px',
            backgroundColor: 'green'
          }}
          type="button"
          onClick={() => {
            handleClearStorage()
          }}
        >
          Limpar cache
        </button>
        <h4 style={{ color: 'red' }}>{info}</h4>
      </div>
    </div>
  )
}

export default App
