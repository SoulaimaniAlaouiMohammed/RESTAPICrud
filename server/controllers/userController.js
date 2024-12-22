const fs = require('fs')
const path = require('path')
const usersDBPath = path.join(__dirname, '../../databases/users.json')

// ===================== User API =====================

// POST   - createUser(data)       =>   return new user we created.
// GET    - getAllUsers()          =>   return all users || empty array.
// GET    - getUserById(id)        =>   return user || false.
// PUT    - updateUser(id, data)   =>   return updated user || false.
// DELETE - deleteUser(id)         =>   return all new users || false.


const createUser = async (_data) => {
    const {firstName, lastName, email, age, city, adresse, domain, experienceYears} = _data
    
    if (!firstName || !lastName || !email || 
        age === undefined || !city || !adresse || 
        !domain || experienceYears === undefined) {
        throw new Error('All fields are required')
    }

    try {
        const users = await getAllUsers()
        let id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1
        const newUser = {id, firstName, lastName, email, age: Number(age), city, adresse, domain, experienceYears: Number(experienceYears)}
        users.push(newUser)
        await fs.promises.writeFile(usersDBPath, JSON.stringify({users}, null, 3))
        return newUser
    } catch (err) {
        throw new Error(`Failed to create user: ${err.message}`)
    }
}

const getAllUsers = async () => {
    try {
        const users = await fs.promises.readFile(usersDBPath)
        if (!users) return []
        return JSON.parse(users.toString()).users
    } catch (err) { 
        throw new Error('Failed to read users database')
    }
}

const getUserById = async (_id) => {
    if (!_id) throw new Error('Something wrong, must enter user id.')
    const users = await getAllUsers()
    const user = users.find(u => u.id === _id)
    if (!user) return false
    return user
}

const updateUser = async (_id, _data) => {
    let users = await getAllUsers()
    let user = users.find(u => u.id === _id)
    if (!user) return false
    let {firstName, lastName, email, age, city, adresse, domain, experienceYears} = _data
    if (!firstName || !lastName || !email || !age || !city || !adresse || !domain || !experienceYears)
        throw new Error('Something wrong, invalid user inputs, all the fields must be valid.')
    
    const index = users.findIndex(u => u.id === _id)
    users[index] = {id: _id, firstName, lastName, email, age, city, adresse, domain, experienceYears}
    await fs.promises.writeFile(usersDBPath, JSON.stringify({users}, null, 3))
    return users[index]
}

const deleteUser = async (_id) => {
    const user = await getUserById(_id)
    if (!user) return false
    let users = await getAllUsers()
    users = users.filter(u => u.id != _id)
    await fs.promises.writeFile(usersDBPath, JSON.stringify({users}, null, 3))
    return await getAllUsers()
}

module.exports = {createUser, getAllUsers, getUserById, updateUser, deleteUser}