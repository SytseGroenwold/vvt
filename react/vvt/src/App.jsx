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
      
      // Sorteer resultaten: exacte matches eerst, dan gedeeltelijke matches
      const sorted = filtered.sort((a, b) => {
        const aExact = a.woord.toLowerCase() === searchTerm.toLowerCase()
        const bExact = b.woord.toLowerCase() === searchTerm.toLowerCase()
        
        if (aExact && !bExact) return -1
        if (!aExact && bExact) return 1
        return 0
      })
      
      setResultaten(sorted)
    }
  }

  // Start pagina
  useEffect(() => {
    setResultaten([]) // Leeg de resultaten bij het laden van de pagina
    if (inputRef.current) {
      inputRef.current.focus() // Zet focus op het zoekveld wanneer de component mount
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
            const isExactMatch = woordenboekitem.woord.toLowerCase() === zoekwoord.toLowerCase()
            return (
              <tr key={index} className={isExactMatch ? 'exact-match' : ''}>
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
