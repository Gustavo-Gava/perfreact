import { FormEvent, useState } from "react"
import { SearchResults } from "../components/SearchResults"

interface ProductItem {
  id: number
  title: string
  price: number
}

export default function Home() {
  const [search, setSearch] = useState('')
  const [results, setResults] = useState([] as ProductItem[])

  async function handleSearch(event: FormEvent) {
    event.preventDefault()

    if (!search.trim()) {
      return 
    }

    const response = await fetch(`http://localhost:3333/products?q=${search}`)
    const data = await response.json()

    setResults(data)
  }

  return (
    <div className="container">
      <h1>Search</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <button type="submit">Buscar</button>
      </form>

      <SearchResults results={results} />
    </div>
  )
}