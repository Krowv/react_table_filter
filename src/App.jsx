import { Checkbox } from "./components/forms/Checkbox"
import { Input } from "./components/forms/input"
import { ProductCategoryRow } from "./components/products/ProductCategoryRow"
import { ProductRow } from "./components/products/ProductRow"
import { useState } from "react"
import { InputRange } from "./components/forms/InputRange"

const PRODUCT = [
  {category: "Fruits", price : 1, stocked: true, name: "Apple"},
  {category: "Fruits", price : 1, stocked: true, name: "Dragonfruit"},
  {category: "Fruits", price : 2, stocked: false, name: "Passionfruit"},
  {category: "Vegetables", price : 2, stocked: true, name: "Spinach"},
  {category: "Vegetables", price : 4, stocked: false, name: "Pumpkin"},
  {category: "Vegetables", price : 1, stocked: true, name: "Peas"}
]

function App() {

  const [showStockedOnly, setShowStockedOnly] = useState(false)
  const [search, setSearch] = useState("")
  const [rangePrice, setRangePrice] = useState(1)
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
    
    if(rangePrice && product.price > rangePrice){
      return false
    }

    return true
  })
  
  /**
   * Explication de la ligne : 
   * - La fonction reduce permet de réduire un tableau à une seule valeur
   * - On prends 2 paramètres dans la fonction callback, max qui est initialisé à 0 précisé en second paramètre et produit qui est la ligne actuelle
   * - Si produit.price est plus grand que la valeur de max, alors la nouvelle valeur de max est produit.price, sinon la valeur de max reste inchangée
   * Cette ligne sers à déterminer le prix maximum que contient le tableau afin de le mettre en max dans notre input range
   */
  const maxPrice = PRODUCT.reduce((max, produit) => produit.price > max ? produit.price : max,0);

  return <div className="container my-3">
    <SearchBar maxPrice={maxPrice} rangePrice={rangePrice} onRangePriceChange={setRangePrice} search={search} onSearchChange={setSearch} showStockedOnly={showStockedOnly} onStockedOnlychange={setShowStockedOnly}/>
    <ProductTable products={visibleProduct}/>
  </div>
  
}

function SearchBar({showStockedOnly, onStockedOnlychange, search, onSearchChange, rangePrice, onRangePriceChange, maxPrice}){
  return <div>
    <div className="mb-3">
      <Input 
        value={search} 
        onChange={onSearchChange} 
        placeholder="Rechercher..."
      />
      <div className="mt-3">
        <Checkbox 
          checked={showStockedOnly} 
          onChange={onStockedOnlychange} 
          id="stocked" 
          label="N'afficher que les produits en stock"
        />
      </div>
      <InputRange 
        min={0} 
        max={maxPrice} 
        id="range"
        value={rangePrice}
        onChange={onRangePriceChange}
        label={`Gamme de prix : ${rangePrice} $`}  
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
