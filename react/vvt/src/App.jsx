import { useState, useEffect, useRef } from 'react'
import './App.css'
import woordenboekData from './assets/woordenboek.json'
import wikiIcon from './assets/wiki.svg'
import vanDaleIcon from './assets/vd.jpg'
import ewnIcon from './assets/ewn.png'

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
      <h1>Vereniging voor Taalzuivering</h1>
      <input
        ref={inputRef}
        type="text"
        onChange={zoeken}
        placeholder="Zoek naar een woord"
      />

      <table id="myTable">
        <thead>
          <tr className="header">
            <th>Woord</th>
            <th>Oor-sprong</th>
            <th>Beschrijving</th>
            <th>Wiki</th>
            <th>V.D.</th>
            <th>E.W.</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>

      {/* Exact match table (always visible) */}
      <table id="myTable">
        <tbody>
          {zoekwoord && resultaten.find(item => item.woord.toLowerCase() === zoekwoord.toLowerCase()) ? (
            <tr className="header">
              <td>{highlightSearchTerm(
                resultaten.find(item => item.woord.toLowerCase() === zoekwoord.toLowerCase()).woord,
                zoekwoord
              )}</td>
              <td></td>
              <td>{resultaten.find(item => item.woord.toLowerCase() === zoekwoord.toLowerCase()).beschrijving}</td>
              <td>
                <a href={`https://nl.wiktionary.org/wiki/${woordenboekitem.woord}`} target="_blank" rel="noopener noreferrer">
                  <img src={wikiIcon} alt="wiki" style={{ width: '100%', height: 'auto', maxWidth: '40px' }} />
                </a>
              </td>
              <td>
                <a href={`https://www.ensie.nl/van-dale/${woordenboekitem.woord}`} target="_blank" rel="noopener noreferrer">
                  <img src={vanDaleIcon} alt="wiki" style={{ width: '100%', height: 'auto', maxWidth: '40px' }} />
                </a>
              </td>
              <td>
                <a href={`https://www.ensie.nl/etymologisch-woordenboek/${woordenboekitem.woord}`} target="_blank" rel="noopener noreferrer">
                  <img src={ewnIcon} alt="wiki" style={{ width: '100%', height: 'auto', maxWidth: '40px' }} />
                </a>
              </td>
            </tr>
          ) : (
            <tr>
              <td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>
                Geen exacte match gevonden
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Main table for partial matches (always visible) */}
      <table id="myTable">
        <tbody>
          {resultaten
            .filter(item => item.woord.toLowerCase() !== zoekwoord.toLowerCase())
            .length === 0 ? (
              <tr>
                <td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>
                  Geen gedeeltelijke matches gevonden
                </td>
              </tr>
            ) : (
              resultaten
                .filter(item => item.woord.toLowerCase() !== zoekwoord.toLowerCase())
                .map((woordenboekitem, index) => (
                  <tr key={index}>
                    <td>{highlightSearchTerm(woordenboekitem.woord, zoekwoord)}</td>
                    <td></td>
                    <td>{woordenboekitem.beschrijving}</td>
                    <td>
                      <a href={`https://nl.wiktionary.org/wiki/${woordenboekitem.woord}`} target="_blank" rel="noopener noreferrer">
                        <img src={wikiIcon} alt="wiki" style={{ width: '100%', height: 'auto', maxWidth: '40px' }} />
                      </a>
                    </td>
                    <td>
                      <a href={`https://www.ensie.nl/van-dale/${woordenboekitem.woord}`} target="_blank" rel="noopener noreferrer">
                        <img src={vanDaleIcon} alt="wiki" style={{ width: '100%', height: 'auto', maxWidth: '40px' }} />
                      </a>
                    </td>
                    <td>
                      <a href={`https://www.ensie.nl/etymologisch-woordenboek/${woordenboekitem.woord}`} target="_blank" rel="noopener noreferrer">
                        <img src={ewnIcon} alt="wiki" style={{ width: '100%', height: 'auto', maxWidth: '40px' }} />
                      </a>
                    </td>
                  </tr>
                ))
            )
          }
        </tbody>
      </table>
    </>
  )
}

export default App
