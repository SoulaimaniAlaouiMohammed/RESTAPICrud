

const getUsersData = async () => {
    const response = await fetch("http://localhost:5000/api/users", {method: 'GET'})
    if (!response.ok) throw new Error('fetch users error.')
    return await response.json()
}

const getUserData = async (_id) => {
    const response = await fetch(`http://localhost:5000/api/users/${_id}`, {method: 'GET'})
    if (!response.ok) throw new Error('fetch user error.')
    const user = await response.json()
    if (!user) return 'No user with this id found.'
    return user
}

const addUser = async (_data) => {
    const response = await fetch("http://localhost:5000/api/users", {
        method: 'POST',
        body: JSON.stringify({
            firstName: _data.firstName,
            lastName: _data.lastName,
            email: _data.email,
            age: _data.age,
            city: _data.city,
            adresse: _data.adresse,
            domain: _data.domain,
            experienceYears: _data.experienceYears
        })
    })
    if (!response.ok) throw new Error('failed add user.')
    return await response.json()
}

const updateUser = async (_id, _data) => {
    const response = await fetch(`http://localhost:5000/api/users/${_id}`, {
        method: 'PUT',
        body: JSON.stringify({
            id: _id,
            firstName: _data.firstName,
            lastName: _data.lastName,
            email: _data.email,
            age: _data.age,
            city: _data.city,
            adresse: _data.adresse,
            domain: _data.domain,
            experienceYears: _data.experienceYears
        })
    })
    if (!response.ok) throw new Error('failed update user.')
    const user = await response.json()
    if (!user) return 'No user with this id.'
    return user
}

const deleteUser = async (_id) => {
    const response = await fetch(`http://localhost:5000/api/users/${_id}`, {method: 'DELETE'})
    if (!response.ok) throw new Error('failed delete user.')
    const data = await response.json()
    if (!data) return 'No user with this id.'
    return data
}

export {
    getUsersData,
    getUserData,
    addUser,
    updateUser,
    deleteUser
}