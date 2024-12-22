
const sendResponse = (res, statusCode, message) => {
    res.writeHead(statusCode, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(message, null, 3))
}

const handle = (res, statusCode = 500, message = 'Internal server error.') => {
    res.writeHead(statusCode, {'Content-Type': 'application/json'})
    res.end(JSON.stringify({message}, null, 3))
}

module.exports = {sendResponse, handle}