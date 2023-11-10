import { Checkbox } from "./components/forms/Checkbox"
import { Input } from "./components/forms/input"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"
import { useState } from "react"

const PRODUCT = [
  {category: "Fruits", price : "$1", stocked: true, name: "Apple"},
  {category: "Fruits", price : "$1", stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price : "$2", stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price : "$2", stocked: true, name: "Spinach"},
  {category: "Vegetables", price : "$4", stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price : "$1", stocked: true, name: "Peas"}
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState("")
  const visibleProduct= PRODUCT.filter(product => {
    if(showStockedOnly && !product.stocked){
      return false
    }

    if(search && !product.name.includes(search)){
      return false
    }
    
    if(search && !product.name.includes(search) && showStockedOnly){
      return false
    }

    return true
  })


  return <div className="container my-3">
    <SearchBar search={search} onSearchChange={setSearch} showStockedOnly={showStockedOnly} onStockedOnlychange={setShowStockedOnly}/>
    <ProductTable products={visibleProduct}/>
  </div>
  
}

function SearchBar({showStockedOnly, onStockedOnlychange, search, onSearchChange}){
  return <div>
    <div className="mb-3">
      <Input 
        value={search} 
        onChange={onSearchChange} 
        placeholder="Rechercher..."
      />
      <Checkbox 
        checked={showStockedOnly} 
        onChange={onStockedOnlychange} 
        id="stocked" 
        label="N'afficher que les produits en stock"
      />
    </div>
  </div>
}

function ProductTable({products}){

  const rows = []
  let lastCategory = "";

  for (let product of products){
    if(product.category != lastCategory){
      rows.push(<ProductCategoryRow key={product.category} name={product.category}/>)
    }
    lastCategory = product.category
    rows.push(<ProductRow product={product} key={product.name}/>)
  }

  return <table className="table">
    <thead>
      <tr>
        <th>Nom</th>
        <th>Prix</th>
      </tr>
    </thead>
    <tbody>
      {rows}
    </tbody>
  </table>
}

export default App
