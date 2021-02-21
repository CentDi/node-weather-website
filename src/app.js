const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

//Define paths for Express config
const publicPathDir = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../views/partials')
//** const viewsPath = path.join(__dirname, '../templates')

// Setup handle
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)
//** app.set('view', path) 

// Setup static directory to serve
app.use(express.static(publicPathDir))


// app.get('', (req, res) => {
//     res.send('<h1>Hello express!</h1>')
// })

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'CentDi' 
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'CentDi' 
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'CentDi',
        msg: "This is the message." 
    })
})

app.get('/weather', (req, res) => {
if (!req.query.address) {
    return res.send({
        error: 'Please enter an address.'
    })
} 

geocode (req.query.address, (error,data) => {
    if (error) {
        return res.send({error})
    }
    forecast(data, (error,{message}) => {
        if (error) {
            return res.send({error})
        }
        return res.send({
            address: req.query.address,
            location: data.location,
            forecast: message
        })
    })
})

})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: 'Help',
        name: 'ANAME',
        msg: "Help article not found."
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: 'Error 404',
        name: 'ANAME',
        msg: "Page not found." 
    })
})



app.listen(port, () => {
    console.log(`Server is up on port ${port}.`)
})