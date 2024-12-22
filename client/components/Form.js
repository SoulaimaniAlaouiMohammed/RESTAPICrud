import { addUser } from "../controllers/userController.js"



const form = async () => {
    const formHtml = `
        <form action="#" method="POST" id="addUser">
            <label for="firstName">First Name:</label>
            <input type="text" id="firstName" name="firstName" placeholder="Enter your first name" required>

            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName" name="lastName" placeholder="Enter your last name" required>

            <label for="email">Email:</label>
            <input type="email" id="email" name="email" placeholder="Enter your email address" required>

            <label for="age">Age:</label>
            <input type="number" id="age" name="age" placeholder="Enter your age" required>

            <label for="city">City:</label>
            <input type="text" id="city" name="city" placeholder="Enter your city" required>

            <label for="adresse">Address:</label>
            <input type="text" id="adresse" name="adresse" placeholder="Enter your address" required>

            <label for="domain">Domain:</label>
            <input type="text" id="domain" name="domain" placeholder="Enter your domain" required>

            <label for="experienceYears">Experience Years:</label>
            <input type="number" id="experienceYears" name="experienceYears" placeholder="Enter your years of experience" required>

            <button type="submit" class="form-btn">Submit</button>
        </form>
    `
    document.querySelector('.form-container').innerHTML = formHtml

    document.getElementById('addUser').addEventListener("submit", async (e) => {
        e.preventDefault()

        const newUser = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            age: document.getElementById('age').value,
            city: document.getElementById('city').value,
            adresse: document.getElementById('adresse').value,
            domain: document.getElementById('domain').value,
            experienceYears: document.getElementById('experienceYears').value
        }

        try {
            const response = await addUser(newUser)
            alert('User add successfully.')
            window.location.href = './../public/html/index.html'
        } catch (err) {
            console.error(err)
        }
    })
    
}


export default form