import React from "react"
import { createRoot } from "react-dom/client"

// 1. react
// 2. react dom
// 3. bundler/pembungkus ==> vite.js

const Pet = (props) => {
  return React.createElement("div", {}, [
    React.createElement("h1", {}, props.name),
    React.createElement("h2", {}, props.animal),
    React.createElement("h2", {}, props.breed),
  ])
}

// React.createElement("element HTML/React yang mau ditampilkan", props/attribute HTML, childrennya)

// kalo argumen pertama menggunakan "" artinya dia adalah element HTML native, kalo tidak pake petik/hanya pake text capital maka dia adalah element React/Custom yang baru dibuat

const App = () => {
  return React.createElement("div", {}, [
    React.createElement("h1", { className: "header" }, "Pet Rescue App"),
    React.createElement(Pet, {
      name: "Bob",
      animal: "Dog",
      breed: "Border Collie",
    }),
    React.createElement(Pet, {
      name: "Carla",
      animal: "Cat",
      breed: "Jalanan",
    }),
  ])
}

const container = document.getElementById("root")
const root = createRoot(container)
root.render(React.createElement(App))
