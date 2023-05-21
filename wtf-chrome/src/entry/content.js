import '../assets/tailwind.css'

const newDiv = document.createElement("div")
const newContent = document.createTextNode("Test")
newDiv.appendChild(newContent)
newDiv.classList.add("text-2xl")

const ele = document.getElementsByClassName('content-title m-bottom10')[0]
ele.insertBefore(newDiv, ele.children[1])