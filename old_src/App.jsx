import { createRoot } from "react-dom/client"
import Pet from "./Pet"
import SearchParams from "./SearchParams"

// 1. react
// 2. react dom
// 3. bundler/pembungkus ==> vite.js

// React.createElement("element HTML/React yang mau ditampilkan", props/attribute HTML, childrennya)

// kalo argumen pertama menggunakan "" artinya dia adalah element HTML native, kalo tidak pake petik/hanya pake text capital maka dia adalah element React/Custom yang baru dibuat

const App = () => {
  return (
    <div>
      <h1>Pet Rescue App</h1>
      <SearchParams />
      {/* <Pet name="Ica" animal="Pig" breed="Boar" />
      <Pet name="Bob" animal="Dog" breed="Border Collie" />
      <Pet name="Carla" animal="Cat" breed="Jalanan" /> */}
    </div>
  )
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
