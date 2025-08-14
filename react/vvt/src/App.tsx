import { useState } from 'react'
import './App.css'

function App() {
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [searchResults, setSearchResults] = useState<string[]>([])

  const handleSearch = () => {
    // TODO: Implement search functionality
    setSearchResults([])
  }

  return (
    <div className="app">
      <header>
        <h1>Woordenboek</h1>
      </header>
      <main>
        <div className="search-container">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Zoek een woord..."
          />
          <button onClick={handleSearch}>Zoeken</button>
        </div>
        <div className="results-container">
          {searchResults.map((result, index) => (
            <div key={index} className="result-item">
              {result}
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}

export default App
