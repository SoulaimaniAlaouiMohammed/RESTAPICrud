import Card from "./components/Card.js"
import Navbar from "./components/Navbar.js"
import SideBar from "./components/SideBar.js"


document.addEventListener("DOMContentLoaded", async () => {
    Navbar()
    document.querySelector('.dashboard').innerHTML = SideBar()
    Card()
})