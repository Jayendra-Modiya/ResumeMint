require('dotenv').config()
const dns = require("dns");

dns.setServers(["1.1.1.1", "8.8.8.8"]);
const app = require('./src/app.js')
const connectToDB = require('./src/config/db')

async function startServer() {
    await connectToDB()

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(`Server is running on port ${PORT}`)
})

}

startServer().catch(() => {
    process.exit(1)
})
