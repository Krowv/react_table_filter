import { Input } from "./components/forms/input"
import { useState, useEffect } from "react"

function App() {

  const [duration, setDuration] = useState(5)
  const [secondLeft, setSecondLeft] = useState(duration)

  const handleChange = (v) => {
    setDuration(v)
    setSecondLeft(v)
  }

  useEffect(() => {
    const timer = setInterval(() => {
      setSecondLeft((v) => {
        if(v <= 1){
          clearInterval(timer)
          return 0
        }
        return v-1
      })
    }, 1000)
    return () => {
      clearInterval(timer)
    }
  }, [duration]);

  return <div>
    <Input
    value={duration}
    onChange={handleChange}
    placeholder="Timer..."
  />
  <p>Décompte : {secondLeft}</p>
  </div>
  
}

export default App
