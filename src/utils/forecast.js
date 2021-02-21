const request = require('postman-request')

function forecast({latitude,longitude}, callback) {
    const url = (
        'http://api.weatherstack.com/forecast?access_key='+
        'b3121c6573ac2386ef5ee229087b9718&query='+
        latitude+','+
        longitude+
        '&units=m'
    )
    request({ url: url, json: true}, (error, {body}) => {
        // console.log(response)
        // const data = JSON.parse(response.body)
    
    
        // console.log(response.body.current)
    
        if(error){
            callback('Can\'t establish connection.')
        } else if (body.error){
            callback('No location found.')
        } else{
            const {current} = body
            callback(undefined, {
                message: (
                    `
                    It is currently ${current.temperature}°C degrees out. 
                    It feels like ${current.feelslike}°C degrees out. 
                    There will be ${current.precip} precipitation`
                ) 
            })
            
            // console.log(
            //     `It is currently ${current.temperature}℃ degrees out. It feels like ${current.feelslike}℃ degrees out.`
            // )
        }
    
    
    })
}

module.exports = (
    forecast
)