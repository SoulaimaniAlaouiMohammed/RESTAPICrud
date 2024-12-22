const { createUser, getAllUsers, getUserById, updateUser, deleteUser } = require('../controllers/userController')
const {sendResponse, handle} = require('./../utils/utils')

const app = async (req, res) => {
    // Add CORS headers
    res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:5500'); // Allow requests from this origin
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed HTTP methods
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type'); // Allowed headers
    
    let {url, method} = req
    url = url.toLowerCase()

    if (method === 'OPTIONS') {
        // Respond with 204 for preflight requests
        res.writeHead(204);
        res.end();
        return
    }
    
    if (url == '/api/users' && method === 'POST') {
        let body = ""
        req.on("data", (chunk) => body += chunk.toString())
        req.on("end", async () => {
            try {
                body = JSON.parse(body)
                const newUser = await createUser(body)
                sendResponse(res, 201, newUser)
            } catch (err) {
                handle(res, 400, err.message)
            }
        })
    }
    else if (url == '/api/users' && method === 'GET')
    {
        try {
            const users = await getAllUsers()
            sendResponse(res, 200, users)
        } catch (err) {
            handle(res)
        }
    }
    else if (url.startsWith('/api/users/') && method === 'GET')
    {
        try {
            const id = parseInt(url.split('/')[3])
            const user = await getUserById(id)
            if (!user) {
                sendResponse(res, 404, `No user with this id: ${id}`)
                return
            }
            sendResponse(res, 200, user)
        } catch (err) {
            handle(res)
        }
    }
    else if (url.startsWith('/api/users/') && method === 'PUT')
    {
        const id = parseInt(url.split('/')[3])
        let body = ""
        req.on("data", (chunk) => body += chunk.toString())
        req.on("end", async () => {
            try {
                body = JSON.parse(body)
                const user = await updateUser(id, body)
                if (!user) {
                    sendResponse(res, 404, `No user with this id: ${id}`)
                    return
                }
                sendResponse(res, 200, user)
            } catch (err) {
                handle(res)
            }
        })
    }
    else if (url.startsWith('/api/users/') && method === 'DELETE')
    {
        const id = url.split('/')[3]
        const user = await deleteUser(parseInt(id))
        if (!user) {sendResponse(res, 404, `No user with this id: ${id}`); return}
        sendResponse(res, 200, user)
    }
    else 
    {
        try {
            sendResponse(res, 404, 'Error 404, page not found.')
        } catch (err) {
            handle(res)
        }
    }
}

module.exports = app