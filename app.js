const express = require('express')
const applicationRoutes = require('./src/routes/application_routes')
const app = express()
const PORT = 5000;

//grab json middle ware

app.use('/api/v1/applications', applicationRoutes)

app.get('/', (req, res) => {
    res.end('Root Endpoint hit')
})

app.listen(PORT, () => console.log(`listening on port ${PORT}..`))