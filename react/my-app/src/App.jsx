import { useState, useEffect, useRef } from 'react'
import './App.css'
import woordenboekData from './assets/woordenboek.json'

function App() {
  const [zoekwoord, setZoekWoord] = useState('')
  const [resultaten, setResultaten] = useState([])
  const inputRef = useRef(null)
  
  // Use the imported JSON data
  const woordenboek = woordenboekData
  
  // Functie om zoekterm te highlighten in het woord
  const highlightSearchTerm = (woord, searchTerm) => {
    if (!searchTerm) return woord;
    
    const regex = new RegExp(`(${searchTerm})`, 'gi');
    const parts = woord.split(regex);
    
    return parts.map((part, index) => 
      regex.test(part) ? 
        <span key={index} className="highlight">{part}</span> : 
        part
    );
  };
  
  const zoeken = (event) => {
    const searchTerm = event.target.value
    setZoekWoord(searchTerm)
    
    if (searchTerm === '') {
      setResultaten([]) // Verwijder alle resultaten als zoekwoord leeg is
    } else {
      const filtered = woordenboek.filter((item) => {
        return item.woord.toLowerCase().includes(searchTerm.toLowerCase())
      })
      setResultaten(filtered)
    }
  }

  // Initialize results with all items on component mount and set focus
  useEffect(() => {
    setResultaten([])
    // Zet focus op het zoekveld wanneer de component mount
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <>
      <h1> Vereniging voor Taalzuivering
      </h1>
      <input 
        ref={inputRef}
        type='text' 
        onChange={zoeken} 
        placeholder='Zoek naar een woord' 
      />
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
                <td>{highlightSearchTerm(woordenboekitem.woord, zoekwoord)}</td>
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
