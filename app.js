const express = require('express')
const applicationRoutes = require('./src/routes/application_routes')

const app = express()
const PORT = 5000;

app.use(express.json())
app.use('/api/v1/applications', applicationRoutes)

app.get('/', (req, res) => res.end('Root Endpoint hit'))
app.get('*' ,(req, res) => res.end('This resource is not available'))

app.listen(PORT, () => console.log(`listening on port ${PORT}..`))