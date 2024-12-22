import { deleteUser, getUserData, getUsersData, updateUser } from './../controllers/userController.js'



const Card = async () => {
    const data = await getUsersData()
    let cardsHtml = ''
    data.forEach(user => {
        cardsHtml += `
            <div class="card">
                <div class="cardInfos">
                    <h3>ID: <span>${user.id}</span> </h3>
                    <h4>First Name: <span>${user.firstName}</span> </h4>
                    <h4>Last Name: <span>${user.lastName}</span> </h4>
                    <h4>Email: <span>${user.email}</span> </h4>
                    <h4>Age: <span>${user.age}</span> </h4>
                    <h4>City: <span>${user.city}</span> </h4>
                    <h4>Adresse: <span>${user.adresse}</span> </h4>
                    <h4>Domain: <span>${user.domain}</span> </h4>
                    <h4>Experience Years: <span>${user.experienceYears}</span> </h4>
                </div>
                <div class="cardBtns">
                    <button class="modifyBtn" data-id="${user.id}">modify</button>
                    <button class="deleteBtn" data-id="${user.id}">delete</button>
                </div>
            </div>
        `
    })
    document.querySelector('.cards').innerHTML = cardsHtml

    document.querySelectorAll('.deleteBtn').forEach(button => {
        button.addEventListener("click", async (e) => handleUserDelete(e.target.dataset.id))
    })

    document.querySelectorAll('.modifyBtn').forEach((button) => {
        button.addEventListener("click", async (e) => handleUserModify(e.target.dataset.id))
    })
}

const handleUserDelete = async (userID) => {
    try {
        const response = await deleteUser(userID)
        alert('User deleted successfully.')
    } catch (err) {
        console.error(err)
    }
}

const handleUserModify = async (userID) => {
    const user = await getUserData(userID)
    let html = `
        <form action="#" method="PUT" id="modifyForm">

            <label for="id">ID:</label>
            <input type="text" id="id" name="id" value="${user.id}" disabled>

            <label for="firstName">First Name:</label>
            <input type="text" id="firstName-m" name="firstName" value="${user.firstName}" required>

            <label for="lastName">Last Name:</label>
            <input type="text" id="lastName-m" name="lastName" value="${user.lastName}" required>

            <label for="email">Email:</label>
            <input type="email" id="email-m" name="email" value="${user.email}" required>

            <label for="age">Age:</label>
            <input type="number" id="age-m" name="age" value="${user.age}" required>

            <label for="city">City:</label>
            <input type="text" id="city-m" name="city" value="${user.city}" required>

            <label for="adresse">Address:</label>
            <input type="text" id="adresse-m" name="adresse" value="${user.adresse}" required>

            <label for="domain">Domain:</label>
            <input type="text" id="domain-m" name="domain" value="${user.domain}" required>

            <label for="experienceYears">Experience Years:</label>
            <input type="number" id="experienceYears-m" name="experienceYears" value="${user.experienceYears}" required>

            <button type="submit" class="form-btn">Modify</button>
        </form>
    `

    document.querySelector('.cards').innerHTML = html

    document.getElementById('modifyForm').addEventListener("submit", async (e) => {
        e.preventDefault()
        const newData = {
            id: document.getElementById('id').value,
            firstName: document.getElementById('firstName-m').value,
            lastName: document.getElementById('lastName-m').value,
            email: document.getElementById('email-m').value,
            age: document.getElementById('age-m').value,
            city: document.getElementById('city-m').value,
            adresse: document.getElementById('adresse-m').value,
            domain: document.getElementById('domain-m').value,
            experienceYears: document.getElementById('experienceYears-m').value
        }
        try {
            const response = await updateUser(userID, newData)
            alert('User updated successfully.')
        } catch (err) {
            console.error(err)
        }
    })
}

export default Card