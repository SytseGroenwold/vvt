import { useState, useEffect } from 'react'
import './App.css'
import woordenboekData from './assets/woordenboek.json'

function App() {
  const [zoekwoord, setZoekWoord] = useState('')
  const [resultaten, setResultaten] = useState([])
  
  // Use the imported JSON data
  const woordenboek = woordenboekData
  
  const zoeken = (event) => {
    const searchTerm = event.target.value
    setZoekWoord(searchTerm)
    
    if (searchTerm === '') {
      console.log('Zoekwoord is leeg')
      setResultaten([]) // Verwijder alle resultaten als zoekwoord leeg is
    } else {
      const filtered = woordenboek.filter((item) => {
        return item.woord.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setResultaten(filtered)
    }
  }

  // // Initialize results with all items on component mount
  // useEffect(() => {
  //   setResultaten(woordenboek)
  // }, [])

  return (
    <>
      <h1> Vereniging voor Taalzuivering
      </h1>
      <input type='text' onChange={zoeken} placeholder='Zoek naar een woord' />
      <p>
        {zoekwoord}
      </p>
      <table id="myTable">
        <thead>
          <tr className="header">
            <th>Woord</th>
            <th>Beschrijving</th>
          </tr>
        </thead>
        <tbody>
          {resultaten.map((woordenboekitem, index) => {
            return (
              <tr key={index}>
                <td>{woordenboekitem.woord}</td>
                <td>{woordenboekitem.beschrijving}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </>
  )
}

export default App
